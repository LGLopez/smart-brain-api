const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.send('this is working');
})
 
app.listen(3020, () => {
    console.log('app running on port 3020');
});
