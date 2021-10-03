const func_0 = () => {};

console.log(func_0());

const func_1 = async() => {};

console.log(func_1());

const func_2 = async() => 'Wernher Magnus Maximilian Freiherr von Braun';

console.log(func_2());

func_2().then(result => console.log(result)).catch(error => console.log(error));

const func_3 = async() => {throw new Error('something\'s wrong')};

func_3().then(result => console.log(result)).catch(error => console.log(error.message));

const add = (a, b) => new Promise((resolve, reject) => setTimeout(() => resolve(a + b), 2000));

const func_4 = async() => await add(1, 2);

func_4().then(result => console.log(result)).catch(error => console.log(error));

const func_5 = async() => {
    const result1 = await add(3, 4),
          result2 = await add(result1, 5),
          result3 = await add(result2, 6);
    
    return result3;
};

func_5().then(result => console.log(result)).catch(error => console.log(error));

const multiply = (a, b) => new Promise((resolve, reject) => setTimeout(() => {
    if(a < 0 || b < 0) return reject('Positive values only')
    
    resolve(a * b);
}, 3000));

const func_6 = async() => {
    const result1 = await multiply(1, 2),
          result2 = await multiply(result1, 3),
          result3 = await multiply(result2, -4);
    
    return result3;
};

func_6().then(result => console.log(result)).catch(error => console.log(error));