process.env.PORT = process.env.PORT || 5000;

//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//DB
let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27018/coffee';
} else {
    urlDB = 'mongodb://coffee:Quince0698.@ds253094.mlab.com:53094/coffee';
}

process.env.URLDB = urlDB;


