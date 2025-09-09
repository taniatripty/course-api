require('dotenv').config({ path: '.env.local' });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const purchaseRoutes = require('./routes/purchases');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get("/", (req, res) => {
  res.send(" Course API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/purchases", purchaseRoutes);


app.use(errorHandler);

// connectDB(process.env.MONGO_URI, process.env.DB_NAME).then(() => {
//   app.listen(process.env.PORT, () => {
//     console.log(` Server running on port ${process.env.PORT}`);
//   });
// });
module.exports = async (req, res) => {
  if (!global.__DB_CONNECTED__) {
    await connectDB(process.env.MONGO_URI, process.env.DB_NAME);
    global.__DB_CONNECTED__ = true;
  }
  app(req, res);
};