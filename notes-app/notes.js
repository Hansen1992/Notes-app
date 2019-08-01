const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    //prevent two notes from having the same title
    const firstDubplicate = notes.find((note) => note.title === title)
    if (!firstDubplicate) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('new note added!')
    } else {
        console.log('Note title taken')
    }

}
//læs op på remove commanden, når du kan. 
const removeNote = (title) => {
    const notes = loadNotes()
    const keepNotes = notes.filter((note) => note.title !== title)
    if (notes.length > keepNotes.length) {
        console.log(chalk.green('Note removed'));
        saveNotes(keepNotes);
    } else {
        console.log(chalk.red('Note was not found'))
    }

}
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse.green('Your notes'))
    notes.forEach(note => {
        console.log(note.title)
    }) 
}
const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)
    if(note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('note not found'))
    }
}
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}