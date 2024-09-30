// public/script.js
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const welcomePage = document.getElementById('welcome-page');
const switchToSignupLink = document.getElementById('switch-to-signup');
const switchToLoginLink = document.getElementById('switch-to-login');
const loginError = document.getElementById('login-error');
const signupError = document.getElementById('signup-error');
const logoutButton = document.getElementById('logout-btn');
const kal2=document.getElementById('ka1');
// Show login form by default
loginForm.style.display = 'block';

// Switch to signup form
switchToSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
});

// Switch to login form
switchToLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// Handle signup form submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const response = await fetch('/api/candidates/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });

    const result = await response.json();
    if (response.ok) {
        alert(result.message);
        signupForm.reset();
        switchToLoginLink.click();
    } else {
        signupError.textContent = result.error;
    }
});

// Handle login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/api/candidates/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    console.log(result)
    if (response.ok) {
        loginForm.style.display = 'none';
        kal2.style.width='100%';
        welcomePage.style.display = 'block';
        document.getElementById('welcome-message').textContent = `Hi ${result.name}`;
        loginForm.reset();
        loginError.textContent = '';
    } else {
        loginError.textContent = result.error;
    }
});

// Handle logout
logoutButton.addEventListener('click', () => {
    welcomePage.style.display = 'none';
    kal2.style.width='300px';
    loginForm.style.display = 'block';
});

// Handle Apply button click
const applyNowButtons = document.querySelectorAll('.apply-now');
applyNowButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const position = button.getAttribute('data-position');
        const response = await fetch('/api/candidates/apply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ position })
        });

        const result = await response.json();
        if (response.ok) {
            alert(`You applied for the ${position} position!`);
        } else {
            alert(result.error);
        }
    });
});
