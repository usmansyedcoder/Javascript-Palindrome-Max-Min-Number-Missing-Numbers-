 // Function to check palindrome
 function checkPalindrome() {
    var input = document.getElementById("palindromeInput").value.toLowerCase().replace(/[\W_]/g, ''); // Convert to lowercase and remove non-alphanumeric characters
    var resultDiv = document.getElementById("palindromeResult");
    
    if (input === input.split('').reverse().join('')) {
        resultDiv.textContent = "Yes, it's a palindrome!";
    } else {
        resultDiv.textContent = "No, it's not a palindrome!";
    }
}

// Function to find maximum and minimum numbers
function findMinMax() {
    var input = document.getElementById("arrayInput").value;
    var numbers = input.split(',').map(Number);
    var resultDiv = document.getElementById("arrayResult");

    var max = Math.max(...numbers);
    var min = Math.min(...numbers);

    resultDiv.textContent = "Maximum: " + max + ", Minimum: " + min;
}

// Function to find missing numbers
function findMissingNumbers() {
    var input = document.getElementById("missingInput").value;
    var numbers = input.split(',').map(Number).sort((a, b) => a - b);
    var resultDiv = document.getElementById("missingResult");

    var missing = [];
    for (var i = numbers[0]; i <= numbers[numbers.length - 1]; i++) {
        if (!numbers.includes(i)) {
            missing.push(i);
        }
    }

    if (missing.length === 0) {
        resultDiv.textContent = "No missing numbers found.";
    } else {
        resultDiv.textContent = "Missing numbers: " + missing.join(', ');
    }
}