const person_0 = {
    name: 'Reinhard Heydrich',
    greet: function() {console.log('Heil',this.name);}
};

person_0.greet();

const person_1 = {
    name: 'Heinrich Himmler',
    greet: () => console.log('Heil',this.name)
};

person_1.greet();

const person_2 = {
    name: 'Albert Speer',
    greet() {console.log('Heil',this.name);}
};

person_2.greet();

const event_0 = {
    name: 'Winter solstice party',
    guests: ['Martin Bormann', 'Hermann Goering', 'Joseph Goebbels'],
    printGuests() {
        console.log('Guests invited to the',this.name);

        this.guests.forEach(function(guest) {console.log(guest,'is attending',this.name);}); // undefined
    }
};

event_0.printGuests();

const event_1 = {
    name: 'Beer Hall Putsch party',
    guests: ['Julius Schreck', 'Hans Frank', 'Philipp Bouhler'],
    printGuests() {
        console.log('Guests invited to the',this.name);

        const event = this; // solution #1

        this.guests.forEach(function(guest) {console.log(guest,'is attending the',event.name);});
    }
};

event_1.printGuests();

const event_2 = {
    name: 'Adolf Hitler\'s 50th birthday party',
    guests: ['Albert Forster', 'Dietrich Eckart', 'Walther Hewel'],
    printGuests() {
        console.log('Guests invited to',this.name);

        this.guests.forEach(guest => console.log(guest,'is attending',this.name)); // solution #2 (using arrow function)
    }
};

event_2.printGuests();