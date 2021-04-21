DROP DATABASE IF EXISTS employee_trackDB;

CREATE DATABASE employee_trackDB;

USE employee_trackDB;

CREATE TABLE department (
id INT AUTO_INCREMENT, 
name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
id INT AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,4),
department_id INT NULL NOT NULL,
PRIMARY KEY (id),
CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
id INT AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id  INT, 
PRIMARY KEY (id),
CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL,
CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE 
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
