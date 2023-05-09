// VIEW ALL EMPLOYEES
function viewAllEmployees() {
  const query = `SELECT * FROM employee`; 
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table('Viewing All Current Employees', res);
    prompt();
  });
}


// VIEW ALL ROLES
function viewAllRoles() {
  const query = `SELECT * FROM role`;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table('Viewing All Company Roles', res);
    prompt();
  });
}


// VIEW ALL DEPARTMENTS
function viewAllDepartments() {
  const query = `SELECT * FROM department`;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table('Viewing All Company Departments', res);
    prompt();
  });
}

module.exports = viewAll;