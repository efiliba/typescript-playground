interface Person {
  name: string;
  age?: number;
}

const newPerson = ({name, age}: Person) => {
  console.log(`${name}: ${age}`);
};

newPerson({name: 'Eli', age: 50});
newPerson({name: 'Leslie'});
