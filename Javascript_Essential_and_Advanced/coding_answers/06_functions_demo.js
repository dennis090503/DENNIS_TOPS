// TASK 1: Greeting function
console.log("=== Task 1: Greeting Function ===");

function greetUser(userName) {
    return "Hello, " + userName + "! Welcome to JavaScript!";
}

console.log(greetUser("John"));
console.log(greetUser("Sarah"));
console.log(greetUser("Mike"));

// TASK 2: Sum calculator
console.log("\n=== Task 2: Sum Calculator ===");

function calculateSum(num1, num2) {
    var result = num1 + num2;
    console.log("Calculating: " + num1 + " + " + num2 + " = " + result);
    return result;
}

var sum1 = calculateSum(5, 3);
var sum2 = calculateSum(100, 250);
var sum3 = calculateSum(-10, 7);

console.log("\nResults:");
console.log("5 + 3 = " + sum1);
console.log("100 + 250 = " + sum2);
console.log("-10 + 7 = " + sum3);