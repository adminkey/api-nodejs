import express, { Router } from 'express';
import favoresController from '../controllers/favoresController';

class FavoresRoutes {

    router : Router = Router ();

    constructor () {
        this.config();

    }

    config(){
        this.router.get('/', favoresController.list);
        // this.router.get('/:id', favoresController.getOne);
        this.router.post('/', favoresController.create);
        this.router.get('/publicar', favoresController.publicar);
        this.router.put('/:id', favoresController.update);
        this.router.delete('/:id', favoresController.delete);
        this.router.get('/prueba', favoresController.prueba);
    }
    
}
export default new FavoresRoutes().router;