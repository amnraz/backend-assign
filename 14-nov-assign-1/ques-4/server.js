const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;
app.use(express.json());

app.get("/all-books", (req, res) => {
    let data = JSON.parse(fs.readFileSync("./db.json", "utf8"))
    console.log(data.books);
    let books = data.books
    res.json({ msg: "List of Books", books })
});

app.post("/add-books", (req, res) => {
    let newBook = req.body
    // console.log(newBook);

    let data = JSON.parse(fs.readFileSync("./db.json", "utf8"))
    let books = data.books

    let id = books[books.length - 1].id + 1
    newBook = { ...newBook, id }

    books.push(newBook)

    fs.writeFileSync("./db.json", JSON.stringify(data))
   
    res.status(201).json({msg: "New Books added"})
});

app.put("/update-books/:id", (req, res) => {
    let id = req.params.id
    let updatedBook = req.body
    //  console.log(req.params);
    let data = JSON.parse(fs.readFileSync("./db.json", "utf8"))
    let books = data.books

    let ind = books.findIndex((books) => books.id == id)
    if (ind == -1) {
        res.json({ msg: "Book Not Found" })
    } else {
        // console.log(ind);
        let updateBook = books.map((el,i)=>{
            if(el.id==id){
                return{...el,...updatedBook}
            }else{
                return el 
            }
        })
            data.books = updateBook 
            fs.writeFileSync("./db.json", JSON.stringify(data))
            res.json({ msg: "Book Updated" })
    }

});

app.delete("/delete-books/:id", (req, res) => {
    let id = req.params.id
    // let updatedBook = req.body
    //  console.log(req.params);
    let data = JSON.parse(fs.readFileSync("./db.json", "utf8"))
    let books = data.books

    let ind = books.findIndex((books) => books.id == id)
    if (ind == -1) {
        res.status(404).json({ msg: "404 Not Found" })
    } else {
        // console.log(ind);
        let updateBook = books.filter((el,i)=>{
             return el.id != id
        })
            data.books = updateBook 
            fs.writeFileSync("./db.json", JSON.stringify(data))
            res.json({ msg: "Book Deleted" })
    }
      
});












app.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
});