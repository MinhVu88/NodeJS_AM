const call_back = callback => {setTimeout(() => {
    // callback('Error!', undefined);

    callback(undefined, 'Success!')
}, 3000)};

call_back((error, result) => {
    if(error) return console.log(error);

    console.log(result);
});