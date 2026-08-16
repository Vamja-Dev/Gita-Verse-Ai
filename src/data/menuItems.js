import { Home, BookOpen, Compass, Info, LayoutDashboard, Scroll, Map, Users, HeartHandshake, Clock, MessageSquare, User } from 'lucide-react';

export const primaryMenuItems = [
  { name: 'Home', id: 'home', icon: Home },
  { name: 'Learn', id: 'learn', icon: BookOpen },
  { name: 'Explore', id: 'explore', icon: Compass, isAccordion: true },
  { name: 'About', id: 'about', icon: Info },
  { name: 'Dashboard', id: 'dashboard', icon: LayoutDashboard },
  { name: 'Login', id: 'login', icon: User },
];

export const exploreSubmenus = {
  scriptures: [
    { name: 'Four Vedas', id: 'four-vedas', icon: Scroll }, 
    { name: 'Four Yugas', id: 'four-yugas', icon: Clock },
  ],
  discover: [
    { name: 'Timeline', id: 'timeline', icon: Compass },
    { name: 'Characters', id: 'characters', icon: Users },
    { name: 'Kurukshetra Map', id: 'map', icon: Map },
  ],
  tools: [
    { name: 'Meditation', id: 'meditation', icon: HeartHandshake },
    { name: 'Gita Chat', id: 'gita-chat', icon: MessageSquare }
  ]
};