// Array tasks

// 1. Create an array with three numbers
const numbersArray = [10, 20, 30];
console.log("Array:", numbersArray);
console.log("Array length:", numbersArray.length);

//2. Create an array with two strings
const namesArray = ["Lena", "Mary"];
namesArray.push("Sergio");
console.log("Array of names:", namesArray);
console.log("Array length::", namesArray.length);

//3. Create an array with three strings
const fruitsArray = ["Apple", "Banana", "Orange"];
fruitsArray.pop();
console.log("Array of fruits:", fruitsArray);
console.log("Array length::", fruitsArray.length);

//4. Create an empty array of numbers
const emptyArray = [];
emptyArray.push(10);
console.log("After adding first number:", emptyArray);
console.log("Length after first addition:", emptyArray.length);

emptyArray.push(20);
console.log("After adding second number:", emptyArray);
console.log("Length after second addition:", emptyArray.length);

// Loop tasks

//1. Create an array of five numbers
const numbers1 = [1, 2, 3, 4, 5];
console.log("Array elements:");
for (let i = 0; i < numbers1.length; i++) {
    console.log(numbers1[i]);
}

//2. Create an array of five numbers and calculate sum
const numbers2 = [10, 20, 30, 40, 50];
let sum = 0;
for (let i = 0; i < numbers2.length; i++) {
    sum += numbers2[i];
}
console.log("Array:", numbers2);
console.log("Sum of all elements:", sum);

//3. Create an array of three numbers
const numbers3 = [3, 7, 11];
const doubledArray = [];
for (let i = 0; i < numbers3.length; i++) {
    doubledArray.push(numbers3[i] * 2);
}
console.log("Original array:", numbers3);
console.log("Doubled array:", doubledArray);

//4. Create an array of three numbers in reverse order
const numbers = [100, 200, 300];
console.log("Original array:", numbers);

const reverseArray: number[] = [];
for (let i = numbers.length - 1; i >= 0; i--) {
    reverseArray.push(numbers[i]);
}
console.log("Array in reverse order: ", reverseArray);

// Typical interview tasks

//1. Find the maximum number in an array
const nums: number[] = [34, 12, 78, 45, 23, 91, 56];
let maxNumber = nums[0];
for (let i = 1; i < nums.length; i++) {
    if (nums[i] > maxNumber) {
        maxNumber = nums[i];
    }
}
console.log("Array:", nums);
console.log("Maximum number:", maxNumber);

//2. Find the minimum number in an array
const nums2 = [34, 12, 78, 45, 23, 91, 56];
let minNumber = nums2[0]; // Start with first element
for (let i = 1; i < nums2.length; i++) {
    if (nums2[i] < minNumber) {
        minNumber = nums2[i];
    }
}
console.log("Array:", nums2);
console.log("Minimum number:", minNumber);

//3. Count the number of even numbers in an array
const nums3 = [34, 12, 78, 45, 23, 91, 56, 13, 22];
let evenCount = 0;

for (let i = 0; i < nums3.length; i++) {
    if (nums3[i] % 2 === 0) {
        evenCount++;
    }
}
console.log("Array:", nums3);
console.log("Number of even numbers:", evenCount);

//4. Create a new array from positive numbers
const nums4 = [34, -12, 78, -45, 0, 23, -91, 56, -3, 22];
const positiveNumbers = [];

for (let i = 0; i < nums4.length; i++) {
    if (nums4[i] > 0) {
        positiveNumbers.push(nums4[i]);
    }
}
console.log("Original array:", nums4);
console.log("Positive numbers only:", positiveNumbers);