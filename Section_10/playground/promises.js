const promise = new Promise((resolve, reject) => setTimeout(() => {
    // resolve('Success!');

    reject('Error!');
}, 3000));

promise.then(result => console.log(result)).catch(error => console.log(error));