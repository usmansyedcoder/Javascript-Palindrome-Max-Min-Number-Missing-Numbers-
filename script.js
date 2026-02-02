// DOM Elements
const palindromeInput = document.getElementById('palindromeInput');
const palindromeResult = document.getElementById('palindromeResult');
const arrayInput = document.getElementById('arrayInput');
const arrayResult = document.getElementById('arrayResult');
const missingInput = document.getElementById('missingInput');
const missingResult = document.getElementById('missingResult');

// Advanced Palindrome Checker
function checkPalindrome() {
    const input = palindromeInput.value.trim();
    
    if (!input) {
        showNotification('Please enter a string to check', 'warning');
        return;
    }
    
    // Show loading state
    palindromeResult.innerHTML = `
        <div class="result-title">
            <span class="loading"></span> Analyzing...
        </div>
    `;
    palindromeResult.classList.add('active');
    
    // Simulate processing delay for better UX
    setTimeout(() => {
        // Clean the string: remove non-alphanumeric, convert to lowercase
        const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        // Check if palindrome using two-pointer technique
        let isPalindrome = true;
        for (let i = 0, j = cleaned.length - 1; i < j; i++, j--) {
            if (cleaned[i] !== cleaned[j]) {
                isPalindrome = false;
                break;
            }
        }
        
        // Create result with animation
        const originalText = input.length > 50 ? input.substring(0, 50) + '...' : input;
        const resultHTML = `
            <div class="result-title">
                ${isPalindrome ? '✅ Palindrome Found!' : '❌ Not a Palindrome'}
            </div>
            <div class="result-content">
                <strong>Input:</strong> "${originalText}"
                ${input.length > 50 ? '<br><em>Text truncated for display</em>' : ''}
                <br><br>
                <strong>Cleaned Version:</strong> "${cleaned || '(empty after cleaning)'}"
                <br><br>
                <span class="${isPalindrome ? 'palindrome' : 'not-palindrome'}">
                    "${cleaned}" is ${isPalindrome ? '' : 'NOT '}a palindrome
                </span>
            </div>
        `;
        
        palindromeResult.innerHTML = resultHTML;
        
        // Add visual feedback
        palindromeResult.style.animation = 'none';
        setTimeout(() => {
            palindromeResult.style.animation = 'popIn 0.5s ease';
        }, 10);
        
        // Show success notification
        showNotification(
            isPalindrome ? 'Palindrome detected!' : 'Not a palindrome',
            isPalindrome ? 'success' : 'error'
        );
    }, 800);
}

// Advanced Min-Max Finder
function findMinMax() {
    const input = arrayInput.value.trim();
    
    if (!input) {
        showNotification('Please enter comma-separated numbers', 'warning');
        return;
    }
    
    // Show loading state
    arrayResult.innerHTML = `
        <div class="result-title">
            <span class="loading"></span> Finding Min & Max...
        </div>
    `;
    arrayResult.classList.add('active');
    
    setTimeout(() => {
        try {
            // Parse numbers, filter out invalid entries
            const numbers = input.split(',')
                .map(num => num.trim())
                .filter(num => num !== '')
                .map(num => {
                    const parsed = parseFloat(num);
                    return isNaN(parsed) ? null : parsed;
                })
                .filter(num => num !== null);
            
            if (numbers.length === 0) {
                throw new Error('No valid numbers found');
            }
            
            // Using reduce for better performance with large arrays
            const min = numbers.reduce((acc, curr) => Math.min(acc, curr), Infinity);
            const max = numbers.reduce((acc, curr) => Math.max(acc, curr), -Infinity);
            
            // Calculate statistics
            const sum = numbers.reduce((acc, curr) => acc + curr, 0);
            const average = (sum / numbers.length).toFixed(2);
            const range = max - min;
            
            // Create result with statistics
            const resultHTML = `
                <div class="result-title">
                    📊 Array Statistics
                </div>
                <div class="result-content">
                    <div class="array-minmax">
                        <div class="min-box">
                            <div>Minimum</div>
                            <div>${min}</div>
                        </div>
                        <div class="max-box">
                            <div>Maximum</div>
                            <div>${max}</div>
                        </div>
                    </div>
                    
                    <br>
                    <strong>Array Details:</strong>
                    <div style="font-family: 'Courier New', monospace; background: #f8fafc; padding: 10px; border-radius: 6px; margin: 10px 0;">
                        [${numbers.join(', ')}]
                    </div>
                    
                    <br>
                    <strong>Statistics:</strong>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>Array Size: ${numbers.length} elements</li>
                        <li>Range: ${range.toFixed(2)} (${max} - ${min})</li>
                        <li>Average: ${average}</li>
                        <li>Sum: ${sum.toFixed(2)}</li>
                    </ul>
                </div>
            `;
            
            arrayResult.innerHTML = resultHTML;
            showNotification(`Found ${numbers.length} valid numbers`, 'success');
            
        } catch (error) {
            arrayResult.innerHTML = `
                <div class="result-title" style="color: var(--danger-color);">
                    ❌ Error
                </div>
                <div class="result-content">
                    ${error.message}<br>
                    Please enter valid numbers separated by commas.
                    <br><br>
                    <strong>Example:</strong> 1, 2.5, -3, 4, 5.7
                </div>
            `;
            showNotification('Invalid input format', 'error');
        }
    }, 600);
}

