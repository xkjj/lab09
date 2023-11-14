const express = require('express');
let app = express();

const cookieParser = require('cookie-parser');
const sessions = require('express-session');

//middleware to config sesssion data
app.use(sessions({
    secret: 'thisisasecret',
    saveUninitialized: false,
    resave: false
    })
);

//middleware to use the EJS template engine
app.set('view engine', 'ejs');

//middleware to be able POST <form> data 
app.use(express.urlencoded({extended: true}));


app.get('/fav',  (req, res) => {
    //get at the session object and store it ina local variable
    let sess_obj = req.session;
    //check to see if the key favband exists. If not then set if with the
    //string 'not choosen yet'
    if(!sess_obj.favband) {
        sess_obj.favband="not choosen yet";
    }
    //send the session object key favband to the band.ejs template
    res.render('band', {data: sess_obj.favband});
});

app.post('/fav',  (req, res) => {
    //get at the session object and store it ina local variable
    let sess_obj = req.session;
    //set the value from the text field equal to the session object key 'favband'
    sess_obj.favband = req.body.favourite;
    //send the session object key 'favband' to the band.ejs template
    res.render('band', {data: sess_obj.favband});
});

app.get('/page1',  (req, res) => {
    //get at the session object and store it ina local variable
    let sess_obj = req.session;
    //send the session object key 'favband' to the band.ejs template
   res.render('page1', {data: sess_obj.favband});
});

app.get('/page2',  (req, res) => {
    let sess_obj = req.session;
    res.render('page2', {data: sess_obj.favband});
});

app.listen(process.env.PORT || 3000, ()=>{ 
    console.log("server started on: localhost:3000/fav");
});