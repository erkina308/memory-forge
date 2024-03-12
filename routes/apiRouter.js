const express = require("express");
const userRouter = require("./userRouter");
const authMiddleware = require("../authentication/authMiddleware");

const apiRouter = express.Router();

// Apply the authMiddleware to the entire API router
apiRouter.use(authMiddleware);

//route

apiRouter.use("/user", userRouter);

//error handling

apiRouter.use((req, res) => {
  res.status(404).json({ msg: "Not Found" });
});

module.exports = apiRouter;
