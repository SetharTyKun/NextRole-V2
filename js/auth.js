/**
 * Authentication Logic for NextRole
 */

const STORAGE_KEY_USERS = 'nextrole_users';
const STORAGE_KEY_CURRENT_USER = 'nextrole_current_user';

/**
 * Get all registered users from local storage
 */
function getUsers() {
    const users = localStorage.getItem(STORAGE_KEY_USERS);
    if (!users) {
        return seedDefaultUser();
    }
    return JSON.parse(users);
}

/**
 * Seed a default user for testing/demo purposes
 */
function seedDefaultUser() {
    const defaultUser = {
        name: 'Test User',
        email: 'test@gmail.com',
        password: '12345678',
        role: 'candidate'
    };
    saveUsers([defaultUser]);
    return [defaultUser];
}

/**
 * Save users to local storage
 */
function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
}

/**
 * Register a new user
 */
export function registerUser(userData) {
    const users = getUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
        throw new Error('User with this email already exists.');
    }

    // Add new user
    users.push(userData);
    saveUsers(users);
    
    // Automatically login after registration
    loginUser(userData.email, userData.password);
    return userData;
}

/**
 * Login user
 */
export function loginUser(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        throw new Error('Invalid email or password.');
    }

    // Set current user (excluding password for security)
    const sessionUser = { ...user };
    delete sessionUser.password;
    localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(sessionUser));
    localStorage.setItem('isLoggedIn', 'true');
    
    return sessionUser;
}

/**
 * Logout user
 */
export function logoutUser() {
    localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    window.location.href = '/index.html';
}

/**
 * Get current logged in user
 */
export function getCurrentUser() {
    const user = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
    return user ? JSON.parse(user) : null;
}

/**
 * Check if user is logged in
 */
export function isLoggedIn() {
    return !!getCurrentUser();
}
