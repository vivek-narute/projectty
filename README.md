# CP Snippets - Chrome Extension Login

A modern, beautiful login page for a competitive programming snippets Chrome extension. Features Sign In, Sign Up, and Forgot Password functionality with a sleek dark UI.

## Features

✨ **Modern UI** - Dark theme with gradient header and smooth animations  
🔐 **Complete Auth Flow** - Sign In, Sign Up, and Forgot Password  
📱 **Responsive** - Optimized for Chrome extension popup (400px width)  
⚡ **Fast & Lightweight** - Pure HTML, CSS, and JavaScript (no frameworks)  
🎨 **Beautiful Design** - Professional gradient branding and polished UX  

## File Structure

```
project/
├── manifest.json      # Chrome extension manifest (v3)
├── popup.html         # Main login UI
├── popup.css          # Modern styling
├── popup.js           # Authentication logic
└── README.md          # This file
```

## Installation

1. **Open Chrome Extensions Page**
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" (top-right toggle)

2. **Load the Extension**
   - Click "Load unpacked"
   - Select the `project` folder

3. **Test the Extension**
   - Click the extension icon in your browser toolbar
   - The login popup will appear

## Usage

### Testing Credentials

For demo purposes, use these credentials:
- **Email:** `test@example.com`
- **Password:** `password123`

### Features

- **Sign In:** Login with existing credentials
- **Sign Up:** Create a new account with name, email, and password
- **Forgot Password:** Request a password reset link via email

## Customization

### Backend Integration

Replace the mock API functions in `popup.js` with real API calls:

```javascript
async function mockSignIn(email, password) {
  const response = await fetch('https://your-api.com/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return await response.json();
}
```

### Update API Permissions

Edit `manifest.json` to add your backend domain:

```json
"host_permissions": [
  "https://your-api.com/*"
]
```

### Styling

Modify CSS variables in `popup.css` to customize colors:

```css
:root {
  --color-primary: #3b82f6;  /* Change primary color */
  --color-bg: #0f172a;       /* Change background */
}
```

## Security Notes

⚠️ **Important Security Practices:**

1. **Never hardcode API keys** - Use Chrome's `chrome.storage` for sensitive data
2. **Use HTTPS** - Always communicate with your backend over HTTPS
3. **Validate inputs** - Both client-side and server-side validation required
4. **Hash passwords** - Never store plaintext passwords (use bcrypt, argon2, etc.)
5. **Use JWT tokens** - For session management after login

## Next Steps

1. **Connect to Backend** - Replace mock functions with real API endpoints
2. **Add Main Extension UI** - Create the code snippets interface after login
3. **Implement Snippets Storage** - Use `chrome.storage.sync` for cross-device sync
4. **Add Code Templates** - Quicksort, BFS, DFS, DSU, Dijkstra, etc.
5. **Inject into Coding Sites** - Use content scripts for LeetCode, Codeforces, etc.

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern gradients, animations, and flexbox
- **Vanilla JavaScript** - No dependencies
- **Chrome Extension API** - Storage and permissions

## Browser Support

- Chrome 88+ (Manifest V3)
- Edge 88+ (Chromium-based)
- Brave (Latest)

---

**Happy Coding! 🚀**  
Built for competitive programmers who want quick access to code templates.
