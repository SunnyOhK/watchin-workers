USE company_db;
-- If the user chooses to update employee role, the role_id in employee table will change
-- https://pencilprogrammer.com/foreign-key-in-mysql/

-- ! How can I show the department name in the show all roles if the dept_id is listed in the roles table? ... same with employee variables
--! var role.dept_id('value') = department.id(dept_name)
-- WHAT IS A MANAGER?
SELECT employee.id, employee.first_name, employee.last_name AS manager_name
FROM employee
LEFT JOIN employee AS manager ON employee.manager_id = manager.id AND manager.manager_id IS NULL;

-- VIEW ALL DEPARTMENTS (id, dept_name)
SELECT * FROM department
ORDER BY dept_name;

-- VIEW ALL ROLES (id, title, department, salary)
SELECT 
  role.id AS id, 
  role.title AS title, 
  department.dept_name AS department, 
  role.salary AS salary
FROM role
LEFT JOIN department ON role.dept_id = department.id;
ORDER BY role.id;


-- VIEW ALL EMPLOYEES (id, first name, last name, title, department, salary, manager)
SELECT 
  employee.id AS id, 
  employee.first_name AS firstName, 
  employee.last_name AS lastName, 
  role.title AS title, 
  department.dept_name AS department, 
  role.salary AS salary, 
  CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.dept_id = department.id
LEFT JOIN employee AS manager ON employee.manager_id = manager.id AND manager.manager_id IS NULL
ORDER BY id;

-- UPDATE THE ROLE FOR AN EMPLOYEE
UPDATE employee
SET role_id = {new_role_id}
WHERE id = {employee_id};

ALTER TABLE employee
ADD CONSTRAINT fk_employee_role
FOREIGN KEY (role_id)
REFERENCES role(id);

-- IDENTIFY MANAGERS
SELECT first_name, last_name 
FROM employees
WHERE manager_id === NULL;

