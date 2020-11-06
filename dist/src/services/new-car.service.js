"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNewCar = void 0;
const firebase_admin_1 = __importDefault(require("../firebase.admin"));
function setNewCar(car) {
    return firebase_admin_1.default.firestore().collection('carros').get().then(carrosList => {
        if (!carrosList.empty) {
            for (const carDoc of carrosList.docs) {
                const listedCar = carDoc.data();
                if (checkIfAlreadyExists(listedCar, car)) {
                    return null;
                }
            }
        }
        return firebase_admin_1.default.firestore().collection('carros').add(car).then(result => {
            return result ? true : false;
        });
    });
}
exports.setNewCar = setNewCar;
function checkIfAlreadyExists(carroListado, car) {
    if (car.fabricante === carroListado.fabricante) {
        if (car.modelo === carroListado.modelo) {
            if (car.ano === carroListado.ano) {
                if (car.cor === carroListado.cor) {
                    if (car.preco === carroListado.preco) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
