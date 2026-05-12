// Error handling demonstration
console.log("=== Error Handling Demo ===\n");

function divideNumbers(a, b) {
    try {
        console.log("Attempting to divide " + a + " by " + b);
        
        if (b === 0) {
            throw new Error("Cannot divide by zero");
        }
        
        var result = a / b;
        console.log("Result: " + result);
        return result;
        
    } catch (error) {
        console.log("ERROR CAUGHT: " + error.message);
        return null;
        
    } finally {
        console.log("Division operation completed");
        console.log("--------------------");
    }
}

console.log("Test 1: Normal division");
divideNumbers(10, 2);

console.log("\nTest 2: Division by zero");
divideNumbers(10, 0);

console.log("\nTest 3: Another normal division");
divideNumbers(25, 5);

console.log("\nTest 4: Negative numbers");
divideNumbers(-15, 3);

console.log("\nTest 5: Division by zero with decimal");
divideNumbers(7.5, 0);

// Additional example with user input (browser)
console.log("\n=== Browser Version Example ===");
console.log("The following would work in a browser environment:");

/*
function safeDivision() {
    try {
        var num1 = Number(prompt("Enter first number:"));
        var num2 = Number(prompt("Enter second number:"));
        
        if (isNaN(num1) || isNaN(num2)) {
            throw new Error("Please enter valid numbers");
        }
        
        if (num2 === 0) {
            throw new Error("Cannot divide by zero");
        }
        
        var result = num1 / num2;
        alert("Result: " + result);
        
    } catch (error) {
        alert("Error: " + error.message);
    }
}

safeDivision();
*/