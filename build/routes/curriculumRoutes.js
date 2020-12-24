"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const curriculumController_1 = __importDefault(require("../controllers/curriculumController"));
class CurriculumRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // gets 
        this.router.get('/', curriculumController_1.default.list);
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
exports.default = new CurriculumRoutes().router;
