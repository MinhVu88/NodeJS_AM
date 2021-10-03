const fs = require("fs"),
  chalk = require("chalk"),
  file = "./note.json";

// crud functions
const getNotes = () => loadNotesFromFile().forEach(note => console.log(chalk.yellowBright.bgCyanBright.bold(`Title: ${note.title} - Content: ${note.content}`)));

const addNote = (title, content) => {
  const notes = loadNotesFromFile(),
    duplicate_note = notes.find(note => note.title === title);

  debugger; // Section #5

  if (duplicate_note) {
    console.log(chalk.whiteBright.bgRedBright.bold("Note title taken"));
  } else {
    notes.push({ title, content });

    saveModifiedNotes(notes);

    console.log(chalk.blackBright.bgGreenBright.bold("New note added"));
  }
};

const removeNote = title => {
  const original_notes = loadNotesFromFile(),
    remaining_notes = original_notes.filter(note => note.title !== title);

  if (original_notes.length > remaining_notes.length) {
    console.log(chalk.blackBright.bgGreenBright.bold("Note removed"));

    saveModifiedNotes(remaining_notes);
  } else {
    console.log(chalk.whiteBright.bgRedBright.bold("Note not found"));
  }
};

const readNote = title => {
  const notes = loadNotesFromFile(),
    note = notes.find(n => n.title === title);

  if (note) {
    console.log("Title:", chalk.blackBright.bgGreenBright.bold(`${note.title}`), " - Content:", note.content);
  } else {
    console.log(chalk.whiteBright.bgRedBright.bold("Note not found"));
  }
};

// util functions
const loadNotesFromFile = () => {
  try {
    const dataBuffer = fs.readFileSync(file),
      dataJSON = dataBuffer.toString(),
      dataObjects = JSON.parse(dataJSON);

    return dataObjects;
  } catch (error) {
    return [];
  }
};

const saveModifiedNotes = notes => {
  const dataJSON = JSON.stringify(notes);

  fs.writeFileSync(file, dataJSON);
};

module.exports = { getNotes, addNote, removeNote, readNote };
