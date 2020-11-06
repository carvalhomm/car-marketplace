# Marketplace
Basic simulation marketplace system that retrieves a list of cars and inserts a new car

# Stack
  - Typescript
  - Jest
  - Nodemon
  - Express
  - Firebase Firestore

# Running the Application

You can run in `development` mode using

    npm run start:dev

Or

You can run in `production` mode using

    npm run build
    npm start

### Scripts

Below is a description of each included script

| Script | Description |
| ------ | ------ |
| start | Launch the compiled node application in vanilla js |
| start:dev | Launch the typescript application with nodemon |
| build | Compile the typescript application to vanilla js |
| test | Run jest to test your application  |
| test:watch | Run jest in watch-mode to test your application  |

### About the Application
The application is running on port `9000`

There are two REST Endpoints, which are:

    GET: getListOfCars
    POST: putNewCar

### getListOfCars
A REST endpoint using a GET protocol. There are 2 possible query parameters, `sortBy` and `method`.

 - sortBy: indicates the field to be queried
 - method: indicates if the ordenation is ascending or descending

Example:

    http://localhost:9000/

Example:

    http://localhost:9000/?sortBy=preco&method=asc


Possible values to `sortBy`:

- fabricante
- modelo
- ano
- cor
- preco

possible values to `method`:

- asc (ascending order)
- desc (descending order)

### putNewCar
A REST endpoint using a POST protocol. It receives a body with a property named `car`. This property is of type `Car`, which has the following schema:
```ts
export interface Car {
  ano: number;
  fabricante: string;
  modelo: string;
  cor: string;
  preco: string;
}
```
Example:

```json
{
  "car": {
    "ano": 2020,
    "fabricante": "Toyota",
    "modelo": "Etios",
    "cor": "preto",
    "preco": 89000
  }
}
```
