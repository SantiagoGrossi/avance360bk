const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const mysql = require('mysql2/promise');
const MySQLStore = require('express-mysql-session')(session);
const obrasRoutes = require('./routes/obra.js');

const sequelize = require('./util/database');


const cors = require('cors');
const config =  require('./config.js');

const app = express();

const dbOptions = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'avance360',
    
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));


app.use(bodyParser.json());
app.use('/images',express.static(path.join(__dirname, 'images')));
require('request').defaults({ rejectUnauthorized: false })
var allowedDomains = ['http://avance360.com.ar', 'https://avance360.com.ar',
'www.avance360.com.ar', 'https://www.avance360.com.ar'];


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

app.use('/obra', obrasRoutes); 

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
