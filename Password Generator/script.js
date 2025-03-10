const form = document.getElementById('password-form');
const passwordOutput = document.getElementById('password-output');
const strengthMeter = document.querySelector('.strength-meter-fill');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const length = document.getElementById('password-length').value;
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeLowercase = document.getElementById('include-lowercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;

    const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    passwordOutput.textContent = password;
    updateStrengthMeter(password);
});

function generatePassword(length, upper, lower, numbers, symbols) {
    length = parseInt(length, 10);
    if (isNaN(length) || length <= 0) {
        return 'Password length must be a positive number.';
    }

    let chars = '';
    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (chars === '') return 'Please select at least one character type.';

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

function updateStrengthMeter(password) {
    const strength = calculatePasswordStrength(password);
    strengthMeter.style.width = `${strength}%`;

    if (strength < 33) {
        strengthMeter.style.backgroundColor = '#ff4d4d'; // Red for weak
    } else if (strength < 66) {
        strengthMeter.style.backgroundColor = '#ffd633'; // Yellow for moderate
    } else {
        strengthMeter.style.backgroundColor = '#5cd65c'; // Green for strong
    }
}

function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.match(/[a-z]+/)) strength += 25;
    if (password.match(/[A-Z]+/)) strength += 25;
    if (password.match(/[0-9]+/)) strength += 25;
    if (password.match(/[$@#&!]+/)) strength += 25;
    return Math.min(strength, 100);
}
