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
const database_1 = __importDefault(require("../database"));
class FavoresController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("aqui list");
            const usuarios = yield database_1.default.query(`
        SELECT * FROM favores 
        WHERE publicado BETWEEN NOW() - INTERVAL '30 MINUTE' AND NOW();
        `);
            console.log(usuarios.rows);
            res.json(usuarios);
        });
    }
    prueba(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("aqui prueba");
            res.json({ text: 'estoy en prueba' });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Aun no esta funcionando');
            // const { id } = req.params;
            // const producto = await pool.query('SELECT categorias.nombre as categoria, descripcion, descuento, imagen, productos.nombre, precio, stock FROM productos join categorias on Categorias_idCategoria = idCategoria WHERE idArticulo = ?', [id]);
            // console.log(producto.length);
            // if (producto.length > 0) {
            //     return res.json(producto[0]);
            // }
            // res.status(404).json({ text: "El producto no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // var registro = Date.now();
                console.log(req.body.dia_pub);
                const result = yield database_1.default.query(`INSERT INTO favores(
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
            VALUES($1,$2,$3,now(),$4,$5,$6,$7,$8,$9,$10,$11) returning idfavor`, [req.body.idUsuario,
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
            }
            catch (error) {
                console.log(error);
                res.json(error.name);
            }
            // finally(() => pool.end());
        });
    }
    publicar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("publicar");
            // const { ciudad, direccion } = req.body;
            // console.log(ciudad);
            // console.log(direccion);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const oldProducto = req.body;
            yield database_1.default.query('UPDATE productos set ? WHERE idArticulo= ?', [req.body, id]);
            res.json({ message: "The producto was Updated" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM productos WHERE idArticulo = ?', [id]);
            res.json({ message: "The producto was deleted" });
        });
    }
}
const favoresController = new FavoresController;
exports.default = favoresController;
