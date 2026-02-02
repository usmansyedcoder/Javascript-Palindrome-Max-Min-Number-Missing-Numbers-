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
        
        // Display result with pagination
        let resultHTML = '';
        
        // Create summary section
        resultHTML += `
            <div class="result-summary">
                <div class="summary-item">
                    <span class="summary-label">Range:</span>
                    <span class="summary-value">${min} to ${max}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Input Numbers:</span>
                    <span class="summary-value">${numbers.length}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Missing Numbers:</span>
                    <span class="summary-value">${missing.length}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Sequence Length:</span>
                    <span class="summary-value">${max - min + 1}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Completeness:</span>
                    <span class="summary-value">${((numbers.length / (max - min + 1)) * 100).toFixed(1)}%</span>
                </div>
            </div>
        `;
        
        if (missing.length === 0) {
            resultHTML += `
                <div style="color: var(--success-color); font-weight: 600; padding: 15px; background: rgba(56, 176, 0, 0.1); border-radius: 8px; text-align: center; margin: 15px 0;">
                    ✅ Complete sequence! No missing numbers found.
                </div>
            `;
        } else {
            // Add scrollable container with grid layout
            resultHTML += `
                <div style="margin: 20px 0 10px 0;">
                    <strong>Missing Numbers (${missing.length} total):</strong>
                    <span style="color: var(--gray-color); font-size: 0.9rem; margin-left: 10px;">
                        Showing all numbers in scrollable container
                    </span>
                </div>
                
                <div class="missing-numbers-container">
                    <div class="missing-numbers-grid">
                        ${missing.map(num => `<span class="missing-number-item">${num}</span>`).join('')}
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 10px; color: var(--gray-color); font-size: 0.9rem;">
                    <i>Scroll to see all ${missing.length} missing numbers</i>
                </div>
            `;
        }
        
        missingResultContent.innerHTML = resultHTML;
        missingResult.classList.add('active');
        
        // Add highlight animation
        setTimeout(() => {
            const missingElements = document.querySelectorAll('.missing-number-item');
            let delay = 0;
            
            missingElements.forEach((el, index) => {
                setTimeout(() => {
                    if (index < 20) { // Only animate first 20 for performance
                        el.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            el.style.transform = 'scale(1)';
                        }, 200);
                    }
                }, delay);
                delay += 20;
            });
        }, 100);
        
        showNotification(`Found ${missing.length} missing numbers between ${min} and ${max}`);
        
    } catch (error) {
        showError(missingResult, error.message || 'Invalid input. Use format: 1, 2, 3, 5');
    }
}

// Enhanced Example with large range
function loadMissingExample() {
    // Use a smaller range for example to show the scrollable feature
    missingInput.value = '1, 48, 49, 50, 51, 100';
    findMissingNumbers();
}

// Add large range example function
function loadLargeRangeExample() {
    missingInput.value = '1, 100';
    findMissingNumbers();
}

// Update the example buttons in HTML to include large range example
// You might want to add another button or modify the existing one
