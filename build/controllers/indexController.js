"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        console.log("aquiiiiiiiiiiiiiiiiiii");
        res.json({ text: 'hola otra vez' });
    }
}
exports.indexController = new IndexController();
