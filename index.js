const inquirer = require('inquirer');

const consoleTable = require("console.table");

consoleTable;

const mysql = require('mysql');

const connection = mysql.createConnection({

    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'password',

    database: 'employee_trackDB',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('node connected in mysql')
    runQuestions();
});

const runQuestions = () => {
    inquirer
        .prompt({
            name: 'management',
            type: 'rawlist',
            message: 'What can I do for you?',
            choices: [
                {
                    name: 'View all departments'
                },
                {
                    name: 'View all employees'
                },
                {
                    name: 'View all roles'
                },
                {
                    name: 'Add department'
                },
                {
                    name: 'Add employee'
                },
                {
                    name: 'Add role'
                },
                {
                    name: 'Update employee role'
                },
                {
                    name: 'Exit'
                }
            ],
        })
        .then((answer) => {
        console.log(answer)
            switch (answer.management) {

                case 'View all departments':
                   
                    viewDepartments();
                    break;

                case 'View all employees':
                    viewEmployees();
                    break;

                case 'View all roles':
                    viewRoles();
                    break;

                case 'Add department':
                    addDepartment();
                    break;

                case 'Add employee':
                    addEmployee();
                    break;

                case 'Add role':
                    addRole();
                    break;

                case 'Update employee role':
                    updateEmployee();
                    break;

                case 'Exit':
                    console.log('Thank you for using our Employee Tracker');
                    connection.end();
                    break;

            }
        });
};


// This function checks each department
function viewDepartments() {

    let query = 'SELECT DISTINCT name AS department FROM department ORDER BY name';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(res);
        runQuestions();
    });

}

// This function checks each employee
function viewEmployees() {

    let query = 'SELECT DISTINCT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS employee, role.title, role.salary FROM employee, role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        runQuestions();
    });
}

function viewRoles() {

    let query = 'SELECT DISTINCT role.title AS Role, role.salary AS Salary, department.name AS Department FROM department';
    query += ' INNER JOIN role ON department.id = role.department_id';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        runQuestions();
    });
}

function addDepartment() {
    inquirer
        .prompt({

            type: 'input',
            name: 'department',
            message: 'Would you like to add a department?'
        })
        .then((answer) => {
            let query = 'INSERT INTO department SET ?';
            connection.query(query, { name: answer.department },
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    runQuestions();
                });
        });
}

function addEmployee() {
    let query = 'SELECT DISTINCT title FROM role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        let arr = [];
        inquirer
            .prompt([
                {

                    type: 'input',
                    name: 'role',
                    choices: () => {

                        for (var i = 0; i < res.length; i++) {
                            arr.push(res[i].title);
                        }
                        return arr;
                    },
                    message: 'What is the employee role?',
                },
                {
                    name: "firstname",
                    type: "input",
                    message: "What is the employee first name?",
                },
                {
                    message: "lastname",
                    type: "input",
                    message: 'What is the employee last name?'
                },
                {
                    name: "manager",
                    type: "number",
                    message: "What is the employee manager's number?"
                }
            ])
            .then((answer) => {
                let query = 'INSERT INTO employee SET ?';
                connection.query(query,
                    {

                        first_name: answer.firstname,
                        last_name: answer.lastname,
                        role_id: arr.indexOf(answer.role)+1,
                        manager_id: answer.manager
                    });
                runQuestions();
            });
        });
};

function addRole() {
    let query = 'SELECT DISTINCT name FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        let arr = [];
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'department',
                    choices: () => {

                        for (var i = 0; i < res.length; i++) {
                            arr.push(res[i].name);
                        }
                        return arr;
                    },
                    message: 'What department would you like to add?'
                },
                {
                    name: 'salary',
                    type: 'number',
                    message: 'What salary would you like to add?'
                },
                {
                    name: 'role',
                    type: 'input',
                    message: 'What is the new role that you would like to add? '
                }
            ])
            .then((answer) => {
                let query = 'INSERT INTO role SET ?';
                connection.query(query, {

                    department_id: arr.indexOf(answer.department) + 1,
                    salary: answer.salary,
                    title: answer.role
                },
                    (err) => {
                        if (err) throw err;
                        runQuestions();
                    });
            });
    });
}

function updateEmployee() {

    let query = 'SELECT DISTINCT employee.id, CONCAT(first_name, " ", last_name) AS Employee,';
    query += 'role_id, manager_id AS Manager FROM employee JOIN role ON employee.role_id = role.id ORDER BY employee.id;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        inquirer
        .prompt ([
            {
                name: 'upId',
                type: 'input',
                message: 'Please enter the employee id to update'
            },
            {
                name: 'newId',
                type: 'input', 
                message: 'Please enter the updated id'
            }
        ])
        .then((answer) => {
            let query = 'UPDATE employee SET ? WHERE ?';
            connection.query(query, { 

                role_id: answer.newId,
                employee_id: answer.upId
            },
            (err, res) => {
                if(err) throw err;
                viewEmployees();
            })
        })

})
}