const express = require('express');

const app = express();

app.use(express.json());

const database = {
    users: [{
        id: 123,
        name: "John",
        email: "john@email.com",
        password: "cookies",
        entries: 0,
        joined: new Date()
    },
    {
        id: 124,
        name: "Mary",
        email: "Mary@email.com",
        password: "notecookies",
        entries: 0,
        joined: new Date()
    }
    ]
}

app.get('/', (req, res)=>{
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json('signed');
    }
    else{
        res.status(400).json('error logging in');
    }
});
 
app.post('/register', (req, res) => {
    const { email, password, name } = req.body;

    database.users.push({
        id: 125,
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let isFound = false;
    
    database.users.forEach( user => {
        if (user.id.toString() === id) {
            isFound = true;
            return res.json(user);
        }
    });

    if (!isFound) {
        res.status(400).json('not found');
    }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let isFound = false;
    
    database.users.forEach( user => {
        if (user.id.toString() === id) {
            isFound = true;
            user.entries++;
            return res.json(user.entries);
        }
    });

    if (!isFound) {
        res.status(400).json('not found');
    }
});

app.listen(3020, () => {
    console.log('app running on port 3020');
});
