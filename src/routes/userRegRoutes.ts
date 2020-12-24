import express, { Router } from 'express';
import userRegController from '../controllers/userRegController';

class UserReg {

    router : Router = Router ();

    constructor () {
        this.config();

    }

    config(){
        
        this.router.get('/', userRegController.list);
        this.router.get('/:id', userRegController.getOne);
        this.router.post('/save/',userRegController.save);
        this.router.put('/:id',userRegController.update);
        /*
        this.router.get('/', userRegController.list);
        this.router.get('/:id', userRegController.getOne);
        this.router.post('/login', userRegController.login);
        this.router.post('/token', userRegController.getToken);
        this.router.post('/reg', userRegController.create);
        this.router.delete('/:id',userRegController.delete);
        */

    }

    
}
export default new UserReg().router;