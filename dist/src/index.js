"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cars_list_service_1 = require("./services/cars-list.service");
const new_car_service_1 = require("./services/new-car.service");
const app = express_1.default();
app.listen(9000);
app.use(body_parser_1.default.json());
app.get('/getListOfCars', (request, response) => {
    const queries = request.query;
    if (queryParamsMisplaced(queries)) {
        return response.status(400).send({ err: 'Parâmetros selecionados errados' });
    }
    return cars_list_service_1.getCars(queries).then(cars => {
        return response.status(202).send(cars);
    }).catch(err => {
        console.debug('unexpected error in get list of cars --> ', err);
        return response.status(500).send({ err });
    });
});
app.post('/putNewCar', (request, response) => {
    const carro = request.body.car;
    if (!carro) {
        return response.status(400).send({ err: 'Um carro não foi enviado corretamente' });
    }
    if (!isACar(carro)) {
        return response.status(400).send({ err: 'Request Body não é do tipo carro' });
    }
    new_car_service_1.setNewCar(carro).then(result => {
        if (result === null) {
            return response.status(400).send({ err: 'Esse mesmo carro já está cadastrado' });
        }
        return response.status(202).send({ result: 'Carro inserido com sucesso', code: true });
    }).catch(err => {
        console.debug('unexpected error in put new car --> ', err);
        return response.status(500).send({ err });
    });
});
function isACar(carro) {
    const sorts = ['modelo', 'ano', 'cor', 'fabricante', 'preco'];
    for (const partCar in carro) {
        if (!sorts.includes(partCar)) {
            return false;
        }
    }
    return true;
}
function queryParamsMisplaced(queries) {
    if (!queries.method && !queries.sortBy) {
        return false;
    }
    const sorts = ['modelo', 'ano', 'cor', 'fabricante', 'preco'];
    const methods = ['asc', 'desc'];
    if (queries.sortBy && !sorts.includes(queries.sortBy)) {
        return true;
    }
    if (queries.method && !methods.includes(queries.method)) {
        return true;
    }
    return false;
}
