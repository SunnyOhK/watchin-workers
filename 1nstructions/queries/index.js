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

// // const { default: inquirer } = require("inquirer");
// const inquirer = require('inquirer');
// const db = require('company_db');
// require('console.table');


// //* CREATE VARIABLES BASED ON WHAT RETURNS FROM SQL DB B/C NEW VALUES WILL BE ADDED FREQUENTLY
// // EMPLOYEES:
// const employees = db.query('SELECT * FROM employee');
// const employeeChoices = employees.map(employee => ({ first_name: employee.first_name, last_name: employee.last_name }));

// // MANAGERS:
// const mgrChoices = employees
//   .filter(employee => employee.manager_id === NULL)
//   .map(employee => ({ first_name: employee.first_name, last_name: employee.last_name }));

// // DEPARTMENTS:
// const departments = db.query('SELECT * FROM department');
// const deptChoices = departments.map(department => department.dept_name);

// // ROLES:
// const roles = db.query('SELECT * FROM role');
// const roleChoices = roles.map(role => role.title);