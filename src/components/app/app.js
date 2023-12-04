import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "Maria G.",
          salary: 800,
          increase: false,

          id: 1,
        },
        { name: "Anna L.", salary: 3000, increase: true, id: 2 },
        {
          name: "Diana S.",
          salary: 1500,
          increase: false,

          id: 3,
        },
      ],
    };
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  addItem = (newWorker) => {
    this.setState((oldState) => {
      return {
        data: [
          ...oldState.data,
          {
            name: newWorker.name,
            salary: newWorker.salary,
            isStar: false,
            increase: false,
            id: Date.now(),
          },
        ],
      };
    });
  };

  render() {
    const employees = this.state.data.length;
    const increased = this.state.data.filter((item) => item.increase).length;

    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased} />

        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>

        <EmployeesList data={this.state.data} onDelete={this.deleteItem} />
        <EmployeesAddForm newEmployee={this.addItem} />
      </div>
    );
  }
}

export default App;
