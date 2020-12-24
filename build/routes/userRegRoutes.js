"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRegController_1 = __importDefault(require("../controllers/userRegController"));
class UserReg {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', userRegController_1.default.list);
        this.router.get('/:id', userRegController_1.default.getOne);
        this.router.post('/save/', userRegController_1.default.save);
        this.router.put('/:id', userRegController_1.default.update);
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
exports.default = new UserReg().router;