// Advanced Missing Numbers Finder
function findMissingNumbers() {
    const input = missingInput.value.trim();
    
    if (!input) {
        showNotification('Please enter comma-separated numbers', 'warning');
        return;
    }
    
    // Show loading state
    missingResult.innerHTML = `
        <div class="result-title">
            <span class="loading"></span> Finding Missing Numbers...
        </div>
    `;
    missingResult.classList.add('active');
    
    setTimeout(() => {
        try {
            // Parse and sort numbers
            const numbers = input.split(',')
                .map(num => {
                    const parsed = parseInt(num.trim());
                    return isNaN(parsed) ? null : parsed;
                })
                .filter(num => num !== null)
                .sort((a, b) => a - b);
            
            if (numbers.length === 0) {
                throw new Error('No valid integers found');
            }
            
            // Find min and max
            const min = Math.min(...numbers);
            const max = Math.max(...numbers);
            
            // Find missing numbers using Set for O(1) lookup
            const numberSet = new Set(numbers);
            const missingNumbers = [];
            
            for (let i = min; i <= max; i++) {
                if (!numberSet.has(i)) {
                    missingNumbers.push(i);
                }
            }
            
            // Create result with visual representation
            let sequenceHTML = '';
            for (let i = min; i <= max; i++) {
                if (missingNumbers.includes(i)) {
                    sequenceHTML += `<span class="missing-number" style="opacity: 1;">${i}</span> `;
                } else {
                    sequenceHTML += `<span style="color: var(--gray-color);">${i}</span> `;
                }
            }
            
            const resultHTML = `
                <div class="result-title">
                    🔍 Missing Numbers Analysis
                </div>
                <div class="result-content">
                    <strong>Input Range:</strong> ${min} to ${max}
                    <br><br>
                    <strong>Complete Sequence:</strong>
                    <div style="margin: 15px 0; line-height: 2; word-wrap: break-word;">
                        ${sequenceHTML}
                    </div>
                    
                    <strong>Missing Numbers:</strong>
                    <div class="missing-numbers" style="margin-top: 10px;">
                        ${missingNumbers.length > 0 
                            ? missingNumbers.map(num => 
                                `<span class="missing-number">${num}</span>`
                              ).join('')
                            : '<span style="color: var(--success-color); font-weight: bold;">No missing numbers! ✅</span>'
                        }
                    </div>
                    
                    <br>
                    <strong>Summary:</strong>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>Total numbers: ${numbers.length}</li>
                        <li>Range size: ${max - min + 1}</li>
                        <li>Missing numbers: ${missingNumbers.length}</li>
                        <li>Completeness: ${((numbers.length / (max - min + 1)) * 100).toFixed(1)}%</li>
                    </ul>
                </div>
            `;
            
            missingResult.innerHTML = resultHTML;
            
            // Animate missing numbers
            setTimeout(() => {
                const missingElements = document.querySelectorAll('.missing-number');
                missingElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            el.style.transform = 'scale(1)';
                        }, 200);
                    }, index * 100);
                });
            }, 100);
            
            showNotification(
                missingNumbers.length > 0 
                    ? `Found ${missingNumbers.length} missing numbers` 
                    : 'No missing numbers found',
                missingNumbers.length > 0 ? 'info' : 'success'
            );
            
        } catch (error) {
            missingResult.innerHTML = `
                <div class="result-title" style="color: var(--danger-color);">
                    ❌ Error
                </div>
                <div class="result-content">
                    ${error.message}<br>
                    Please enter valid integers separated by commas.
                    <br><br>
                    <strong>Example:</strong> 1, 2, 4, 5, 7
                </div>
            `;
            showNotification('Invalid input format', 'error');
        }
    }, 800);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Icons for different types
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    notification.innerHTML = `
        <span style="margin-right: 10px;">${icons[type] || icons.info}</span>
        ${message}
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        background: ${getNotificationColor(type)};
        color: white;
        font-weight: 600;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
        display: flex;
        align-items: center;
    `;
    
    // Add keyframe animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
        info: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
    };
    return colors[type] || colors.info;
}

