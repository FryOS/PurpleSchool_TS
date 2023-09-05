"use strict";
const url = "https://dummyjson.com/users";
function getUsers(url) {
    const data = fetch(url)
        .then((res) => res.json())
        .then((data) => {
        return data;
    })
        .catch((error) => {
        console.error(error);
    });
    return data;
}
const a = getUsers(url);
console.log(a.then((data) => console.log(data)));
