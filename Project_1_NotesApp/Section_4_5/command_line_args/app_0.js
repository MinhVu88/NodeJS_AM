const command = process.argv[2];

if (command === 'add') {
    console.log('Adding note', process.argv);
} else if(command === 'remove') {
    console.log('Removing note', process.argv);
}