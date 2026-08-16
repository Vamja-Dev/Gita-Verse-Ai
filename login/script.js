/* =========================================
   Configuration (PASTE YOUR LINKS HERE)
========================================= */
const SHEETDB_URL = 'https://sheetdb.io/api/v1/4gh0d4xoah6zl'; 
const GOOGLE_CLIENT_ID = '611702381529-8o57t8qv8qqj7hbha1oam5m1ckcodmbg.apps.googleusercontent.com';

/* =========================================
   Helper & Validation Functions
========================================= */
// Regex helper to validate email format
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Function to search SheetDB for an existing user by email
async function searchUserInSheet(email) {
  try {
    const response = await fetch(`${SHEETDB_URL}/search?Email=${encodeURIComponent(email)}`);
    const data = await response.json();
    return data; // Returns an array of matching rows
  } catch (error) {
    console.error('Error querying SheetDB:', error);
    return [];
  }
}

// Function to save a new row to SheetDB
async function saveUserToDatabase(name, email, password, loginMethod) {
  return fetch(SHEETDB_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: [
        {
          'Name': name,
          'Email': email,
          'Password': password,
          'Method': loginMethod,
          'Date': new Date().toLocaleString()
        }
      ]
    })
  }).then(res => res.json());
}

/* =========================================
   1. Register Form Logic with Constraints
========================================= */
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass = document.getElementById('regPwd').value;
  const errorMsg = document.getElementById('regError');

  // Constraint 1: Check empty fields
  if(!name || !email || !pass) {
    errorMsg.textContent = 'Please fill out all fields.';
    return;
  }

  // Constraint 2: Check name length
  if(name.length < 2) {
    errorMsg.textContent = 'Name must be at least 2 characters.';
    return;
  }

  // Constraint 3: Check valid email format
  if(!isValidEmail(email)) {
    errorMsg.textContent = 'Please enter a valid email address.';
    return;
  }

  // Constraint 4: Check password length
  if(pass.length < 6) {
    errorMsg.textContent = 'Password must be at least 6 characters long.';
    return;
  }

  errorMsg.style.color = '#FFC107';
  errorMsg.textContent = 'Checking availability...';

  // Constraint 5: Check if user already exists in Google Sheet
  const existingUsers = await searchUserInSheet(email);
  if(existingUsers && existingUsers.length > 0) {
    errorMsg.style.color = '#ff6b6b';
    errorMsg.textContent = 'This email is already registered. Please login.';
    return;
  }

  errorMsg.textContent = 'Creating account...';

  try {
    await saveUserToDatabase(name, email, pass, 'Email/Password');
    errorMsg.style.color = '#4CAF50';
    errorMsg.textContent = 'Account created! Redirecting to login...';
    
    // Smooth transition to login form after registration
    setTimeout(() => {
      document.getElementById('showLogin').click();
      errorMsg.style.color = '#ff6b6b';
      errorMsg.textContent = '';
      document.getElementById('registerForm').reset();
    }, 1500);

  } catch (err) {
    errorMsg.style.color = '#ff6b6b';
    errorMsg.textContent = 'Failed to create account. Please try again.';
  }
});

/* =========================================
   2. Login Form Logic with Verification
========================================= */
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPwd').value;
  const errorMsg = document.getElementById('loginError');

  // Constraint 1: Check empty fields
  if(!email || !pass) {
    errorMsg.style.color = '#ff6b6b';
    errorMsg.textContent = 'Please enter both your email and password.';
    return;
  }

  errorMsg.style.color = '#FFC107';
  errorMsg.textContent = 'Verifying credentials...';

  // Constraint 2: Search database for matching email
  const matchingUsers = await searchUserInSheet(email);

  if(!matchingUsers || matchingUsers.length === 0) {
    errorMsg.style.color = '#ff6b6b';
    errorMsg.textContent = 'No account found with this email. Please Sign Up first.';
    return;
  }

  const user = matchingUsers[0];

  // Constraint 3: Verify password match
  if(user.Password === pass) {
    errorMsg.style.color = '#4CAF50';
    errorMsg.textContent = 'Login successful!';
    setTimeout(() => {
      alert(`Welcome back, ${user.Name || 'User'}! You are successfully logged in.`);
      errorMsg.textContent = '';
    }, 300);
  } else {
    errorMsg.style.color = '#ff6b6b';
    errorMsg.textContent = 'Incorrect password. Please try again.';
  }
});

/* =========================================
   3. Google Authentication Logic
========================================= */
function decodeJwtResponse(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

window.onload = function () {
  if (window.google) {
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async (response) => {
        const responsePayload = decodeJwtResponse(response.credential);
        const userName = responsePayload.name;
        const userEmail = responsePayload.email;
        
        // Check if user exists in sheet; if not, add them
        const existingUsers = await searchUserInSheet(userEmail);
        if(!existingUsers || existingUsers.length === 0) {
          await saveUserToDatabase(userName, userEmail, 'N/A (Google OAuth)', 'Google OAuth');
        }
        alert(`Welcome, ${userName}! Logged in with Google.`);
      }
    });
  }
};

const googleBtns = document.querySelectorAll('.btn-google');
googleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (window.google) {
      google.accounts.id.prompt();
    }
  });
});

/* =========================================
   4. UI & Interactive Effects
========================================= */
const card = document.querySelector('.card');
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * -10; 
  const rotateY = ((x - centerX) / centerX) * 10;
  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
card.addEventListener('mouseenter', () => { card.style.transition = 'none'; });
card.addEventListener('mouseleave', () => {
  card.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
  card.style.transform = `rotateX(0deg) rotateY(0deg)`;
});

const slider = document.getElementById('formSlider');
document.getElementById('showRegister').addEventListener('click', () => {
  slider.style.transform = 'translateZ(40px) translateX(-50%)';
});
document.getElementById('showLogin').addEventListener('click', () => {
  slider.style.transform = 'translateZ(40px) translateX(0)';
});

function togglePassword(inputId, btn) {
  const pwdInput = document.getElementById(inputId);
  const isPwd = pwdInput.type === 'password';
  pwdInput.type = isPwd ? 'text' : 'password';
  btn.innerHTML = isPwd ? '🙈' : '👁️';
}

let lastSparkleTime = 0;
function createSparkle(x, y) {
  const now = Date.now();
  if (now - lastSparkleTime < 30) return;
  lastSparkleTime = now;

  const star = document.createElement('div');
  star.className = 'sparkle';
  star.style.left = (x + (Math.random() - 0.5) * 20) + 'px';
  star.style.top = (y + (Math.random() - 0.5) * 20) + 'px';
  const size = Math.random() * 3 + 1.5;
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 1200);
}

window.addEventListener('mousemove', (e) => createSparkle(e.pageX, e.pageY));
window.addEventListener('touchmove', (e) => createSparkle(e.touches[0].pageX, e.touches[0].pageY));