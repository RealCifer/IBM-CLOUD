const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User.cjs');

passport.serializeUser((user, done) => {
  console.log("🔹 Serializing User googleId:", user.googleId);
  done(null, user.googleId); // Store googleId instead of _id
});

passport.deserializeUser(async (googleId, done) => {
  try {
    console.log("🔹 Deserializing User googleId:", googleId);
    const user = await User.findOne({ googleId }); // Search by googleId
    done(null, user);
  } catch (error) {
    console.error("❌ Error in Deserialization:", error);
    done(error, null);
  }
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true
}, async (request, accessToken, refreshToken, profile, done) => {
  try {
    console.log("🔹 Access Token:", accessToken);
    console.log("🔹 Profile:", profile);

    // Find the user by Google ID
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      user = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value || '',
        picture: profile.photos?.[0]?.value || ''
      });
      await user.save();
    }

    return done(null, user);
  } catch (error) {
    console.error("🔥 Error in Google Strategy:", error);
    return done(error, null);
  }
}));

module.exports = passport;
