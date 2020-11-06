import admin from '../firebase.admin';
import { Car } from "../../models/Car.interface";

export function setNewCar(car: Car): Promise<boolean> {
    return admin.firestore().collection('carros').get().then(carsList => {
        if (!carsList.empty) {
            for (const carDoc of carsList.docs) {
                const listedCar = carDoc.data() as Car;
                if (checkIfAlreadyExists(listedCar, car)) { return null; }
            }
        }
        return admin.firestore().collection('carros').add(car).then(result => {
            return result ? true : false;
        });
    });
}

function checkIfAlreadyExists(listedCar: Car, car: Car): boolean {
    if (car.fabricante === listedCar.fabricante) {
        if (car.modelo === listedCar.modelo) {
            if (car.ano === listedCar.ano) {
                if (car.cor === listedCar.cor) {
                    if (car.preco === listedCar.preco) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}