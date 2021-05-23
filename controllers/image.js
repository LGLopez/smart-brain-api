const imageHandler = (db) => (req, res) => {
    const { id } = req.body;
    
    db('users')
        .where({id})
        .increment('entries', 1)
        .returning('entries')
        .then(entry => res.json(entry[0]))
        .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
    imageHandler: imageHandler
}