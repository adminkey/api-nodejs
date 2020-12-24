import { Request, Response, query } from 'express';
const jwt = require('jsonwebtoken');
// var nJwt = require('njwt');


import pool from '../database';
const llave = 'secreta';

class UserRegController {

    public async list(req: Request, res: Response) {
        //res.json({tex:'linting user'});
        const users = await pool.query('SELECT * FROM usuarios');
        res.json(users.rows);
    }

    public async getOne(req: Request, res: Response) {        
        const { id } = req.params;        
        const users = await pool.query('SELECT * FROM usuarios WHERE idusuario=$1', [id]);
        res.json(users.rows);
    }

    public async getToken(req: Request, res: Response) {
        // console.log("asdasd");
        const { token } = req.body;
        console.log(token);
        jwt.verify(token, llave, function (err, name, last, phone, email) {
            if (err) {
                res.status(401).send({
                    error: 'Token inválido'
                })
            } else {
                res.send({
                    name: name,
                    last: last,
                    phone: phone,
                    email: email
                })
            }
        })
    }

    public async login(req: Request, res: Response) {
        const { email, contra } = req.body;
        console.log(email);
        console.log(contra);
        const users = await pool.query('SELECT * FROM usuarios WHERE correo = $1 AND pass = $2 ', [email, contra]);

        if (users.length == 1) {
            const tok = this.crearToken(
                users[0].nombre,
                users[0].apellido,
                users[0].telefono,
                req.body.email)
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
    }

    // public async create(req: Request, res: Response): Promise<void> {
    //     res.json({ tex: 'creating user' });
    //     //console.log(req.body);
    //     await pool.query('INSERT INTO usuarios set ?', [req.body])
    //     res.json({ message: 'User Saved' });
    // }

    public async delete(req: Request, res: Response): Promise<void> {
        //res.json({tex:'deleting user' + req.params.id});
        const { id } = req.params;
        await pool.query('DELETE FROM usuarios WHERE idusuario=$1', [id]);
        res.json({ message: 'User was deleted' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        //res.json({tex:'updating user' + req.params.id});
        const { id } = req.params;
        console.log(req.body);
        await pool.query(`
        UPDATE usuarios SET 
        nombre = $1 ,
        apellido = $2,
        telefono = $3,
        correo = $4,
        pass = $5,
        img = $6
        WHERE idusuario = $7`,
        [req.body.nombre,
        req.body.apellido,
        req.body.telefono,
        req.body.correo,
        req.body.pass,
        req.body.img,            
        id]);
        res.json({ message: 'The user was updated' });

    }
    
    public async save(req: Request, res: Response): Promise<void> {
        try {
            const conex = await pool.query(`
            INSERT INTO 
            usuarios(nombre,apellido,telefono,correo,pass) 
            VALUES($1,$2,$3,$4,$5) returning idusuario`,
                [req.body.name,
                req.body.last,
                req.body.phone,
                req.body.email,
                req.body.pass]);
            const tok = this.crearToken(
                    req.body.name,
                    req.body.last,
                    req.body.phone,
                    req.body.email)
            res.json({
                mensaje: 'Autenticación correcta',
                token: tok
            });
        } catch (e) {
            res.json(e.name);
        }
    }
    private crearToken(name, last, phone, email) {
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
export default userRegController;