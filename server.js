const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//This creates a new express app
var app = express();
//process.env stores all of our environment variables as key-value pairs. We look for PORT
//Heroku creates that port. If it doesn't exist, we use the local port
const port = process.env.PORT || 3000;

/**
git init to create the repository and the .git file
git add to add a file
git status to see what files are in the git repository
git commit -m (alias:message, to keep track of all the changes) 'Initial commit'
after git commit we have saved the project as it currently is
**/

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
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Portfolio Page'
  })
});

app.get('/bad', (req, res) => {
  errorMessage: "There was a problem"
});

//This binds the app to a port on our machine
//start the server in the port 3000 (or another one)
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
