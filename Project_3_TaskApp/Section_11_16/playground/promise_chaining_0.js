const add = (a, b) => new Promise((resolve, reject) => setTimeout(() => resolve(a + b), 3000));

// without promise chaining
add(1, 2).then(result1 => {
    console.log(result1);

    add(result1, 3).then(result2 => console.log(result2)).catch(error => console.log(error));
}).catch(error => console.log(error));

// with promise chaining
const multiply = (a, b) => new Promise((resolve, reject) => setTimeout(() => resolve(a * b), 5000));

multiply(4, 5).then(result1 => {
    console.log(result1);

    return multiply(result1, 6);
}).then(result2 => console.log(result2)).catch(error => console.log(error));