// Input Validation and Auto-formatting
function setupInputValidation() {
    // Auto-format array inputs
    arrayInput.addEventListener('input', function(e) {
        let value = e.target.value;
        // Allow only numbers, commas, dots, and spaces
        value = value.replace(/[^0-9,.\s-]/g, '');
        e.target.value = value;
    });
    
    missingInput.addEventListener('input', function(e) {
        let value = e.target.value;
        // Allow only integers, commas, and spaces
        value = value.replace(/[^0-9,\s-]/g, '');
        e.target.value = value;
    });
    
    // Enter key support
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
            const resultDiv = this.id === 'palindromeInput' ? palindromeResult :
                            this.id === 'arrayInput' ? arrayResult : missingResult;
            resultDiv.innerHTML = '';
            resultDiv.classList.remove('active');
        });
    });
}

// Example data button functionality
function setupExampleButtons() {
    // Add example buttons to each card
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        const btnGroup = card.querySelector('.btn-group');
        const exampleBtn = document.createElement('button');
        exampleBtn.className = 'btn btn-secondary';
        exampleBtn.innerHTML = '📋 Example';
        exampleBtn.onclick = () => loadExample(index);
        btnGroup.appendChild(exampleBtn);
    });
}

function loadExample(index) {
    const examples = [
        {
            input: palindromeInput,
            value: 'A man, a plan, a canal: Panama',
            action: checkPalindrome
        },
        {
            input: arrayInput,
            value: '3, 7, 2, -1, 15, 8.5, 4.2, 10',
            action: findMinMax
        },
        {
            input: missingInput,
            value: '1, 2, 4, 6, 7, 9, 10',
            action: findMissingNumbers
        }
    ];
    
    const example = examples[index];
    example.input.value = example.value;
    example.input.dispatchEvent(new Event('input'));
    
    // Trigger the action after a short delay
    setTimeout(example.action, 300);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Update HTML structure for better styling
    updateHTMLStructure();
    
    // Setup functionality
    setupInputValidation();
    setupExampleButtons();
    
    // Welcome message
    setTimeout(() => {
        showNotification('Welcome! Try entering some values or click "Example" for demo', 'info');
    }, 1000);
});

function updateHTMLStructure() {
    // Wrap each section in a card
    const sections = document.querySelectorAll('h2').forEach((h2, index) => {
        const section = h2.nextElementSibling.nextElementSibling;
        const card = document.createElement('div');
        card.className = 'card';
        
        // Move content into card
        while (section && !section.classList?.contains('card')) {
            const next = section.nextElementSibling;
            card.appendChild(section.cloneNode(true));
            section.remove();
            if (!next || next.tagName === 'H2') break;
            section = next;
        }
        
        // Insert card after h2
        h2.parentNode.insertBefore(card, h2.nextElementSibling);
        
        // Move h2 inside card as first child
        card.insertBefore(h2, card.firstChild);
    });
    
    // Wrap all cards in a container
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0) {
        const container = document.createElement('div');
        container.className = 'cards-container';
        
        // Insert container after navbar
        const navbar = document.querySelector('nav');
        navbar.parentNode.insertBefore(container, navbar.nextElementSibling);
        
        // Move all cards into container
        cards.forEach(card => {
            container.appendChild(card);
        });
    }
    
    // Update input and button structure
    document.querySelectorAll('.card').forEach(card => {
        const inputs = card.querySelectorAll('input');
        const buttons = card.querySelectorAll('button');
        const resultDiv = card.querySelector('div[id$="Result"]');
        
        // Wrap inputs
        inputs.forEach(input => {
            const wrapper = document.createElement('div');
            wrapper.className = 'input-group';
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(input);
        });
        
        // Wrap buttons
        if (buttons.length > 0) {
            const wrapper = document.createElement('div');
            wrapper.className = 'btn-group';
            buttons[0].parentNode.insertBefore(wrapper, buttons[0]);
            buttons.forEach(btn => {
                if (!btn.classList.contains('btn')) {
                    btn.className = 'btn btn-primary';
                }
                wrapper.appendChild(btn);
            });
        }
        
        // Update result div
        if (resultDiv) {
            resultDiv.className = 'result-container';
        }
    });
}
