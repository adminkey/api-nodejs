import { Request, Response, query } from 'express';
const jwt = require('jsonwebtoken');
// var nJwt = require('njwt');


import pool from '../database';
const llave = 'secreta';

class CurriculumController{
    

    public async list(req: Request, res: Response) {
        //res.json({tex:'linting user'});
        const users = await pool.query('SELECT * FROM hoja_vida');
        res.json(users.rows);
    }

    public async create(req: Request, res: Response): Promise<void> {
        res.json({ tex: 'creating user' });
        //console.log(req.body);
        await pool.query('INSERT INTO usuarios set ?', [req.body])
        res.json({ message: 'User Saved' });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        //res.json({tex:'deleting user' + req.params.id});
        const { id } = req.params;
        await pool.query('DELETE FROM usuarios WHERE cedula=?', [id]);
        res.json({ message: 'User was deleted' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        //res.json({tex:'updating user' + req.params.id});
        const { id } = req.params;
        await pool.query('UPDATE usuarios SET ? WHERE cedula = ?', [req.body, id]);
        res.json({ message: 'The user was updated' });

    }
}

const profileController = new CurriculumController;
export default profileController;