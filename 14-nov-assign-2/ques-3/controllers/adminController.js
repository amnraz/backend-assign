const { readDB, writeDB } = require("../models/bookModel");

// POST /admin/books
function addBook(req, res) {
  const { title, author, genre, publishedYear } = req.body;

  if (!title || !author || !genre || !publishedYear) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const db = readDB();
  const newBook = {
    id: db.books.length ? db.books[db.books.length - 1].id + 1 : 1,
    title,
    author,
    genre,
    publishedYear,
    status: "available",
    borrowedBy: null,
    borrowedDate: null
  };

  db.books.push(newBook);
  writeDB(db);
  res.status(201).json(newBook);
}

// GET /admin/books
function getAllBooks(req, res) {
  const db = readDB();
  res.json(db.books);
}

// PATCH /admin/books/:id
function updateBook(req, res) {
  const { id } = req.params;
  const { title, author, genre, publishedYear } = req.body;

  const db = readDB();
  const book = db.books.find(b => b.id === parseInt(id));

  if (!book) return res.status(404).json({ error: "Book not found" });

  if (title) book.title = title;
  if (author) book.author = author;
  if (genre) book.genre = genre;
  if (publishedYear) book.publishedYear = publishedYear;

  writeDB(db);
  res.json(book);
}

// DELETE /admin/books/:id
function deleteBook(req, res) {
  const { id } = req.params;
  const db = readDB();
  const newBooks = db.books.filter(b => b.id !== parseInt(id));

  if (newBooks.length === db.books.length) {
    return res.status(404).json({ error: "Book not found" });
  }

  db.books = newBooks;
  writeDB(db);
  res.json({ message: "Book deleted successfully" });
}

module.exports = { addBook, getAllBooks, updateBook, deleteBook };