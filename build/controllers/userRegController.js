"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
// var nJwt = require('njwt');
const database_1 = __importDefault(require("../database"));
const llave = 'secreta';
class UserRegController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({tex:'linting user'});
            const users = yield database_1.default.query('SELECT * FROM usuarios');
            res.json(users.rows);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const users = yield database_1.default.query('SELECT * FROM usuarios WHERE idusuario=$1', [id]);
            res.json(users.rows);
        });
    }
    getToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("asdasd");
            const { token } = req.body;
            console.log(token);
            jwt.verify(token, llave, function (err, name, last, phone, email) {
                if (err) {
                    res.status(401).send({
                        error: 'Token inválido'
                    });
                }
                else {
                    res.send({
                        name: name,
                        last: last,
                        phone: phone,
                        email: email
                    });
                }
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, contra } = req.body;
            console.log(email);
            console.log(contra);
            const users = yield database_1.default.query('SELECT * FROM usuarios WHERE correo = $1 AND pass = $2 ', [email, contra]);
            if (users.length == 1) {
                const tok = this.crearToken(users[0].nombre, users[0].apellido, users[0].telefono, req.body.email);
                // const token = jwt.JsonWebToken.Encode(payload, llave, jwt.JwtHashAlgorithm.HS256);
                res.json({
                    mensaje: 'Autenticación correcta',
                    token: tok
                });
                // console.log("aqui");
                // return res.json(users);
                // const token = jwt.sign(user, JWT_SECRETKEY);
            }
            res.status(403).json({ text: "el usuario no existe" });
            /* console.log(users);
            res.json({text: 'user founded'}); */
        });
    }
    // public async create(req: Request, res: Response): Promise<void> {
    //     res.json({ tex: 'creating user' });
    //     //console.log(req.body);
    //     await pool.query('INSERT INTO usuarios set ?', [req.body])
    //     res.json({ message: 'User Saved' });
    // }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({tex:'deleting user' + req.params.id});
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM usuarios WHERE idusuario=$1', [id]);
            res.json({ message: 'User was deleted' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({tex:'updating user' + req.params.id});
            const { id } = req.params;
            console.log(req.body);
            yield database_1.default.query(`
        UPDATE usuarios SET 
        nombre = $1 ,
        apellido = $2,
        telefono = $3,
        correo = $4,
        pass = $5,
        img = $6
        WHERE idusuario = $7`, [req.body.nombre,
                req.body.apellido,
                req.body.telefono,
                req.body.correo,
                req.body.pass,
                req.body.img,
                id]);
            res.json({ message: 'The user was updated' });
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conex = yield database_1.default.query(`
            INSERT INTO 
            usuarios(nombre,apellido,telefono,correo,pass) 
            VALUES($1,$2,$3,$4,$5) returning idusuario`, [req.body.name,
                    req.body.last,
                    req.body.phone,
                    req.body.email,
                    req.body.pass]);
                const tok = this.crearToken(req.body.name, req.body.last, req.body.phone, req.body.email);
                res.json({
                    mensaje: 'Autenticación correcta',
                    token: tok
                });
            }
            catch (e) {
                res.json(e.name);
            }
        });
    }
    crearToken(name, last, phone, email) {
        const payload = {
            name,
            last,
            phone,
            email
        };
        const token = jwt.sign(payload, llave, {
            expiresIn: 740
        });
        // const token = jwt.JsonWebToken.Encode(payload, llave, jwt.JwtHashAlgorithm.HS256);
        return token;
    }
}
const userRegController = new UserRegController;
exports.default = userRegController;
