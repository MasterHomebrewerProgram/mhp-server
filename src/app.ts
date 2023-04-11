import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session'
import crypto from 'crypto'
import passport from 'passport'

import sequelizeConnection from './../db/config'
import v1 from './v1'

// Set up persistent sessions
const SequelizeStore = require("connect-session-sequelize")(session.Store)

// Express definitions
const app = express();
const port = process.env.NODE_ENV === 'development' ? 3000 : 8080;

// Middleware
app.set('trust proxy', 1) 
app.use(session({
  secret: process.env.NODE_ENV === 'development' ? 'keyboard cat' : crypto.randomBytes(32).toString("hex"),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV !== 'development' },
  store: new SequelizeStore({
    db: sequelizeConnection
  })
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

// Sync database
sequelizeConnection.sync({
  force: process.env.NODE_ENV === 'development'
})

// API definitions
app.use(express.static('public'))
app.use('/api/v1', v1)

// Static content
// TODO(matt): make this serve React webpack assets
app.get('/', (req, res) => {
  res.send('Welcome to the MHP Homepage!');
});

// Serve
app.listen(port, () => {
  return console.log(`Listening at http://localhost:${port}`);
});