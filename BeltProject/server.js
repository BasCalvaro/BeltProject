// ---------------------------------------------------
// SERVER INITIALIZATION AND CONFIGURATION SETUP
// ---------------------------------------------------

// 1) Imports of 3rd-party Libraries
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser'); // to be able to read cookies

// 2) Intiliazing Express instance ('app') and define auxiliar variables
const app = express();
const port = 8000;

// 3) Enabling settings for being able to read JSON and parse url encoded data in requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// 4) Configuring cors in Express instace ('app')
const corsOptions = {
  credentials: true, // Allow credentials (cookies) to be sent to/from origin
  origin: 'http://localhost:3000', // Allow only this origin
  methods: 'GET, POST, PUT, DELETE', // Allow these methods
  // allowedHeaders: 'Content-Type, Authorization', // Allow these headers
};
app.use(cors(corsOptions));

// 5) Incorporating cookie-parser middleware to Express instance ('app')
app.use(cookieParser());

// 6) Initializing connection to NoSQL database (MongoDB) using Moongose interface
require("./server/config/mongoose.config");

// 6) Importing API routes and incorporating them to 'app' instance
const ProductRouter = require("./server/routes/author.routes");
ProductRouter(app);

// 7) Running instance of Express server in selected port
app.listen(port, () => console.log(`Server started at port: ${port}`));
