import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import krishna from '../assets/krishna.png';
import bgImg from '../assets/bg.png';
import '../styles/login.css';

const SHEETDB_URL = 'https://sheetdb.io/api/v1/x84p8m28inivm';
const GOOGLE_CLIENT_ID = '168266196166-0jl5nj5lhv0qvmj539k6bvekjo3romkt.apps.googleusercontent.com';

// Reusable database save function with bulletproof max-ID calculation and array mapping
export const saveUserToDatabase = async (name, email, password, loginMethod, status) => {
    try {
        const response = await fetch(SHEETDB_URL);
        const allRows = await response.json();
        
        let nextId = 1;
        if (Array.isArray(allRows) && allRows.length > 0) {
            const ids = allRows.map(row => Number(row.ID || row.id || row[0])).filter(id => !isNaN(id) && id > 0);
            if (ids.length > 0) {
                nextId = Math.max(...ids) + 1;
            } else {
                nextId = allRows.length + 1;
            }
        }

        const postResponse = await fetch(SHEETDB_URL, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: [{
                    "ID": nextId,
                    "Name": name,
                    "Email": email,
                    "Password": password,
                    "Method": loginMethod,
                    "Status": status,
                    "Date": new Date().toLocaleString()
                }]
            })
        });
        const result = await postResponse.json();
        return result;
    } catch (error) {
        console.error('Error saving to SheetDB:', error);
    }
};

