const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require("./db/db.json");
let ID = Math.floor(Math.random()*1000000000000);


const PORT = 3001;
console.log("Server online");

const app = express();



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
    console.log("this 11111111111111111111111", obj);
    res.json(notes)
  });
  
})

app.post('/api/notes', (req, res) => {
  req.body.id = ID
  console.log("This worked", req.body); notes.push(req.body)
  fs.writeFileSync('./db/db.json', JSON.stringify(notes))
  
  // (err) =>  {
  //   // const obj = JSON.parse(data);
  //   if (err) {console.log(err)}
    
  // })
    res.json(notes);
    // fs.appendFile('./db/db.json', JSON.stringify(req.body), (err) => {
    //   if (err) { console.log(error) }
    //   res.json(req.body)


})





// Get request says post recieved


// app.get('/notes', (req, res) => 
// res.json(`${req.method} request received to get reviews`));

// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '/notes'))
// );


app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
