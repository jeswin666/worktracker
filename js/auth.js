// ============================================================
// WorkTracker - Authentication Module
// ============================================================

const SESSION_KEY = 'wt_session';

/** Hash a password using SHA-256 */
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Login with username and password */
async function login(username, password) {
  try {
    const hash = await hashPassword(password);
    const { data, error } = await db
      .from('users')
      .select('id, username, full_name, role')
      .eq('username', username.toLowerCase().trim())
      .eq('password_hash', hash)
      .maybeSingle();

    if (error) throw error;
    if (!data) return { success: false, error: 'Invalid username or password.' };

    const session = {
      id: data.id,
      username: data.username,
      fullName: data.full_name,
      role: data.role,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true, user: session };
  } catch (err) {
    console.error('Login error:', err);
    return { success: false, error: 'Connection error. Check your Supabase config.' };
  }
}

/** Logout */
function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = 'index.html';
}

/** Get current session object or null */
function getSession() {
  try {
    const s = localStorage.getItem(SESSION_KEY);
    return s ? JSON.parse(s) : null;
  } catch { return null; }
}

/** Require auth — redirects to login if no session */
function requireAuth() {
  const session = getSession();
  if (!session) { window.location.href = 'index.html'; return null; }
  return session;
}

/** Require admin — redirects to dashboard if not admin */
function requireAdmin() {
  const session = requireAuth();
  if (session && session.role !== 'admin') {
    window.location.href = 'dashboard.html';
    return null;
  }
  return session;
}

/** Check if current user is admin */
function isAdmin() {
  const s = getSession();
  return s && s.role === 'admin';
}
