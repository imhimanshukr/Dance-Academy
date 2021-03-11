const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');  //Mongoose Database
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const bodyparser = require('body-parser');
const port = 8000;

// DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
    
  });

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
        //Get Request
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})

        // Post Request
app.post('/contact', (req, res)=>{      // We have to install 'body-parser' for use post request
    var myData = new Contact(req.body);
    myData.save().then(()=> {
        res.send("This item is saved to the database")
    }).catch(()=> {
        res.status(404).send("Item was not saved to database")
    });
    // res.status(200).render('contact.pug');
});

// app.get('/contact', (req, res)=>{
//     const params = { }
// })

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
