const passport = require("passport");
const db = require("../controllers/db");
const dotenv = require("dotenv");
dotenv.config();

const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(null, profile);
      // });

      try {
        const [rows] = await db
          .promise()
          .query("select * from users where google_id = ?", [profile.id]);
        if (rows.length > 0) {
          // user exit pass the user to passport
          return done(null, rows[0]);
        } else {
          // user doesnt exist , create a new user
          const [result] = await db
            .promise()
            .query(
              "insert into users (google_id,username , email,profile_picture) values(?,?,?,?)",
              [profile.id, profile.displayName, profile.emails[0].value,profile.photos[0].value]
            );

          // retrive the newly created user
          const [newUser] = await db
            .promise()
            .query("select * from users where google_id =?", [profile.id]);

          return done(null, newUser[0]);
        }
      } catch (error) {
        console.log(error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log(`serialising user` + user.id);
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const [rows] = await db
      .promise()
      .execute("select * from users where id = ?", [id]);
    if (rows.length > 0) {
      done(null, rows[0]);
    } else {
      done(new Error(""));
    }
  } catch (error) {
    console.log(error);
  }
});
