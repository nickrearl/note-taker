const express = require('express')

const path = require('path')
const fs = require('fs')

const db = require('./db/db.json')

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))

function createNewNote(body, notesArray) {
    const note = body
    notesArray.push(note)
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify({ db: notesArray }, null, 2))
}

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res)=>{
    let notes = db 
    res.send(notes)
})

app.post('/api/notes', (req, res)=>{
    
    createNewNote(req.body, db)
    
    res.json(db)
})



app.listen(PORT, ()=>{
    console.log(`API server now on port ${PORT}`);
})