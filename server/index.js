const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const { sequelize } = require("./models");
require("./config/passport"); // Configure passport strategies

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Express session
app.use(
  session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});