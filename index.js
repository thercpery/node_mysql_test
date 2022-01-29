const express = require("express");
const cors = require("cors");
const db = require("./config/database");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const { application } = require("express");

// Test DB
db.authenticate()
    .then(() => console.log("Database connected"))
    .catch(err => console.log(`Error: ${err}`));

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);


app.listen(port, () => console.log(`Server running at port ${port}`));
