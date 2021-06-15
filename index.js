const mysql = require('mysql');
const inquirer = require('inquirer');


//server connection
const connection = mysql.createConnection({

    host: 'localhost',
    port: 3306,
    user: 'root',
    password:'password here',
    database: 'employeeLogdb',
});

connection.connect((err) => {

    if(err) throw err;
    console.log(`connected`);
    mainMenu();
});

// main menu function using inquirer
const mainMenu = () => {
    inquirer
        .prompt({
            type: 'list',
            name: 'mainMenu',
            message: 'Please make a selection with ARROW KEYS and ENTER',
            choices: [
                'Add employee',
                'Add department',
                'Add role',
                'View employees',
                'View departments',
                'View roles',
                'Update employee role',
                'QUIT'
            ]
        }).then((answer) => {

            switch(answer.mainMenu) {

                case 'Add employee':
                    addEmployee();
                    break;

                case 'Add department':
                    addDepartment();
                    break;

                case 'Add role':
                    addRoles();
                    break;

                case 'View employees':
                    viewEmployees();
                    break;

                case 'View departments':
                    viewDepartments();
                    break;

                case 'View roles':
                    viewRoles();
                    break;

                case 'Update employee role':
                    updateEmployeeRole();
                    break;

                case 'QUIT':
                    console.log('Goodbye');
                    process.exit();
            }
        });
}

// displays all employees in the database
const viewEmployees = () => {

    connection.query(`SELECT employeeLog.id, CONCAT(employeeLog.first_name, ' ', employeeLog.last_name) AS person, roleLog.title, roleLog.salary FROM employeeLog INNER JOIN roleLog on roleLog.id = employeeLog.role_id;`, (err, res) => {
        if (err) throw (err)
        console.table(res)
        mainMenu();
    })
};

// displays all departments in the database
const viewDepartments = () => {

    connection.query("SELECT * FROM departmentLog", (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu(); 
     })    
};

// displays all the roles in the database
const viewRoles = () => {

    connection.query('SELECT * FROM roleLog', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu(); 
    })
}

// adds an employee to the database
const addEmployee = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'First name of the employee?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Last name of the employee?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Employee role id?'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Employee manager id?'
        },
    ])
    .then((answer) => {
        connection.query('INSERT into employeeLog SET ?', {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleId,
            manager_id: answer.managerId
        })
        console.log('Employee Added')
        viewEmployees()
    })
}

// add a new department to the database
const addDepartment = () => {

    inquirer
    .prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Name of new department?'
        }
    ]).then(function(input) {
        connection.query('INSERT INTO departmentLog SET ?', {name: input.department})
        viewDepartments();
    })
}

// adds a new roles to the database
const addRoles = () => {

    inquirer
    .prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Name of role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Salary?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Employee role id?'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Department id?'
        },
    ])
    .then((answer) => {
        connection.query('INSERT into roleLog SET ?', {
            title: answer.roleName,
            salary: answer.salary,
            department_id: answer.departmentId
        })
        viewRoles()
    }) 
}

// update an existing employees role
const updateEmployeeRole = () => {

    inquirer
    .prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'ID number of employee youd like to update:'
        },
        {
            type: 'input',
            name: 'employeeRole',
            message: 'New role id number?'
        }
    ]).then(function(answer) {
        connection.query('UPDATE employeeLog SET ?  WHERE ?',[{
            role_id: answer.employeeRole
        },
        {
            id: answer.employeeId
        }], function(err, data) {
            if (err) {
                console.log(err);
                return;
            }else
            viewEmployees();
        })
    })
}