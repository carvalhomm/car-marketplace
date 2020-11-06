"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCars = void 0;
const firebase_admin_1 = __importDefault(require("../firebase.admin"));
function getCars(queries) {
    return firebase_admin_1.default.firestore().collection('carros').orderBy(queries.sortBy ? queries.sortBy : 'ano', queries.method ? queries.method : 'asc').get().then(cars => {
        if (cars.empty) {
            return [];
        }
        const carros = [];
        for (const carDoc of cars.docs) {
            const car = carDoc.data();
            carros.push({
                id: carDoc.id,
                ...car
            });
        }
        return carros;
    });
}
exports.getCars = getCars;
