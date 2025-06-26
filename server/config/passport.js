
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const AppleStrategy = require("passport-apple").Strategy;
const { User } = require("../models");

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: "MY_CLIENT_ID",
      clientSecret: "MY_CLIENT_SECRET",
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const [user, created] = await User.findOrCreate({
          where: { email: profile.emails[0].value },
          defaults: { password: "" }, // Social logins don't have a password
        });
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: "YOUR_FACEBOOK_APP_ID",
      clientSecret: "YOUR_FACEBOOK_APP_SECRET",
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "emails", "name"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const [user, created] = await User.findOrCreate({
          where: { email: profile.emails[0].value },
          defaults: { password: "" },
        });
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: "YOUR_GITHUB_CLIENT_ID",
      clientSecret: "YOUR_GITHUB_CLIENT_SECRET",
      callbackURL: "/auth/github/callback",
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const [user, created] = await User.findOrCreate({
          where: { email: profile.emails[0].value },
          defaults: { password: "" },
        });
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Apple Strategy
passport.use(
  new AppleStrategy(
    {
      clientID: "YOUR_APPLE_CLIENT_ID",
      teamID: "YOUR_APPLE_TEAM_ID",
      keyID: "YOUR_APPLE_KEY_ID",
      privateKeyLocation: "path/to/your/AuthKey.p8",
      callbackURL: "/auth/apple/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const [user, created] = await User.findOrCreate({
          where: { email: profile.email },
          defaults: { password: "" },
        });
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
