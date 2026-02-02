// PALINDROME CHECKER
function checkPalindrome() {
    const input = document.getElementById('palindromeInput').value.trim();
    const resultDiv = document.getElementById('palindromeResult');

    if (input === '') {
        resultDiv.textContent = 'Please enter a string!';
        resultDiv.className = 'error';
        return;
    }

    const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = cleaned.split('').reverse().join('');

    if (cleaned === reversed) {
        resultDiv.textContent = `"${input}" is a palindrome!`;
        resultDiv.className = 'success';
    } else {
        resultDiv.textContent = `"${input}" is not a palindrome.`;
        resultDiv.className = 'error';
    }
}

// FIND MAXIMUM AND MINIMUM NUMBERS
function findMinMax() {
    const input = document.getElementById('arrayInput').value.trim();
    const resultDiv = document.getElementById('arrayResult');

    if (input === '') {
        resultDiv.textContent = 'Please enter numbers!';
        resultDiv.className = 'error';
        return;
    }

    const numbers = input.split(',').map(n => Number(n.trim())).filter(n => !isNaN(n));

    if (numbers.length === 0) {
        resultDiv.textContent = 'Invalid numbers entered!';
        resultDiv.className = 'error';
        return;
    }

    const min = Math.min(...numbers);
    const max = Math.max(...numbers);

    resultDiv.textContent = `Minimum: ${min}, Maximum: ${max}`;
    resultDiv.className = 'success';
}

// IDENTIFY MISSING NUMBERS
function findMissingNumbers() {
    const input = document.getElementById('missingInput').value.trim();
    const resultDiv = document.getElementById('missingResult');

    if (input === '') {
        resultDiv.textContent = 'Please enter numbers!';
        resultDiv.className = 'error';
        return;
    }

    const numbers = input.split(',').map(n => Number(n.trim())).filter(n => !isNaN(n));
    if (numbers.length === 0) {
        resultDiv.textContent = 'Invalid numbers entered!';
        resultDiv.className = 'error';
        return;
    }

    const sorted = [...new Set(numbers)].sort((a, b) => a - b);
    const missing = [];
    for (let i = sorted[0]; i <= sorted[sorted.length - 1]; i++) {
        if (!sorted.includes(i)) missing.push(i);
    }

    if (missing.length === 0) {
        resultDiv.textContent = 'No missing numbers found.';
        resultDiv.className = 'success';
    } else {
        resultDiv.textContent = `Missing numbers: ${missing.join(', ')}`;
        resultDiv.className = 'error';
    }
}
