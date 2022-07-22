// Variables Used:
const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require("./db/db.json");
let ID = Math.floor(Math.random()*1000000000000);

// PORT ROUTES
const PORT = 3001;
console.log("Server online");
const app = express();

//App.use sections:
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// HTML route to pull up index page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//HTML route to pull up notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//API route 
app.get('/api/notes', (req,res) => {
  fs.readFile('./db/db.json', (err, data) => {
    const obj = JSON.parse(data);
    if (err) throw err;
    res.json(notes)
  });
})

// Post for notes
app.post('/api/notes', (req, res) => {
  req.body.id = ID
  notes.push(req.body)
  fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    res.json(notes);
  })
  
  app.delete("/api/notes/", (req, res) => {
    let chosenNoteToDelete = req.params.id;
    fs.readFile(__dirname + "/db/db.json", (err, data) => {
        res.json(notes);

        

        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(json), (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            res.send("Successfully deleted");
        });
    });
});
  

// Listen for Port
app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
