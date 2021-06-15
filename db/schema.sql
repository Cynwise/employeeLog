DROP DATABASE IF EXISTS employeeLogdb;
CREATE DATABASE employeeLogdb;

USE employeeLogdb;

CREATE TABLE departmentLog (
    id INT NOT NULL, 
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE roleLog (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE employeeLog (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);