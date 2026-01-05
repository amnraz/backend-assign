const express = require("express");
const app = express();

app.use(express.json());

app.use("/students", require("./routes/student.routes"));
app.use("/courses", require("./routes/course.routes"));
app.use("/", require("./routes/enrollment.routes"));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
