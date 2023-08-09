const a = 1;

let revenue: number = 1000;
let bonus: number = 500;

let res: number = revenue + bonus;
console.log(res);

let info:{
    officeId: number,
    isOpened: boolean,
    contacts:  {
        phone: string,
        email: string,
        address:  {
            city: string,
        }
    }
} = {
	"officeId": 45,
	"isOpened": false,
	"contacts": {
		"phone": "+79100000000",
		"email": "my@email.ru",
		"address": {
			"city": "Москва"
		}
	}
}

console.log(info);

