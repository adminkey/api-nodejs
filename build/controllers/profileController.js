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
const jwt = require('jsonwebtoken');
// var nJwt = require('njwt');
const database_1 = __importDefault(require("../database"));
const llave = 'secreta';
class ProfileController {
    users(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({tex:'linting user'});
            const users = yield database_1.default.query('SELECT * FROM usuarios');
            res.json(users.rows);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({ tex: 'creating user' });
            //console.log(req.body);
            yield database_1.default.query('INSERT INTO usuarios set ?', [req.body]);
            res.json({ message: 'User Saved' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({tex:'deleting user' + req.params.id});
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM usuarios WHERE cedula=?', [id]);
            res.json({ message: 'User was deleted' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({tex:'updating user' + req.params.id});
            const { id } = req.params;
            yield database_1.default.query('UPDATE usuarios SET ? WHERE cedula = ?', [req.body, id]);
            res.json({ message: 'The user was updated' });
        });
    }
}
const profileController = new ProfileController;
exports.default = profileController;
