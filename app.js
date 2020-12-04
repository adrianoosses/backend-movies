const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
let cors = require('cors');
app.use(cors());
// #TAREA: listar peliculas
let usr = require('./components/user/router.js');
let or = require('./components/order/router.js');

let bodyParser = require('body-parser')
app.use(bodyParser.json());

const MongoURI = process.env.MongoURI || 'mongodb://localhost:27017/db-back-movies';
mongoose.connect(MongoURI, {
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false
})
    .then(() => console.log('Mongoose connected'))
    .catch(e => console.error('Mongoose not connected', e));

app.use('/user', usr.routes);
app.use('/order', or.routes);

app.get('/', (req, res) => { 
    res.sendFile('index.html', {root: __dirname })
});

app.listen(PORT, () => console.log("Sever running"));

