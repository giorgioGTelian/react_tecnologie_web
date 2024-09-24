//schema that defines the structure of the user data
import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
    }, 
    name: {
        type: String,
        required: [true, "ci serve un nome"],
        min: 3,
        max: 100,
    },
    email: {
        type: String,
        required: [true, "mail necessaria"],
        min: 3,
        max: 100,
    },
    password: {
        type: String,
        required: [true, "password necessaria"],
        min: 6,
        max: 100,
    },
    birthdate: {
        type: Date,
        default: Date.now,
        min: "1900-01-01",
        max: "2021-12-31",
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "admin",
    },
}, { timestamps: true });

// TODO plugin for passport-local-mongoose to handle password hashing using  bcrypt - TODO REMOVE PASSPORT
// UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);
export default User;