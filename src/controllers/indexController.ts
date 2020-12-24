import {Request,Response } from 'express';



class IndexController {
    public index (req: Request,res: Response){
        console.log("aquiiiiiiiiiiiiiiiiiii");
    res.json ({text:'hola otra vez'});
    }

}

export const indexController = new IndexController();