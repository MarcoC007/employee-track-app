use employee_trackDB;

INSERT INTO department (name)
VALUES
('Production'),
('R&D'),
('Marketing'),
('Finance');

INSERT INTO role (title, salary, department_id)
VALUES
('Producer Lead', 180000, 1),
('Production Designer', 125000, 1),
('R&D Engineer Lead', 150000, 2),
('R&D Engineer', 160000, 2),
('Marketing manager', 100000, 3),
('Marketing specialist', 85000, 3),
('Financial Director', 110000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Joe', 'McMillan', 1, NULL),
('Raj', 'Khan', 5, NULL),
('Richard', 'Nakamura', 1, NULL),
('Michael', 'Larsson', 2, NULL ),
('Steven', 'Etxeberria', 5 ,NULL),
('Alex', 'Alves', 10, NULL ),
('Abdul', 'Rami', 1, NULL);

UPDATE employee SET manager_id = 2 WHERE id = 1;
UPDATE employee SET manager_id = NULL WHERE id = 2;
UPDATE employee SET manager_id = 1 WHERE id = 3;
UPDATE employee SET manager_id = NULL WHERE id = 4;
UPDATE employee SET manager_id = 5 WHERE id = 5;
UPDATE employee SET manager_id = NULL WHERE id = 6;
UPDATE employee SET manager_id = 1 WHERE id = 7;




