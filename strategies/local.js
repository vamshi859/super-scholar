import LocalStrategy from "passport-local";
import passport from "passport";
import Users from "../models/auth.js";

export default passport.use(new LocalStrategy(
    async (email, password) => {
        const user =  Users.findOne({email});
        console.log(user);
    }
))