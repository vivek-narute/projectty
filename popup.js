// CP Snippets Extension - Login Page Logic

// Tab Switching
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    
    // Update tabs
    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    
    // Update panels
    panels.forEach(p => p.classList.remove('active'));
    document.getElementById(`panel-${target}`).classList.add('active');
    
    // Clear all messages
    clearMessages();
  });
});

// Sign In Form
document.getElementById('form-signin').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;
  const messageEl = document.getElementById('signin-message');
  
  clearMessages();
  setLoading(form, true);
  
  try {
    // API call to backend server
    const response = await fetch('http://localhost:3000/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
    const result = await response.json();
    
    if (result.success) {
      // Store user session
      await chrome.storage.local.set({ 
        user: result.user, 
        token: result.token,
        isAuthenticated: true 
      });
      
      showMessage(messageEl, 'Sign in successful! Redirecting...', 'success');
      
      // Redirect or close popup after success
      setTimeout(() => {
        // You can redirect to main extension page or close popup
        window.close();
      }, 1500);
    } else {
      showMessage(messageEl, result.message || 'Invalid credentials', 'error');
    }
  } catch (error) {
    showMessage(messageEl, 'Network error. Please try again.', 'error');
  } finally {
    setLoading(form, false);
  }
});

// Sign Up Form
document.getElementById('form-signup').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  const confirm = form.confirm.value;
  const messageEl = document.getElementById('signup-message');
  
  clearMessages();
  
  // Validate password match
  if (password !== confirm) {
    showMessage(messageEl, 'Passwords do not match', 'error');
    return;
  }
  
  // Validate password strength
  if (password.length < 8) {
    showMessage(messageEl, 'Password must be at least 8 characters', 'error');
    return;
  }
  
  setLoading(form, true);
  
  try {
    // API call to backend server
    const response = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    const result = await response.json();
    
    if (result.success) {
      showMessage(messageEl, 'Account created! Please sign in.', 'success');
      
      // Switch to sign in tab after 2 seconds
      setTimeout(() => {
        document.querySelector('[data-tab="signin"]').click();
        form.reset();
      }, 2000);
    } else {
      showMessage(messageEl, result.message || 'Registration failed', 'error');
    }
  } catch (error) {
    showMessage(messageEl, 'Network error. Please try again.', 'error');
  } finally {
    setLoading(form, false);
  }
});

// Forgot Password Form
document.getElementById('form-forgot').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value;
  const messageEl = document.getElementById('forgot-message');
  
  clearMessages();
  setLoading(form, true);
  
  try {
    // API call to backend server
    const response = await fetch('http://localhost:3000/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });
    const result = await response.json();
    
    if (result.success) {
      showMessage(messageEl, 'Password reset link sent to your email!', 'success');
      form.reset();
    } else {
      showMessage(messageEl, result.message || 'Email not found', 'error');
    }
  } catch (error) {
    showMessage(messageEl, 'Network error. Please try again.', 'error');
  } finally {
    setLoading(form, false);
  }
});

// Utility Functions
function showMessage(element, text, type) {
  element.textContent = text;
  element.className = `message show ${type}`;
}

function clearMessages() {
  document.querySelectorAll('.message').forEach(msg => {
    msg.className = 'message';
    msg.textContent = '';
  });
}

function setLoading(form, isLoading) {
  const button = form.querySelector('button[type="submit"]');
  const inputs = form.querySelectorAll('input');
  
  if (isLoading) {
    button.disabled = true;
    button.textContent = 'Loading...';
    inputs.forEach(input => input.disabled = true);
  } else {
    button.disabled = false;
    inputs.forEach(input => input.disabled = false);
    
    // Restore original button text
    if (form.id === 'form-signin') button.textContent = 'Sign In';
    if (form.id === 'form-signup') button.textContent = 'Create Account';
    if (form.id === 'form-forgot') button.textContent = 'Reset Password';
  }
}


// Check if user is already authenticated on load
chrome.storage.local.get(['isAuthenticated'], (result) => {
  if (result.isAuthenticated) {
    // User already logged in, you can redirect or show logged-in state
    console.log('User is already authenticated');
    // Optionally close popup or redirect to main extension page
  }
});
