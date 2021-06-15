USE employeeLogdb;

INSERT INTO departmentLog(name)
VALUES
('Smith'),
('Web Developer'),
('Customer Service'),
('Store'),
('Accounting');

INSERT INTO roleLog(title, salary, department_id)
VALUES
('Hammer 1', 55000, 1),
('Hammer 2', 45000, 1),
('Accountant', 45000, 5),
('Web Developer', 60000, 2),
('Store Clerk', 35000, 4),
('Social Meda Manager', 40000, 3),
('Customer Service', 35000, 3);

INSERT INTO employeeLog(first_name, last_name, role_id, manager_id)
VALUES
('Bob', 'Murphey', 1, 1),
('Ralph', 'Humphries',2, NULL),
('Kevin', 'Garcia', 3, 3),
('Janice', 'Chandler', 6, 2),
('Allen', 'Thompson', 1, 4),
('Brad', 'Hunter', 5, NULL),
('Carole', 'Barron', 5, NULL),
('Roy', 'Bennett', 7, NULL),
('Mildred', 'Williamson', 2, NULL),
('Blaze', 'Lindsey', 4, NULL);