const appID = "52350"; // Replace with your actual Deriv App ID
const redirectURL = window.location.origin; // Redirect back to the same site

// Redirect to Deriv login
function redirectToDeriv() {
    const derivAuthURL = `https://oauth.deriv.com/oauth2/authorize?app_id=${appID}&redirect_uri=${redirectURL}`;
    window.location.href = derivAuthURL;
}

// Extract token from URL after login
function getAuthTokenFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("token");
}

// Save token and show trading UI
function handleLogin() {
    const token = getAuthTokenFromURL();
    if (token) {
        localStorage.setItem("derivToken", token);
        window.history.replaceState({}, document.title, window.location.pathname); // Remove token from URL
    }

    const savedToken = localStorage.getItem("derivToken");
    if (savedToken) {
        document.getElementById('loginContainer').classList.add('hidden');
        document.getElementById('traderContainer').classList.remove('hidden');
    }
}

// Handle trade placement (UI only)
document.getElementById('tradeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const symbol = document.getElementById('symbol').value;
    const stake = document.getElementById('stake').value;
    const multiplier = document.getElementById('multiplier').value;
    alert(`Trade placed on ${symbol} with Stake: $${stake} and Multiplier: x${multiplier}`);
});

// Logout function
function logout() {
    localStorage.removeItem("derivToken");
    location.reload();
}

// Run login check
handleLogin();
