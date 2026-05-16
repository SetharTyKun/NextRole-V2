const USERS_KEY = 'nextrole_users';
const SESSION_KEY = 'nextrole_session';

window.NRAuth = {
  getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  },

  getCurrentUser() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
    catch { return null; }
  },

  signup(name, email, password, role) {
    const users = this.getUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    users.push({ id: Date.now(), name, email: email.toLowerCase(), password, role });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true };
  },

  login(email, password) {
    const users = this.getUsers();
    const user = users.find(u =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) return { success: false, error: 'Invalid email or password.' };
    const session = { id: user.id, name: user.name, email: user.email, role: user.role };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true, user: session };
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
  }
};
