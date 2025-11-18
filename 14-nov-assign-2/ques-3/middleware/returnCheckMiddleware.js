const { readDB } = require("../models/bookModel");

function returnCheckMiddleware(req, res, next) {
  const { id } = req.params;
  const db = readDB();
  const book = db.books.find(b => b.id === parseInt(id));

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  if (book.status !== "borrowed") {
    return res.status(400).json({ error: "Book is not currently borrowed" });
  }

  const borrowedDate = new Date(book.borrowedDate);
  const today = new Date();
  const diffDays = Math.floor((today - borrowedDate) / (1000 * 60 * 60 * 24));

  if (diffDays < 3) {
    return res.status(400).json({
      error: "Book cannot be returned within 3 days of borrowing."
    });
  }

  next();
}

module.exports = returnCheckMiddleware;