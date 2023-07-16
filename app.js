const express = require("express");
require("dotenv").config();
const tasks = require("./Routes/task");
const connectDb = require("./Config/connect");
const notFound = require("./Middlewares/notFound");
const errorHandler = require("./Middlewares/errorHandler");
const app = express();

//@ Middlware
app.use(express.json());

app.use("/api/v1/tasks", tasks);

app.use(notFound);

app.use(errorHandler);

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}.....`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
