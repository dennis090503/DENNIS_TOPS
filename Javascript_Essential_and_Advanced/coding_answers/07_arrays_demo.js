// TASK 1: Array manipulation
console.log("=== Task 1: Fruit Array Manipulation ===");

var fruits = ["apple", "banana", "cherry"];
console.log("Original array: " + fruits);

fruits.push("orange");
console.log("After push (add to end): " + fruits);

fruits.shift();
console.log("After shift (remove first): " + fruits);

console.log("Final array: " + fruits);

// TASK 2: Sum of array elements
console.log("\n=== Task 2: Sum of Array Elements ===");

function sumArray(numbers) {
    var total = 0;
    for (var i = 0; i < numbers.length; i++) {
        total = total + numbers[i];
    }
    return total;
}

var numbersArray = [10, 20, 30, 40, 50];
console.log("Array: " + numbersArray);
console.log("Sum of all elements: " + sumArray(numbersArray));

var anotherArray = [5, 15, 25];
console.log("\nArray: " + anotherArray);
console.log("Sum of all elements: " + sumArray(anotherArray));