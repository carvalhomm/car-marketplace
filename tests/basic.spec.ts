import { setNewCar } from '../src/services/new-car.service';
import { getCars } from '../src/services/cars-list.service';
import admin from '../src/firebase.admin';;

describe('test to see if works properly', () => {
  it('should insert a new car in the list', async () => {
    const carro = {
      ano: 2020,
      fabricante: 'Ford',
      modelo: 'Fiesta',
      cor: 'dourado',
      preco: 5000
    };
    await setNewCar(carro);
    const docs = await admin.firestore().collection('carros').get();
    let carroEncontrado = false;
    for (const docum of docs.docs) {
      const carroListado = docum.data();
      if (carro.fabricante === carroListado.fabricante) {
        if (carro.modelo === carroListado.modelo) {
          if (carro.ano === carroListado.ano) {
            if (carro.cor === carroListado.cor) {
              if (carro.preco === carroListado.preco) {
                console.log('achou o carro ---> ', carro);
                carroEncontrado = true;
                break;
              }
            }
          }
        }
      }
    }
    console.log('docs --> ', docs);
    expect(carroEncontrado).toBe(true);
  });

  it('should get a list cars', async () => {
    const carros = await getCars({ sortBy: 'preco', method: 'asc' });
    console.log('lista de carros ----> ', carros);
    expect(carros.length).toBeGreaterThanOrEqual(1);
  });
});