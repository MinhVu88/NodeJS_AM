/*
    JSON.stringify(object) vs. object.toJSON()

    -> An object may provide a method called toJSON for to-JSON conversion. 
    
    -> JSON.stringify automatically calls it if available

    -> In a nutshell, if an object has toJSON, then it is called by JSON.stringify
*/
const person_0 = { name: "Dan Carey" };

console.log("person_0: ", JSON.stringify(person_0));

person_0.toJSON = function () {
  console.log("person_0: ", this);

  return this;
};

console.log("person_0: ", JSON.stringify(person_0));

const person_1 = { name: "Jerry Cantrell" };

console.log("person_1: ", JSON.stringify(person_1));

person_1.toJSON = function () {
  console.log("person_1: ", this);

  return {};
};

console.log("person_1: ", JSON.stringify(person_1));
