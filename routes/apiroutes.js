const router = require('express').Router();
const util = require('util');
const fs = require('fs');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const {v1: uuidv1} = require('uuid')

router.get('/notes', (req, res) => {
    readFileAsync('db/db.json', 'utf8').then((notes)=> {
        let parsedNotes 
        parsedNotes = [].concat(JSON.parse(notes))
        res.json(parsedNotes)
    })
})
router.post("/notes", (req, res) => {
    let {title, text} = req.body
    const newNote = {title, text, id: uuidv1()}
    readFileAsync('db/db.json', 'utf8').then((notes)=> {
        let parsedNotes 
        parsedNotes = [].concat(JSON.parse(notes))
        return parsedNotes
    }).then(noteData => {
        updatedNotes = [...noteData, newNote]
        writeFileAsync('db/db.json', JSON.stringify(updatedNotes));
        res.json(updatedNotes)
    })
})
router.delete("/notes/:id", (req, res) => {
    noteId = req.params.id
    readFileAsync('db/db.json', 'utf8').then((notes)=> {
        let parsedNotes 
        parsedNotes = [].concat(JSON.parse(notes))
        return parsedNotes
    }).then((noteData) => noteData.filter((note)=> note.noteId !== noteId))
    .then((filteredNotes)=>{
            console.log(noteId)
            console.log(filteredNotes)
            writeFileAsync('db/db.json', JSON.stringify(filteredNotes));
            res.json({
                ok: true
            })
        })
})





module.exports = router