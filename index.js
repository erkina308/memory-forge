const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./authentication/authRouter");
const apiRouter = require("./routes/apiRouter");
const port = 3000;

//middleware
app.use(cors());
app.use(express.json()); //gives us access to request.body

//this is where the routes are coming from
app.use("/auth", authRouter);
app.use("/api", apiRouter);

//error handling

app.use((err, req, res, next) => {
  // handle custom errors
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }

  // handle specific psql errors
  else if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    // if the error hasn't been identified,
    // respond with an internal server error
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

//app.listen

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use.`);
  } else {
    console.error(`Error: ${err.message}`);
  }
  process.exit(1); // Terminate the application on error
});
