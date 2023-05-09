USE company_db;
-- If the user chooses to update employee role, the role_id in employee table will change
-- https://pencilprogrammer.com/foreign-key-in-mysql/

UPDATE employee
SET role_id = {new_role_id}
WHERE id = {employee_id};

ALTER TABLE employee
ADD CONSTRAINT fk_employee_role
FOREIGN KEY (role_id)
REFERENCES role(id);

-- IDENTIFY MANAGERS
SELECT first_name, last_name 
FROM customers
WHERE manager_id === NULL;

