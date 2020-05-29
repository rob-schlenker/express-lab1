
// import the required modules
const express = require("express");
const cors = require("cors");
const { cart } = require("./routes");

// define any configuration variables
const serverPort = 4000;

// create and instance of an Express server/app
const app = express();

// enable CORS, so our APIs can interact remotely
app.use(cors());

// allow the use of JSON
app.use(express.json());

// include our routes
app.use("/", cart);

// run the server
app.listen(serverPort, () => {
    console.log(`Server up and listening on port: ${serverPort}`);
})