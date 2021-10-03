const yargs = require("yargs"),
  { getNotes, addNote, removeNote, readNote } = require("./notes");

yargs.version("1.1.0");

yargs.command({
  command: "add",
  describe: "add note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "note content",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    addNote(argv.title, argv.body);
  }
});

yargs.command({
  command: "remove",
  describe: "remove note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    removeNote(argv.title);
  }
});

yargs.command({
  command: "read",
  describe: "read note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    readNote(argv.title);
  }
});

yargs.command({
  command: "list",
  describe: "list note",
  handler() {
    getNotes();
  }
});

yargs.parse();
