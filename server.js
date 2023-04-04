const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express.json());


const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;
const NODE_PORT = process.env.NODE_PORT;


async function connectToMongo() {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log('Error connecting to MongoDB Atlas', err);
    }
}

connectToMongo();


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// const user = new User({
//     username: 'kjyh',
//     password: '1234',
// });

// user.save()
//     .then(user => {
//         console.log('User saved', user);
//     })
//     .catch(err => {
//         console.error('Error saving user', err);
//     });


// app.post 함수를 만들어줘
app.post('/', (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;

    const user = new User({
        username: username,
        password: password,
    });

    user.save()
        .then(user => {
            console.log('User saved', user);
            res.send(user);
        })
        .catch(err => {
            console.error('Error saving user', err);
            res.status(500).send('Error saving user');
        });
})

app.get('/', (req, res) => {
    res.send('Hello Express!');
})

app.listen(NODE_PORT, () => {
    console.log(`Server is up on port ${NODE_PORT}`);
})


