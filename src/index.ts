import express from 'express';
import bodyParser from 'body-parser';
import { QueryParam, Method, Sort } from '../models/QueryParam.interface';
import { getCars } from './services/cars-list.service';
import { Car } from '../models/Car.interface';
import { setNewCar } from './services/new-car.service';
const app = express();

app.listen(9000);
app.use(bodyParser.json())
app.get('/getListOfCars', (request: any, response: any) => {
    const queries: QueryParam = request.query as any;
    if (queryParamsMisplaced(queries)) { return response.status(400).send({err: 'Parâmetros selecionados errados'}); }
    return getCars(queries).then(cars => {
        return response.status(202).send(cars);
    }).catch(err => {
        console.debug('unexpected error in get list of cars --> ', err);
        return response.status(500).send({err});
    });
});

app.post('/putNewCar', (request: any, response: any) => {
    const car: Car = request.body.car;
    if (!car) { return response.status(400).send({err: 'Um carro não foi enviado corretamente'}); }
    if (!isACar(car)) { return response.status(400).send({err: 'Request Body não é do tipo carro'}); }
    setNewCar(car).then(result => {
        if (result === null) { return response.status(400).send({ err: 'Esse mesmo carro já está cadastrado' }); }
        return response.status(202).send({result: 'Carro inserido com sucesso', code: true});
    }).catch(err => {
        console.debug('unexpected error in put new car --> ', err);
        return response.status(500).send({err});
    });
});

function isACar(carro: Car): boolean {
    const sorts: Sort[] = ['modelo', 'ano', 'cor', 'fabricante', 'preco'];
    for (const partCar in carro) {
        if (!sorts.includes(partCar as Sort)) { return false; }
    }
    return true;
} 

function queryParamsMisplaced(queries: QueryParam): boolean {
    if (!queries.method && !queries.sortBy) { return false; }
    const sorts: Sort[] = ['modelo', 'ano', 'cor', 'fabricante', 'preco'];
    const methods: Method[] = ['asc', 'desc'];
    if (queries.sortBy && !sorts.includes(queries.sortBy)) { return true; }
    if (queries.method && !methods.includes(queries.method)) { return true; }
    return false;
}
