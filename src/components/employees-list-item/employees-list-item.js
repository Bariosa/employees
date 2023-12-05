import "./employees-list-item.css";

const EmployeesListItem = (props) => {
  const {
    name,
    salary,
    onDelete,
    onToggleProp,
    increase,
    isStar,
    id,
    salaryChange,
  } = props;

  let classNames = "list-group-item d-flex justify-content-between";
  if (increase) {
    classNames += " increase";
  }
  if (isStar) {
    classNames += " like";
  }

  const salaryHandler = (e) => {
    const newSalary = Number.parseInt(e.target.value);
    salaryChange(id, newSalary);
  };

  return (
    <li className={classNames}>
      <span
        className="list-group-item-label"
        onClick={onToggleProp}
        data-toggle="isStar"
      >
        {name}
      </span>
      <input
        type="text"
        className="list-group-item-input"
        defaultValue={salary + "$"}
        onChange={salaryHandler}
      />
      <div className="d-flex justify-content-center align-items-center">
        <button
          type="button"
          className="btn-cookie btn-sm "
          onClick={onToggleProp}
          data-toggle="increase"
        >
          <i className="fas fa-cookie"></i>
        </button>

        <button type="button" className="btn-trash btn-sm " onClick={onDelete}>
          <i className="fas fa-trash"></i>
        </button>
        <i className="fas fa-star"></i>
      </div>
    </li>
  );
};

export default EmployeesListItem;
