import express, { Router } from 'express';
import curriculumController from '../controllers/curriculumController';

class CurriculumRoutes {

    router : Router = Router ();

    constructor () {
        this.config();

    }

    config(){
        // gets 
        this.router.get('/', curriculumController.list); 
        //this.router.get('/curriculum', profileController.hv); 
        //this.router.get('/usuario', profileController.list);        
                        
        // post   
        //this.router.post('/', profileController.create);     
        //this.router.post('/', profileController.create);     
        //this.router.post('/', profileController.create);     
        //this.router.post('/', profileController.create);     
        //this.router.post('/', profileController.create);     
        
    }
    
}
export default new CurriculumRoutes().router;