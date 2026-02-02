// DOM Elements
const palindromeInput = document.getElementById('palindromeInput');
const palindromeResult = document.getElementById('palindromeResult');
const palindromeResultContent = document.getElementById('palindromeResultContent');

const arrayInput = document.getElementById('arrayInput');
const arrayResult = document.getElementById('arrayResult');
const arrayResultContent = document.getElementById('arrayResultContent');

const missingInput = document.getElementById('missingInput');
const missingResult = document.getElementById('missingResult');
const missingResultContent = document.getElementById('missingResultContent');

// Check Palindrome
function checkPalindrome() {
    const input = palindromeInput.value.trim();
    
    if (!input) {
        showError(palindromeResult, 'Please enter a string');
        return;
    }
    
    // Clean the string
    const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if palindrome
    let isPalindrome = true;
    for (let i = 0, j = cleaned.length - 1; i < j; i++, j--) {
        if (cleaned[i] !== cleaned[j]) {
            isPalindrome = false;
            break;
        }
    }
    
    // Display result
    const resultHTML = `
        <div class="palindrome-result ${isPalindrome ? 'palindrome-true' : 'palindrome-false'}">
            ${isPalindrome ? '✅ Palindrome Found!' : '❌ Not a Palindrome'}
        </div>
        <div style="margin-top: 15px;">
            <strong>Input:</strong> "${input.length > 50 ? input.substring(0, 50) + '...' : input}"
            <br>
            <strong>Cleaned:</strong> "${cleaned || '(empty)'}"
            <br>
            <strong>Length:</strong> ${cleaned.length} characters
        </div>
    `;
    
    palindromeResultContent.innerHTML = resultHTML;
    palindromeResult.classList.add('active');
}

// Find Min and Max
function findMinMax() {
    const input = arrayInput.value.trim();
    
    if (!input) {
        showError(arrayResult, 'Please enter numbers');
        return;
    }
    
    try {
        // Parse numbers
        const numbers = input.split(',')
            .map(num => num.trim())
            .filter(num => num !== '')
            .map(num => parseFloat(num))
            .filter(num => !isNaN(num));
        
        if (numbers.length === 0) {
            throw new Error('No valid numbers found');
        }
        
        // Find min and max
        const min = Math.min(...numbers);
        const max = Math.max(...numbers);
        const sum = numbers.reduce((a, b) => a + b, 0);
        const average = (sum / numbers.length).toFixed(2);
        
        // Display result
        const resultHTML = `
            <div class="minmax-container">
                <div class="min-box">
                    <h4>Minimum</h4>
                    <div class="value">${min}</div>
                </div>
                <div class="max-box">
                    <h4>Maximum</h4>
                    <div class="value">${max}</div>
                </div>
            </div>
            <div style="margin-top: 15px;">
                <strong>Array:</strong> [${numbers.join(', ')}]
                <br>
                <strong>Count:</strong> ${numbers.length} numbers
                <br>
                <strong>Sum:</strong> ${sum.toFixed(2)}
                <br>
                <strong>Average:</strong> ${average}
                <br>
                <strong>Range:</strong> ${(max - min).toFixed(2)}
            </div>
        `;
        
        arrayResultContent.innerHTML = resultHTML;
        arrayResult.classList.add('active');
        
    } catch (error) {
        showError(arrayResult, error.message || 'Invalid input. Use format: 1, 2, 3.5, -4');
    }
}

// Find Missing Numbers
function findMissingNumbers() {
    const input = missingInput.value.trim();
    
    if (!input) {
        showError(missingResult, 'Please enter numbers');
        return;
    }
    
    try {
        // Parse integers
        const numbers = input.split(',')
            .map(num => num.trim())
            .filter(num => num !== '')
            .map(num => parseInt(num))
            .filter(num => !isNaN(num) && Number.isInteger(num));
        
        if (numbers.length === 0) {
            throw new Error('No valid integers found');
        }
        
        // Find min and max
        const min = Math.min(...numbers);
        const max = Math.max(...numbers);
        
        // Find missing numbers
        const numberSet = new Set(numbers);
        const missing = [];
        
        for (let i = min; i <= max; i++) {
            if (!numberSet.has(i)) {
                missing.push(i);
            }
        }
        
        // Display result
        let resultHTML = '';
        
        if (missing.length === 0) {
            resultHTML = `
                <div style="color: var(--success-color); font-weight: 600; margin-bottom: 15px;">
                    ✅ Complete sequence! No missing numbers.
                </div>
            `;
        } else {
            resultHTML = `
                <div style="margin-bottom: 10px;">
                    <strong>Missing Numbers (${missing.length}):</strong>
                </div>
                <div class="missing-numbers">
                    ${missing.map(num => `<span class="missing-number">${num}</span>`).join('')}
                </div>
            `;
        }
        
        resultHTML += `
            <div style="margin-top: 20px;">
                <strong>Range:</strong> ${min} to ${max}
                <br>
                <strong>Total numbers:</strong> ${numbers.length}
                <br>
                <strong>Sequence length:</strong> ${max - min + 1}
                <br>
                <strong>Completeness:</strong> ${((numbers.length / (max - min + 1)) * 100).toFixed(1)}%
            </div>
        `;
        
        missingResultContent.innerHTML = resultHTML;
        missingResult.classList.add('active');
        
        // Animate missing numbers
        setTimeout(() => {
            const missingElements = document.querySelectorAll('.missing-number');
            missingElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        el.style.transform = 'scale(1)';
                    }, 200);
                }, index * 100);
            });
        }, 100);
        
    } catch (error) {
        showError(missingResult, error.message || 'Invalid input. Use format: 1, 2, 3, 5');
    }
}

// Example Functions
function loadPalindromeExample() {
    palindromeInput.value = 'A man, a plan, a canal: Panama';
    checkPalindrome();
}

function loadMinMaxExample() {
    arrayInput.value = '3, 7, -2, 15, 8.5, 4.2, 10';
    findMinMax();
}

function loadMissingExample() {
    missingInput.value = '1, 2, 4, 6, 7, 9, 10';
    findMissingNumbers();
}

function loadAllExamples() {
    loadPalindromeExample();
    setTimeout(loadMinMaxExample, 300);
    setTimeout(loadMissingExample, 600);
    showNotification('All examples loaded');
}

// Clear All
function clearAll() {
    // Clear inputs
    palindromeInput.value = '';
    arrayInput.value = '';
    missingInput.value = '';
    
    // Clear results
    const resultContainers = document.querySelectorAll('.result-container');
    resultContainers.forEach(container => {
        container.classList.remove('active');
    });
    
    showNotification('All inputs cleared');
}

// Helper Functions
function showError(resultElement, message) {
    const content = resultElement.querySelector('.result-content');
    content.innerHTML = `<div style="color: var(--danger-color);">❌ ${message}</div>`;
    resultElement.classList.add('active');
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Add Enter key support
    [palindromeInput, arrayInput, missingInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (input === palindromeInput) checkPalindrome();
                if (input === arrayInput) findMinMax();
                if (input === missingInput) findMissingNumbers();
            }
        });
    });
    
    // Clear results when input changes
    [palindromeInput, arrayInput, missingInput].forEach(input => {
        input.addEventListener('input', function() {
            const resultId = this.id === 'palindromeInput' ? 'palindromeResult' :
                           this.id === 'arrayInput' ? 'arrayResult' : 'missingResult';
            const resultElement = document.getElementById(resultId);
            resultElement.classList.remove('active');
        });
    });
    
    // Welcome message
    setTimeout(() => {
        showNotification('Welcome! Enter values or click Load Example to get started');
    }, 1000);
});
