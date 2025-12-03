const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const User = require("./user.model");
const { connection } = require("./db");

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

// ---------------- GITHUB STRATEGY ----------------

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/github/callback",
      scope: ["user:email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let email = "";
        if (profile.emails && profile.emails.length > 0) {
          email = profile.emails[0].value;
        }

        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          user = await User.create({
            githubId: profile.id,
            username: profile.username,
            email,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// ---------------- ROUTES ----------------

// LOGIN WITH GITHUB
app.get("/auth/github", passport.authenticate("github", { session: false }));

// CALLBACK URL
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { session: false }),
  async (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login Successful",
      token,
      user,
    });
  }
);

// BASIC TEST ROUTE
app.get("/", (req, res) => {
  res.send("GitHub OAuth Login Working!");
});

// ---------------- SERVER START ----------------

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to DB:", err);
  }
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
