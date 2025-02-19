const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const mysql = require('mysql2/promise');
const MySQLStore = require('express-mysql-session')(session);
const turnos = require('./routes/turnos.js');
const canchas = require('./routes/cancha.js');
const establecimientos = require('./routes/establecimiento.js');

const sequelize = require('./util/database');


const cors = require('cors');
const config =  require('./config.js');

const app = express();

const dbOptions = {
	host: 'localhost',
	port: 3306,
	user: 'srdb',
	password: 'psw',
	database: 'turnosdb',
    
};


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'images');
    },
    filename: (req, file, cb) =>{
        cb (null,new Date().toISOString()+ '-'+ file.originalname);
    }

})
const filefilter = (req,file, cb) =>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);

    }else{
        cb (null, false)
    }
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

const sessionStore = new MySQLStore(dbOptions);

const TWO_HOURS = 1000 * 60 * 60 * 2

app.use(session({
	key: 'session_cookie_name',
	secret: 'sportsreelsupersecret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
    secure: false,
}));
app.use(bodyParser.json());
app.use('/images',express.static(path.join(__dirname, 'images')));
require('request').defaults({ rejectUnauthorized: false })
var allowedDomains = ['http://sportsreel.com.ar', 'https://sportsreel.com.ar',
'www.sportsreel.com.ar', 'https://www.sportsreel.com.ar'];


app.use((req, res, next) => {
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization,Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
    next();
});


if(process.env.NODE_ENV =="production"){
    app.use(cors({
        origin: function (origin, callback) {
          if (!origin) return callback(null, true);
       
          if (allowedDomains.indexOf(origin) === -1) {
            var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
            return callback(new Error(msg), false);
          }
          return callback(null, true);
        }
      }));
}else{
    app.use((req, res, next) => {
        res.set("Access-Control-Allow-Origin", "*");
        next();
    });  
}

app.use('/turnos', turnos); 
app.use('/canchas', canchas); 
app.use('/establecimientos', establecimientos);

app.use((error,req, res, next)=> {
    console.log(error);
    const status = error.statusCode || 500;
    const message= error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});


require('./models/associations'); //asociacions de clases para sequelize


sequelize.sync().then(result =>{//mantener en false y usar migraciones
  app.listen(3000);

}).catch(err =>{
  console.log(err)
});
