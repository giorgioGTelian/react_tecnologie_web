import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import auth from './auth.js';


//start a simple express server
dotenv.config();
const app = express();
const PORT =  9000; // process.env.PORT is for deployment

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

//register endpoint
app.post('/register', async (req, res) => {
    const { email, password, name, birthdate, city, state, country, occupation, phoneNumber, notes, role, events } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            email,
            password: hashedPassword,
            name,
            birthdate,
            city,
            state,
            country,
            occupation,
            phoneNumber,
            notes,
            role,    // Optional, will default to "admin" if not provided
            events   
        });
        await user.save().then((result) => {
                res.status(201).send({
                message: "user creato con successo ",
                result,
                user,
                });
            })
            .catch((error) => {
                res.status(500).send({
                message: "errore nella creazione utente",
                error,
                });
            });
    } catch (error) {
        res.status(500).json({ message: "ci sono stati errori nella richiesta di registrazione", error });
    }
});

//login endpoint
app.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await
        User.findOne({ name });
        if (!user) {
            return res.status(404).send({
                message: "utente non trovato",
            });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send({
                message: "password non valida",
            });
        }
        //create a token
        const token = jwt.sign({
            _id: user._id, userName: user.Name, 
        }, process.env.TOKEN_SECRET, 
        { expiresIn: '24h' }
        );
        res.header('auth-token', token).send({
            message: "login effettuato con successo",
            token,
        });
    } catch (error) {
        res.status(500).send({
            message: "errore nel login",
            error,
        });
    }
}
);

//save new event endpoint
app.post('/save-event', auth, async (req, res) => {
    const { title, start, end, allDay, location, rrule } = req.body;
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (!user) {
            return res.status(404).send({
                message: "utente non trovato",
            });
        }
        user.events.push({
            title,
            start,
            end,
            allDay,
            location,
            rrule,
        });
        await user.save();
        res.status(201).send({
            message: "evento salvato con successo",
            user,
        });
    } catch (error) {
        res.status(500).send({
            message: "errore nel salvataggio evento",
            error,
        });
    }  
});

// get all events endpoint for a specific user
app.get('/get-events', auth, async (req, res) => {
    try {
        const user
        = await User.findOne({ _id: req.user._id });
        if (!user) {
            return res.status(404).send({
                message: "utente non trovato",
            });
        }
        res.status(200).send({
            message: "eventi trovati con successo",
            events: user.events,
        });
    } catch (error) {
        res.status(500).send({
            message: "errore nel recupero eventi",
            error,
        });
    }
});

//logout endpoint
app.post('/logout', (req, res) => {
    res.status(200).send({
        message: "logout effettuato con successo",
    });
});

//save the notes for a specific user
app.post('/save-notes', auth, async (req, res) => {
    const { notes } = req.body;
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (!user) {
            return res.status(404).send({
                message: "utente non trovato",
            });
        }
        user.notes = notes;
        await user.save();
        res.status(201).send({
            message: "note salvate con successo",
            user,
        });
    } catch (error) {
        res.status(500).send({
            message: "errore nel salvataggio note",
            error,
        });
    }
});

//update user endpoint
app.put('/update-profile/:id', async (req, res) => {
    const { id } = req.params;
    const { birthdate, city, state, country, occupation, phoneNumber, notes } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Update user fields
        user.birthdate = birthdate || user.birthdate;
        user.city = city || user.city;
        user.state = state || user.state;
        user.country = country || user.country;
        user.occupation = occupation || user.occupation;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.notes = notes || user.notes;

        await user.save();

        res.status(200).send({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).send({ message: "Error updating profile", error });
    }
});

// authentication endpoint
app.get("/auth-endpoint", auth, (req, res) => {
    res.json({ message: "You are authorized to access me" });
});

// free endpoint
app.get("/free-endpoint", (req, res) => {
    res.json({ message: "You are free to access me anytime" });
});

/* //start the server at PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 */


//connect to the database
mongoose.connect(process.env.MONGO_URL)
.then(async () => {
    console.log('Connecting to MongoDB...');
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    console.log('Connection to MongoDB successful');

    /* ONLY ADD DATA ONE TIME - this is the initial data injection from data/index.js */
    
})
.catch((error) => console.log(`${error} did not connect`));
