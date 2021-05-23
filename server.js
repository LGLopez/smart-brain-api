const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile')
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '1234567890',
      database : 'smartbrain'
    }
  });

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res)=>{
    res.send('success');
})

app.post('/signin', signIn.signInHandler(db, bcrypt));

app.post('/register', register.RegisterHandler(db, bcrypt));

app.get('/profile/:id', profile.profileHandler(db));

app.put('/image', image.imageHandler(db));

app.post('/imageURL', image.handleApiCall());

app.listen(process.env.PORT || 3000, () => {
    console.log(`App running on ${process.env.PORT}`);
});
