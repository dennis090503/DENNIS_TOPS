// TASK 1: Check if number is positive, negative, or zero
console.log("=== Task 1: Number Checker ===");

function checkNumber(num) {
    if (num > 0) {
        console.log(num + " is POSITIVE");
    } else if (num < 0) {
        console.log(num + " is NEGATIVE");
    } else {
        console.log(num + " is ZERO");
    }
}

checkNumber(42);
checkNumber(-7);
checkNumber(0);
checkNumber(3.14);

// TASK 2: Switch statement for days of week
console.log("\n=== Task 2: Day of Week Finder ===");

function getDayName(dayNumber) {
    switch(dayNumber) {
        case 1:
            return "Monday - Start of the work week";
        case 2:
            return "Tuesday - Keep going";
        case 3:
            return "Wednesday - Halfway there";
        case 4:
            return "Thursday - Almost Friday";
        case 5:
            return "Friday - Weekend loading";
        case 6:
            return "Saturday - Weekend vibes";
        case 7:
            return "Sunday - Rest day";
        default:
            return "Invalid day number. Please enter 1-7";
    }
}

console.log("Day 1: " + getDayName(1));
console.log("Day 3: " + getDayName(3));
console.log("Day 5: " + getDayName(5));
console.log("Day 7: " + getDayName(7));
console.log("Day 10: " + getDayName(10));