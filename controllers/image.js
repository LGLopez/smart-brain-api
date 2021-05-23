const clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: process.env.API_CLARIFAI
})

const handleApiCall = () => (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(response => res.json(response))
        .catch(err => console.log('unable to work with API'))

}

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
    imageHandler: imageHandler,
    handleApiCall: handleApiCall
}