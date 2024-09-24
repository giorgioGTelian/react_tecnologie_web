import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes.js';
//import './services/passport.js';
import cookieSession from 'cookie-session';
import passport from 'passport';
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
    const { email, password, name, birthdate } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            email,
            password: hashedPassword,
            name,
            birthdate,
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
    const { email, password } = req.body;
    try {
        const user = await
        User.findOne({ email });
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
            _id: user._id, userEmail: user.email, 
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
