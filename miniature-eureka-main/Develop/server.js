const express = require('express');
const path = require('path');
const fs = require('fs');

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
  fs.readFile('./db/db.json', "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  
}

)





// Get request says post recieved


app.get('/notes', (req, res) => 
res.json(`${req.method} request received to get reviews`));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/notes'))
);


app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
