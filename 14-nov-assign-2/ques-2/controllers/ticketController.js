const { readDB, writeDB } = require("../models/ticketModel");

// GET /tickets
function getAllTickets(req, res) {
  const db = readDB();
  res.json(db.tickets);
}

// GET /tickets/:id
function getTicketById(req, res) {
  const { id } = req.params;
  const db = readDB();
  const ticket = db.tickets.find(t => t.id === parseInt(id));

  if (!ticket) return res.status(404).json({ error: "Ticket not found" });
  res.json(ticket);
}

// POST /tickets
function createTicket(req, res) {
  const { title, description, priority, user } = req.body;
  const db = readDB();

  const newTicket = {
    id: db.tickets.length ? db.tickets[db.tickets.length - 1].id + 1 : 1,
    title,
    description,
    priority,
    user,
    status: "pending" // default
  };

  db.tickets.push(newTicket);
  writeDB(db);

  res.status(201).json(newTicket);
}

// PUT /tickets/:id
function updateTicket(req, res) {
  const { id } = req.params;
  const { title, description, priority } = req.body;

  const db = readDB();
  const ticket = db.tickets.find(t => t.id === parseInt(id));
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });

  if (title !== undefined) ticket.title = title;
  if (description !== undefined) ticket.description = description;
  if (priority !== undefined) ticket.priority = priority;

  writeDB(db);
  res.json(ticket);
}

// DELETE /tickets/:id
function deleteTicket(req, res) {
  const { id } = req.params;
  const db = readDB();

  const newList = db.tickets.filter(t => t.id !== parseInt(id));
  if (newList.length === db.tickets.length) {
    return res.status(404).json({ error: "Ticket not found" });
  }

  db.tickets = newList;
  writeDB(db);
  res.json({ message: "Ticket deleted" });
}

// PATCH /tickets/:id/resolve
function resolveTicket(req, res) {
  const { id } = req.params;
  const db = readDB();

  const ticket = db.tickets.find(t => t.id === parseInt(id));
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });

  ticket.status = "resolved";
  writeDB(db);
  res.json(ticket);
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  resolveTicket
};