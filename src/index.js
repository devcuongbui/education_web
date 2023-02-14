const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const expressHandlebars = require('express-handlebars');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const route = require('./routes');
const db = require('./config/db')

db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined'));

app.use(methodOverride('_method'));

app.engine('hbs',
  expressHandlebars.create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
  }

}).engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app);

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Example app listening on port ${port}`);
  }
});
