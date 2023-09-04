"use strict";
function swapKeysAndValues(obj) {
    const swappedObj = {};
    Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'string') {
            swappedObj[value] = key;
        }
    });
    return swappedObj;
}
const obj = {
    name: 'John',
    age: 25,
    location: 'New York'
};
const swappedObj = swapKeysAndValues(obj);
console.log(swappedObj);
