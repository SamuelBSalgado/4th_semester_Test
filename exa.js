// Author: Francisco Samuel Becerra Salgado
// Email: samuelb0279@gmail.com
/*
+----------------------------------------------------------------------------------------------------------------------+
| THIS IS AN EXAM RESOLVED BY ME IN THE FOURTH SEMESTER OF SOFTWARE ENGINEERING.                                       |
| I RECOMMEND COMMENTING ALL THE ENTIRE POINTS EXCEPT THE ONE YOU WANT TO USE. THIS MAKES IT EASIER TO AVOID CONFUSION |
| THIS RUNS WITH NODEJS                                                                                                |
+----------------------------------------------------------------------------------------------------------------------+
*/

/*
<----------------------------- POINT 1 ----------------------------->
+----------------------------------------------------------------------------------------------------+
| Create a promise that allows saving a vehicle in an array of vehicles (plate, model, make, color). |
| If the plate is empty or duplicated, the promise is rejected.                                      |
+----------------------------------------------------------------------------------------------------+
*/
const carsArr = [
    { licensePlate: '1234', model: '2023', brand: 'McLaren', color: 'Black' },
    { licensePlate: '2341', model: '2023', brand: 'Bugatti', color: 'Brown' },
    { licensePlate: '3412', model: '2023', brand: 'Lamborghini', color: 'Blue' }
  ];

function saveVehicle (vehicle, carsArr){
    return new Promise((resolve, reject) => {
      let isDuplicate = false;
      // If the license plate is empty, the promise is rejected.
      for (let i=0; i<carsArr.length; i++){
        if (!vehicle.licensePlate){ 
            reject('The plate is empty');
            // If the license plate is duplicated, the promise is rejected.
          } else if(vehicle.licensePlate === carsArr[i].licensePlate){
            reject('The plate is duplicated');
          } else{
            // Add the vehicle to the vehicles array (carsArr).
            carsArr.push(vehicle);
            resolve('Vehicle saved successfully');
          }
      }
    });
  };
saveVehicle({licensePlate: '1010', model: 'LaFerrari', brand:'Ferrari', color:'Red'}, carsArr);
  console.log(carsArr);



/*
<----------------------------- POINT 2 ----------------------------->
+---------------------------------------------------------------------------------------------------------------+
| Create an async function that receives an array of vehicles and returns the sum of vehicles grouped by brand. |
| If the information is not an array containing the information of a vehicle, throw an error.                   |
+---------------------------------------------------------------------------------------------------------------+
*/
const vehiclesArr = [
  { licensePlate: '1234', model: '2020', brand: 'Ferrari', color: 'Black' },
  { licensePlate: '2341', model: '2019', brand: 'Ferrari', color: 'Black' },
  { licensePlate: '3412', model: '2025', brand: 'McLaren', color: 'Green' }
];

async function addVehiclesByBrand(vehiclesArr){
  // Check if the info is an array.
  if (!Array.isArray(vehiclesArr)){
    throw new Error("It's not an array");
  } else{
      // Check if it contains the necessary information of a vehicle.
      for (let i=0; i<vehiclesArr.length; i++){
          if (!vehiclesArr[i].licensePlate || !vehiclesArr[i].model || !vehiclesArr[i].brand || !vehiclesArr[i].color){
              throw new Error("There's not enough information");
          }
      }
  }

  // Sum of vehicles grouped by brand
  const sum = {};

  vehiclesArr.forEach(v => {
    if (!sum[v.brand]){
      sum[v.brand] = 1;
    } else {
      sum[v.brand]++;
    }
  });

  return sum;
};
console.log(addVehiclesByBrand(vehiclesArr));



/*
<----------------------------- POINT 3 ----------------------------->
+---------------------------------------------------------------------------------------------------------------+
| Create a server with express that controls vehicles (licensePlate, model, brand, color) in a vector.          |
| Leave 3 vehicles defined and create the GET (/vehicles) and the GET (/vehicles/licensepPlate/:licensepPlate). |
| At this point, you will need to use your browser to access the paths of the code and check its operation.     |
+---------------------------------------------------------------------------------------------------------------+
*/
const express = require('express');
const app = express();

// Vector de vehículos con 3 definidos
const vehicles = [
  { licensePlate: '1234', model: '2023', brand: 'McLaren', color: 'Black' },
  { licensePlate: '2341', model: '2023', brand: 'Bugatti', color: 'Brown' },
  { licensePlate: '3412', model: '2023', brand: 'Lamborghini', color: 'Blue' }
];

// GET (/vehicles)
app.get('/vehicles', (req, res) => {
  res.send(vehicles);
});

// GET (/vehicles/licensePlate/:licensePlate)
app.get('/vehicles/licensePlate/:licensePlate', (req, res) => {
  if (vehicles.length === 0){
      res.send('There are no vehicles stored in the array');
  } else{
      for(let i=0; i<vehicles.length; i++){
          if (vehicles[i].licensePlate === req.params.licensePlate){
              res.send(vehicles[i]);
          }
      }
      res.send('There are no vehicles with the license plate ' + req.params.licensePlate);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The server is running and listening on port ${PORT}...`);
});