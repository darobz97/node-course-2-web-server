const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//This creates a new express app
var app = express();

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//This tells express what view engine we want
app.set('view engine', 'hbs');
//__dirname is a var that stores the path to this project

/**app.use((req, res, next) => {
  res.render('maintenance.hbs');
  //No need to call next() because we don't want it to move
})**/

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log('Unable to append to server.log');
  });
  next();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Welcome Page',
    welcomeMessage: 'Welcome to this incredible website'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
})

app.get('/bad', (req, res) => {
  errorMessage: "There was a problem"
})

//This binds the app to a port on our machine
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
