const url = "https://dummyjson.com/users";

function getUsers(url: string): Promise<User> {
  const data = fetch(url)
    .then((res:Response) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error: Error) => {
        console.error(error);
    });
    return data;
}

const a = getUsers(url);

console.log(a.then((data:User) => console.log(data)));

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
}
