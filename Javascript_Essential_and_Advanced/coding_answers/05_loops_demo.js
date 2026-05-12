// TASK 1: For loop - print numbers 1 to 10
console.log("=== Task 1: For Loop (1 to 10) ===");
for (var i = 1; i <= 10; i++) {
    console.log("Number: " + i);
}

// TASK 2: While loop - sum of even numbers between 1 and 20
console.log("\n=== Task 2: Sum of Even Numbers (1 to 20) ===");
var sum = 0;
var num = 1;

while (num <= 20) {
    if (num % 2 === 0) {
        sum = sum + num;
        console.log("Added " + num + ", running total: " + sum);
    }
    num++;
}
console.log("Final sum of even numbers between 1 and 20: " + sum);

// TASK 3: Do-while loop - ask for number > 10
console.log("\n=== Task 3: Number Validator (Browser Required) ===");
console.log("This task requires a browser environment for prompt()");

var userNumber;
do {
    userNumber = Number(prompt("Enter a number greater than 10:"));
    if (userNumber <= 10) {
        alert("Please enter a number greater than 10!");
    }
} while (userNumber <= 10);
alert("Thank you! You entered " + userNumber);