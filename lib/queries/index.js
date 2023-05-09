// DEFINE HOW EACH QUESTION HANDLES THE EXCHANGE OF INFORMATION TO AND FROM company_db

function handleViewAllEmployees() {
  db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.dept_name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.dept_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id")
};

function handleAddEmployee() {
  
};

function handleUpdateEmployee();

function handleViewAllRoles();

function handleAddRole();

function handleViewAllDepartments();

function handleAddDepartment();