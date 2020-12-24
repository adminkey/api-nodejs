import mysql from 'promise-mysql';
import keys from './keys';
import pg from 'pg-promise';
const {Pool} = require('pg')

const pool = new Pool(keys.database);

pool.connect(function(err){
    if (err){
        console.log(err);
    }else{
        console.log("Conexion a la DB exitosa")
    }
}
);

export default pool; 
