const signInHandler = (db, bcrypt) => (req, res) => {
    const {email, password} = req.body;
    
    db('login')
        .where({email})
        .then(data => {
            if (bcrypt.compareSync(password, data[0].hash)) {
                db('users')
                    .where({email})
                    .then(user => res.json(user[0]))
                    .catch(err => res.status(400).json('Error getting the users'))
            }
            else{
                res.status(400).json('wrong credentials');
            }
        })
        .catch(err => res.status(400).json('Wrong Credentials'));
}

module.exports = {
    signInHandler: signInHandler
}