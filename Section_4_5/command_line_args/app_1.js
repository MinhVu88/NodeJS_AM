/* Challenge #1: Add 2 new commands (print placeholder messages to the console for now)
    - Set up 'list' command
    - Set up 'read' command
    - Run both commands & check the output
*/

/* Challenge #2: Add an option to yargs
    - Set up a body option for the 'add' command
    - Configure a description & make it a required string
    - Log the body value in the handler function
    - Test your work
*/

const yargs = require('yargs');

// console.log(process.argv);

/*
- The version() method allows you to set the version of your node.js app   

- So, if you deploy a command line app, people can run —version to see what it is   

- Typically versions are broken down as Major.Minor.Build   

- Therefore your 1st production release might be 1.0.0  

- If you then add many great new features, your next release might be 2.0.0 

- However if you fix only minor things it might be 1.1.0  

- If you do a code reorganization but no features change, maybe the next version is 1.0.1
*/
yargs.version('1.1.0');

// set up yargs to work with commands commonly used in a notes app (add, remove, read & list)
yargs.command({
    command: 'add',
    describe: 'add note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'note content',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        console.log('Adding a new note -> Title:', argv.title,'| Content:',argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'remove note',
    handler: function() {console.log('Removing a note')}
});

yargs.command({
    command: 'read',
    describe: 'read note',
    handler: function() {console.log('Reading a note')}
});

yargs.command({
    command: 'list',
    describe: 'list note',
    handler: function() {console.log('Listing notes')}
});

// console.log(yargs.argv);

yargs.parse();