function transactionLogger(action, reader, bookTitle) {
  const now = new Date().toISOString();
  console.log(`[${now}] ${reader} ${action} "${bookTitle}"`);
}

module.exports = transactionLogger;