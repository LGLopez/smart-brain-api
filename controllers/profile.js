const profileHandler = (db) => (req,  res) => {
    const { id } = req.params;
    
    db('users')
        .where({id})                                        // table column and variable are the same then we can do that sintax
        .then(user => {
            if(user.length)
                res.json(user[0])
            else 
                res.status(400).json('not found')
        })
        .catch(err => res.status(400).json('error getting user'));
}

module.exports = {
    profileHandler: profileHandler
}