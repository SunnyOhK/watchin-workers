INSERT INTO department (id, dept_name)
VALUES (1, "Sales"),
       (2, "Marketing"),
       (3, "Finance"),
       (4, "Human Resources"),
       (5, "IT/ Engineering");

INSERT INTO role (id, title, salary, dept_id)
VALUES (1, "Salesperson", 70000, 1),
       (2, "Sales Lead", 90000, 1),
       (3, "Public Relations Specialist", 55000, 2),
       (4, "Digital Strategist", 75000, 2),
       (5, "Payroll Clerk", 50000, 3),
       (6, "Financial Analyst", 90000, 3),
       (7, "Recruiter", 45000, 4),
       (8, "HR Director", 120000, 4),
       (9, "Solutions Architect", 100000, 5),
       (10, "IT Director", 140000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Abbey", "Rhodes", 1, NULL),
       (2, "Linda", "Brown", 2, 1),
       (3, "Lenny", "Martin", 3, NULL),
       (4, "Darius", "Martin", 4, 3),
       (5, "Jose", "Williams", 5, NULL),
       (6, "Sally", "Jones", 6, 5),
       (7, "Kevin", "Sanders", 7, NULL),
       (8, "Karen", "McMahon", 8, 7),
       (9, "Fiona", "Foster", 9, null),
       (10, "Winston", "Smith", 10, 9);
