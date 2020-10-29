var express = require("express");
var path = require("path")
var fs = require("fs");


const userNotes = [];
 



var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// what client can see on the browser
app.use(express.static("public"));

app.get("/", function(req, res) {
    // concatanating where my file is
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
    // concatanating where my file is
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes",function(req,res) {
    res.sendFile (path.join(__dirname,"./db/db.json"));
})


app.delete("/api/notes/:id",function(req,res){
    let deleteNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let filteredArray = deleteNote.filter(function(note){
        // note object to brand new array
        return note.id != req.params.id
    })
    // turned objects into array
    fs.writeFileSync("./db/db.json", JSON.stringify(filteredArray));
    res.redirect("/notes")

})




app.post("/api/notes", function(req,res){
    let newNote = req.body;
    let saved = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    console.log(saved);
    newNote.id = saved.length
    saved.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(saved));
    console.log(req.body);
    res.json("added")
})





app.listen(PORT,() => console.log(`listening on PORT: ${PORT}`));
