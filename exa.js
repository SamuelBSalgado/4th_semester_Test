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

                                          +---------------+
                                          | MODIFICATIONS |
+------------------------+                +---------------+
| 04/25/2023 (1) POINT 1 |
+------------------------+-------------------------------------------------------------------------------------+
| In the previous version there was a bug where the "for" kept traversing the array even though it had already |
| found a duplicate. This caused it to print the new vehicle 3 times. The solution was to stop the "for"       |
| as soon as it found the first duplicate, assigning a boolean value to a variable that is then used to        |
| determine if there is a duplicate or not.                                                                    |
+--------------------------------------------------------------------------------------------------------------+
+------------------------+
| 04/25/2023 (2) POINT 1 |
+------------------------+--------------------------------------------------------------------------------------+
| In the previous version, I didn't include ".then()" nor ".catch();", so the function,                        |
| when generating a promise, would first print to the console and then resolve the promise. I have now included |
| ".then()" and ".catch();", so now it still works, but in the most correct way possible.                       |
| Also, I changed the normal function to an arrow function.                                                     |
+---------------------------------------------------------------------------------------------------------------+

+------------------------+
| 04/25/2023 (3) POINT 2 |
+------------------------+--------------------------------------------------------------------------------------+
| In the previous version, I did not use ".then()" or ".catch()", which is bad because I am working with an     |
| asynchronous function, which means that the "result" of the asynchronous was first printed to the console     |
| before that the function was even solved. I fixed it by adding these 2 methods. Now it works as correctly as  |
| possible.                                                                                                     |
| Also, I changed the normal function to an arrow function.                                                     |
+---------------------------------------------------------------------------------------------------------------+
*/
const carsArr = [
  {licensePlate: '1234', model: '2023', brand: 'McLaren', color: 'Black'},
  {licensePlate: '2341', model: '2023', brand: 'Bugatti', color: 'Brown'},
  {licensePlate: '3412', model: '2023', brand: 'Lamborghini', color: 'Blue'}
];

const saveVehicle = (vehicle, carsArr) => {
  return new Promise((resolve, reject) => {
    let isDuplicate = false;
    // If the license plate is empty, the promise is rejected.
    for (let i=0; i<carsArr.length; i++){
      if (!vehicle.licensePlate){ 
        reject('The plate is empty');
        // Check if there's already a license plate with the values of the new one you want to enter.
      } else if(vehicle.licensePlate === carsArr[i].licensePlate){
        isDuplicate = true;
        break;
      }
    } // If it found a duplicate, it rejects the promise.
    if (isDuplicate){
      reject('The plate is duplicated');
    } else{ // If no duplicates were found, resolve the promise.
      carsArr.push(vehicle);
      resolve('Vehicle saved successfully');
    }
  });
};
saveVehicle({licensePlate: '1010', model: 'LaFerrari', brand:'Ferrari', color:'Red'}, carsArr)
.then(() => {
  console.log(carsArr);
})
.catch((error) => {
  console.log(error);
});



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

const addVehiclesByBrand = async (vehiclesArr) => {
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

addVehiclesByBrand(vehiclesArr)
.then((result) => {
  console.log(result);
})
.catch((error) => {
  console.log(error);
});



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
    res.send('There are no vehicles with the license plate: ' + req.params.licensePlate);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The server is running and listening on port ${PORT}...`);
});