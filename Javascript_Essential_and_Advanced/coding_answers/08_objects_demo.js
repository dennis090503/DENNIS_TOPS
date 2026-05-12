// Create car object
console.log("=== Car Object Manipulation ===\n");

var car = {
    brand: "Toyota",
    model: "Camry",
    year: 2020
};

console.log("Original car object:");
console.log(car);

console.log("\nAccessing properties:");
console.log("Car brand: " + car.brand);
console.log("Car model: " + car["model"]);

console.log("\nUpdating year property:");
car.year = 2022;
console.log("Updated car object:");
console.log(car);

console.log("\nAdding new property:");
car.color = "Blue";
console.log("Final car object:");
console.log(car);

console.log("\nAll car details:");
console.log("Brand: " + car.brand);
console.log("Model: " + car.model);
console.log("Year: " + car.year);
console.log("Color: " + car.color);