"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = __importDefault(require("./keys"));
const { Pool } = require('pg');
const pool = new Pool(keys_1.default.database);
pool.connect(function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Conexion a la DB exitosa");
    }
});
exports.default = pool;
