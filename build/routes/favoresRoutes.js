"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favoresController_1 = __importDefault(require("../controllers/favoresController"));
class FavoresRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', favoresController_1.default.list);
        // this.router.get('/:id', favoresController.getOne);
        this.router.post('/', favoresController_1.default.create);
        this.router.get('/publicar', favoresController_1.default.publicar);
        this.router.put('/:id', favoresController_1.default.update);
        this.router.delete('/:id', favoresController_1.default.delete);
        this.router.get('/prueba', favoresController_1.default.prueba);
    }
}
exports.default = new FavoresRoutes().router;
