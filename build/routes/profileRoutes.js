"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profileController_1 = __importDefault(require("../controllers/profileController"));
class ProfileRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // gets         
        this.router.get('/', profileController_1.default.users);
        //this.router.get('/usuario', profileController.list);        
        // post   
        //this.router.post('/', profileController.create);     
        //this.router.post('/', profileController.create);     
        //this.router.post('/', profileController.create);     
        //this.router.post('/', profileController.create);     
        //this.router.post('/', profileController.create);     
    }
}
exports.default = new ProfileRoutes().router;
