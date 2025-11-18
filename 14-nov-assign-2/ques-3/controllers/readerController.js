const { readDB, writeDB } = require("../models/bookModel");
const transactionLogger = require("../middleware/transactionLogger");

// GET /reader/books
function getAvailableBooks(req, res) {
  const db = readDB();
  const availableBooks = db.books.filter(b => b.status === "available");
  res.json(availableBooks);
}

// POST /reader/borrow/:id
function borrowBook(req, res) {
  const { id } = req.params;
  const { readerName } = req.body;

  if (!readerName) {
    return res.status(400).json({ error: "Reader name is required" });
  }

  const db = readDB();
  const book = db.books.find(b => b.id === parseInt(id));

  if (!book) return res.status(404).json({ error: "Book not found" });
  if (book.status !== "available") {
    return res.status(400).json({ error: "Book is already borrowed" });
  }

  book.status = "borrowed";
  book.borrowedBy = readerName;
  book.borrowedDate = new Date().toISOString();

  writeDB(db);
  transactionLogger("borrowed", readerName, book.title);

  res.json(book);
}

// POST /reader/return/:id
function returnBook(req, res) {
  const { id } = req.params;

  const db = readDB();
  const book = db.books.find(b => b.id === parseInt(id));

  if (!book) return res.status(404).json({ error: "Book not found" });

  const readerName = book.borrowedBy;

  book.status = "available";
  book.borrowedBy = null;
  book.borrowedDate = null;

  writeDB(db);
  transactionLogger("returned", readerName, book.title);

  res.json(book);
}

module.exports = { getAvailableBooks, borrowBook, returnBook };