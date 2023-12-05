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
          isStar: true,
          id: 1,
        },
        { name: "Anna L.", salary: 3000, increase: true, isStar: false, id: 2 },
        {
          name: "Diana S.",
          salary: 1500,
          increase: false,
          isStar: false,
          id: 3,
        },
      ],

      term: "",
      filter: "all",
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

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  };

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };

  onUpdateSearch = (term) => {
    this.setState({ term });
  };

  filterPost = (items, filter) => {
    switch (filter) {
      case "rise":
        return items.filter((item) => item.isStar);
      case "moreThen1000":
        return items.filter((item) => item.salary > 1000);
      default:
        return items;
    }
  };

  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  salaryChange = (id, newSalary) => {
    // Делаем проверку что newSalary не меньше нуля
    if (newSalary < 0) return;

    // Подготавливаем новый массив data
    const newData = this.state.data.map((employee) => {
      if (employee.id === id) employee.salary = newSalary;
      return employee;
    });

    // Применяем новый массив data для нашего "глобального" стейта
    this.setState(() => {
      return { ...this.state, data: newData };
    });
  };

  render() {
    const { data, term, filter } = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter((item) => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased} />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>

        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
          salaryChange={this.salaryChange}
        />
        <EmployeesAddForm newEmployee={this.addItem} />
      </div>
    );
  }
}

export default App;
