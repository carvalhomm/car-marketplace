import admin from '../firebase.admin';
import { Car } from "../../models/Car.interface";
import { QueryParam } from "../../models/QueryParam.interface";

export function getCars(queries: QueryParam): Promise<Car[]> {
    return admin.firestore().collection('carros').orderBy(queries.sortBy ? queries.sortBy : 'ano', queries.method ? queries.method : 'asc').get().then(carsList => {
        if (carsList.empty) { return []; }
        const cars: Car[] = [];
        for (const carDoc of carsList.docs) {
            const car = carDoc.data() as Car;
            cars.push({
                id: carDoc.id,
                ...car
            });
        }
        return cars;
    });
}