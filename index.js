const express = require("express");
const app = express();
const cors = require("cors");
const apiRouter = require("./routes/apiRouter");
const port = 5000;

//middleware

app.use(cors());
app.use(express.json()); //gives us access to request.body

//this is where the routes are coming from

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
