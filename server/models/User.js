//schema that defines the structure of the user data and the events data
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
    allDay: Boolean,
    location: String,
    rrule: {
        freq: String,
        until: Date
    },
});

const UserSchema = new mongoose.Schema({
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
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    notes: String,
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "admin",
    },
    events: [EventSchema],
}, { timestamps: true });


const User = mongoose.model("User", UserSchema);
export default User;