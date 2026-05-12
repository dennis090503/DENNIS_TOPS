var num1 = 20;
var num2 = 5;

console.log("=== Arithmetic Operations ===");
console.log("Addition: " + num1 + " + " + num2 + " = " + (num1 + num2));
console.log("Subtraction: " + num1 + " - " + num2 + " = " + (num1 - num2));
console.log("Multiplication: " + num1 + " * " + num2 + " = " + (num1 * num2));
console.log("Division: " + num1 + " / " + num2 + " = " + (num1 / num2));

var a = 10;
var b = 20;
var c = "10";

console.log("\n=== Comparison Operations ===");
console.log("Is " + a + " equal to " + b + "? " + (a == b));
console.log("Is " + a + " equal to " + c + " (loose)? " + (a == c));
console.log("Is " + a + " equal to " + c + " (strict)? " + (a === c));
console.log("Is " + a + " greater than " + b + "? " + (a > b));
console.log("Is " + a + " less than " + b + "? " + (a < b));

var x = 15;
var y = 3;
var condition1 = (x > 10);
var condition2 = (y < 5);

console.log("\n=== Logical Operations ===");
console.log("Is " + x + " > 10? " + condition1);
console.log("Is " + y + " < 5? " + condition2);
console.log("Both conditions true? " + (condition1 && condition2));
console.log("At least one condition true? " + (condition1 || condition2));
console.log("NOT condition1? " + (!condition1));