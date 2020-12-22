import React, { Component } from 'react';
import classes from 'App.module.css';

import './App.css';
import Person from '../compenents/Persons/Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Nigel', age: 47 },
      { id: 2, name: 'Mau', age: 29 },
      { id: 3, name: 'Stephanie', age: 26 },
    ],
    otherState: 'some other value',
    showPersons: true,
  };

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex],
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  };

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render() {
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangeHandler(event, person.id)}
              />
            );
          })}
        </div>
      );
      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join('')}>This is really working1</p>
        <button
          className={btnClass.join('')}
          onClick={this.togglePersonsHandler}
        >
          Toggle Persons
        </button>

        {persons}
      </div>
    );
  }
}

export default App;
