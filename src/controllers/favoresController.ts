
import { Request, Response } from 'express';


import pool from '../database';

class FavoresController {

    public async list(req: Request, res: Response) {
        // console.log("aqui list");
        const usuarios = await pool.query(`
        SELECT * FROM favores 
        WHERE publicado BETWEEN NOW() - INTERVAL '30 MINUTE' AND NOW();
        `);
        console.log(usuarios.rows);
        res.json(usuarios);
    }
    public async prueba(req: Request, res: Response) {
        console.log("aqui prueba");
        res.json ({text:'estoy en prueba'});
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        console.log('Aun no esta funcionando');
        // const { id } = req.params;
        // const producto = await pool.query('SELECT categorias.nombre as categoria, descripcion, descuento, imagen, productos.nombre, precio, stock FROM productos join categorias on Categorias_idCategoria = idCategoria WHERE idArticulo = ?', [id]);
        // console.log(producto.length);
        // if (producto.length > 0) {
        //     return res.json(producto[0]);
        // }
        // res.status(404).json({ text: "El producto no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
        // var registro = Date.now();
        console.log(req.body.dia_pub);
        const result = await pool.query(`INSERT INTO favores(
            idusuario, 
            duracion,
            publicado,
            creado,
            colaboradores,
            titulo,
            descripcion,
            valor,
            estado,
            prioridad,
            direccion,
            archivo)
            VALUES($1,$2,$3,now(),$4,$5,$6,$7,$8,$9,$10,$11) returning idfavor`,
            [req.body.idUsuario,
            req.body.duracion,
            req.body.publicado,
            req.body.colaboradores,
            req.body.titulo,
            req.body.descripcion,
            req.body.valor,
            req.body.estado,
            req.body.prioridad,
            req.body.direccion,
            req.body.archivo]);
        console.log(req.body.idUsuario);
        res.json(result);
        } catch (error) {
            console.log(error);
            res.json(error.name)
        }
        // finally(() => pool.end());
    }

    public async publicar(req: Request, res: Response) {
        console.log("publicar");
        // const { ciudad, direccion } = req.body;
        // console.log(ciudad);
        // console.log(direccion);
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProducto = req.body;
        await pool.query('UPDATE productos set ? WHERE idArticulo= ?', [req.body, id]);
        res.json({ message: "The producto was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM productos WHERE idArticulo = ?', [id]);
        res.json({ message: "The producto was deleted" });
    }
}

const favoresController = new FavoresController;
export default favoresController;