export default function LoginPage({ onNavigate }) {
    const [isRegister, setIsRegister] = useState(false);
    const [showLoginPwd, setShowLoginPwd] = useState(false);
    const [showRegPwd, setShowRegPwd] = useState(false);

    // Form states
    const [loginUser, setLoginUser] = useState('');
    const [loginPwd, setLoginPwd] = useState('');
    const [loginError, setLoginError] = useState('');

    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPwd, setRegPwd] = useState('');
    const [regError, setRegError] = useState('');

    const cardRef = useRef(null);

    // 3D Card Tilt Hover Effect Handlers
    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseEnter = () => {
        if (cardRef.current) cardRef.current.style.transition = 'none';
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    };

    // Helper validation
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const searchUserInSheet = async (email) => {
        try {
            const response = await fetch(`${SHEETDB_URL}/search?Email=${encodeURIComponent(email)}`);
            return await response.json();
        } catch (error) {
            console.error('Error querying SheetDB:', error);
            return [];
        }
    };

    // Google Sign-In Initialization
    useEffect(() => {
        const loadGoogleScript = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    use_fedcm_for_prompt: false,
                    callback: async (response) => {
                        const base64Url = response.credential.split('.')[1];
                        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                        const responsePayload = JSON.parse(window.atob(base64));

                        const userName = responsePayload.name;
                        const userEmail = responsePayload.email;

                        const existingUsers = await searchUserInSheet(userEmail);
                        if (!existingUsers || existingUsers.length === 0) {
                            await saveUserToDatabase(userName, userEmail, 'N/A (Google OAuth)', 'Google OAuth', 'Registered');
                        }

                        // Log activity status as Logged In with timestamp
                        await saveUserToDatabase(userName, userEmail, 'N/A', 'Google OAuth', 'Logged In');

                        // Store Google User Name and Email in LocalStorage
                        localStorage.setItem('gitaverse_user_name', userName);
                        localStorage.setItem('gitaverse_user_email', userEmail);

                        // Redirect instantly to home
                        if (onNavigate) onNavigate('home');
                    }
                });
            }
        };

        if (!window.google) {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.onload = loadGoogleScript;
            document.body.appendChild(script);
        } else {
            loadGoogleScript();
        }
    }, [onNavigate]);

    const handleGoogleClick = () => {
        if (window.google) {
            window.google.accounts.id.prompt();
        }
    };

    // Register Handler (Modified to instantly log in and redirect to home)
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (!regName || !regEmail || !regPwd) {
            setRegError('Please fill out all fields.');
            return;
        }
        if (regName.length < 2) {
            setRegError('Name must be at least 2 characters.');
            return;
        }
        if (!isValidEmail(regEmail)) {
            setRegError('Please enter a valid email address.');
            return;
        }
        if (regPwd.length < 6) {
            setRegError('Password must be at least 6 characters long.');
            return;
        }

        setRegError('Checking availability...');
        const existingUsers = await searchUserInSheet(regEmail);
        if (existingUsers && existingUsers.length > 0) {
            setRegError('This email is already registered. Please login.');
            return;
        }

        setRegError('Creating account & logging in...');
        try {
            // Save as Registered first
            await saveUserToDatabase(regName, regEmail, regPwd, 'Email/Password', 'Registered');
            // Also log the active login session immediately
            await saveUserToDatabase(regName, regEmail, regPwd, 'Email/Password', 'Logged In');

            // Store user details in LocalStorage
            localStorage.setItem('gitaverse_user_name', regName);
            localStorage.setItem('gitaverse_user_email', regEmail);

            setRegError('Success! Entering GitaVerse...');
            setTimeout(() => {
                if (onNavigate) onNavigate('home');
            }, 500);
        } catch (err) {
            setRegError('Failed to create account. Please try again.');
        }
    };

    // Login Handler
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (!loginUser || !loginPwd) {
            setLoginError('Please enter both your email and password.');
            return;
        }

        setLoginError('Verifying credentials...');
        const matchingUsers = await searchUserInSheet(loginUser);

        if (!matchingUsers || matchingUsers.length === 0) {
            setLoginError('No account found with this email. Please Sign Up first.');
            return;
        }

        const user = matchingUsers[0];
        if (user.Password === loginPwd) {
            // Log active login timestamp and status row in SheetDB
            await saveUserToDatabase(user.Name || 'User', user.Email, user.Password, 'Email/Password', 'Logged In');

            localStorage.setItem('gitaverse_user_name', user.Name || 'Seeker');
            localStorage.setItem('gitaverse_user_email', user.Email);

            setLoginError('Login successful!');
            setTimeout(() => {
                if (onNavigate) onNavigate('home');
            }, 300);
        } else {
            setLoginError('Incorrect password. Please try again.');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="stage-wrapper"
        >
            <div className="stage" style={{ backgroundImage: `url(${bgImg})` }}>
                <div className="left">
                    <img className="art" src={krishna} alt="God Krishna" />
                </div>

                <div className="right">
                    <div
                        className="card"
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div
                            className="form-slider"
                            style={{ transform: `translateZ(40px) translateX(${isRegister ? '-50%' : '0'})` }}
                        >

                            {/* LOGIN PANE */}
                            <form className="form-pane" onSubmit={handleLoginSubmit} noValidate>
                                <h2>Login</h2>
                                <p className="sub">Access your GitaVerse AI account</p>

                                <div className="field">
                                    <span className="icon">👤</span>
                                    <input
                                        type="text"
                                        value={loginUser}
                                        onChange={(e) => setLoginUser(e.target.value)}
                                        placeholder="Username or Email"
                                        required
                                    />
                                </div>

                                <div className="field">
                                    <span className="icon">🔒</span>
                                    <input
                                        type={showLoginPwd ? 'text' : 'password'}
                                        value={loginPwd}
                                        onChange={(e) => setLoginPwd(e.target.value)}
                                        placeholder="Password"
                                        required
                                    />
                                    <button type="button" className="toggle" onClick={() => setShowLoginPwd(!showLoginPwd)}>
                                        {showLoginPwd ? '🙈' : '👁️'}
                                    </button>
                                </div>

                                <p className="error-msg">{loginError}</p>

                                <button type="submit" className="btn-submit" style={{ marginTop: '10px' }}>
                                    Login
                                </button>

                                <div className="divider">OR</div>

                                <button type="button" className="btn-google flex items-center justify-center gap-2" onClick={handleGoogleClick}>
                                    <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="#4285F4" d="M47.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h13.2c-.6 3-2.4 5.5-5.1 7.2v6h8.2c4.8-4.4 7.2-10.8 7.2-17.5z" />
                                        <path fill="#34A853" d="M24 48c6.6 0 12.1-2.2 16.2-5.9l-8.2-6c-2.2 1.5-4.9 2.4-8 2.4-6.2 0-11.5-4.2-13.4-9.9H2.1v6.2C6.2 42.7 14.5 48 24 48z" />
                                        <path fill="#FBBC05" d="M10.6 28.6c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6v-6.2H2.1C.8 16.1 0 19.9 0 24s.8 7.9 2.1 10.8l8.5-6.2z" />
                                        <path fill="#EA4335" d="M24 9.5c3.6 0 6.8 1.2 9.3 3.6l7-7C36.1 2.2 30.6 0 24 0 14.5 0 6.2 5.3 2.1 13.2l8.5 6.2C12.5 13.7 17.8 9.5 24 9.5z" />
                                    </svg>
                                    <span>Continue with Google</span>
                                </button>

                                <p className="switch-mode">
                                    Don't have an account? <a onClick={() => setIsRegister(true)}>Register</a>
                                </p>
                            </form>

                            {/* REGISTER PANE */}
                            <form className="form-pane" onSubmit={handleRegisterSubmit} noValidate>
                                <h2>Sign Up</h2>
                                <p className="sub">Begin your divine journey</p>

                                <div className="field">
                                    <span className="icon">👤</span>
                                    <input
                                        type="text"
                                        value={regName}
                                        onChange={(e) => setRegName(e.target.value)}
                                        placeholder="Full Name"
                                        required
                                    />
                                </div>

                                <div className="field">
                                    <span className="icon">✉️</span>
                                    <input
                                        type="email"
                                        value={regEmail}
                                        onChange={(e) => setRegEmail(e.target.value)}
                                        placeholder="Email Address"
                                        required
                                    />
                                </div>

                                <div className="field">
                                    <span className="icon">🔒</span>
                                    <input
                                        type={showRegPwd ? 'text' : 'password'}
                                        value={regPwd}
                                        onChange={(e) => setRegPwd(e.target.value)}
                                        placeholder="Password"
                                        required
                                    />
                                    <button type="button" className="toggle" onClick={() => setShowRegPwd(!showRegPwd)}>
                                        {showRegPwd ? '🙈' : '👁️'}
                                    </button>
                                </div>

                                <p className="error-msg">{regError}</p>

                                <button type="submit" className="btn-submit">
                                    Create Account
                                </button>

                                <div className="divider">OR</div>

                                <button type="button" className="btn-google flex items-center justify-center gap-2" onClick={handleGoogleClick}>
                                    <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="#4285F4" d="M47.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h13.2c-.6 3-2.4 5.5-5.1 7.2v6h8.2c4.8-4.4 7.2-10.8 7.2-17.5z" />
                                        <path fill="#34A853" d="M24 48c6.6 0 12.1-2.2 16.2-5.9l-8.2-6c-2.2 1.5-4.9 2.4-8 2.4-6.2 0-11.5-4.2-13.4-9.9H2.1v6.2C6.2 42.7 14.5 48 24 48z" />
                                        <path fill="#FBBC05" d="M10.6 28.6c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6v-6.2H2.1C.8 16.1 0 19.9 0 24s.8 7.9 2.1 10.8l8.5-6.2z" />
                                        <path fill="#EA4335" d="M24 9.5c3.6 0 6.8 1.2 9.3 3.6l7-7C36.1 2.2 30.6 0 24 0 14.5 0 6.2 5.3 2.1 13.2l8.5 6.2C12.5 13.7 17.8 9.5 24 9.5z" />
                                    </svg>
                                    <span>Sign up with Google</span>
                                </button>

                                <p className="switch-mode">
                                    Already have an account? <a onClick={() => setIsRegister(false)}>Login</a>
                                </p>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}