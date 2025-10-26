// server/config/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { socialUser as User } from "../models/SocialUser.models.js";

// Note: JWT logic is moved to the route handler (Step 2)

// ---------------- Google Strategy ----------------
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        let user = await User.findOne({ $or: [{ googleId: profile.id }, { email }] });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            googleId: profile.id,
            avatar: profile.photos?.[0]?.value,
            provider: "google",
            isAccountVerified: true,
          });
        } else if (!user.googleId) {
          user.googleId = profile.id;
          await user.save();
        }

        // CRITICAL CHANGE: Return the user object, not the JWT.
        return done(null, user); 
      } catch (err) {
        done(err);
      }
    }
  )
);

// ---------------- Facebook Strategy ----------------
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_APP_ID,
      clientSecret: process.env.FB_APP_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/facebook/callback`,
      profileFields: ["id", "displayName", "emails", "photos"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        let user = await User.findOne({ $or: [{ facebookId: profile.id }, { email }] });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            facebookId: profile.id,
            avatar: profile.photos?.[0]?.value,
            provider: "facebook",
            isAccountVerified: true,
          });
        } else if (!user.facebookId) {
          user.facebookId = profile.id;
          await user.save();
        }

        // CRITICAL CHANGE: Return the user object, not the JWT.
        return done(null, user); 
      } catch (err) {
        done(err);
      }
    }
  )
);

// Passport serialization is required for the user object to be passed to the route handler
passport.serializeUser((user, done) => {
  done(null, user); 
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;