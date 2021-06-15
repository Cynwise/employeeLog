const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({

    host: 'localhost',
    port: 3306,
    user: 'root',
    password:'maple077',
    database: 'employeeLogdb',
});

connection.connect((err) => {

    if(err) throw err;
    console.log(`connected`);
    mainMenu();
});

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
                    console.log('blah');
                    mainMenu();
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
                    console.log('blah');
                    mainMenu();
                    break;

                case 'Update employee role':
                    console.log('Goodbye');
                    break;
            }
        });
}

const viewEmployees = () => {

    connection.query("SELECT employeeLog.id, employeeLog.first_name, employeeLog.last_name, roleLog.title, roleLog.salary, departmentLog.name FROM employeeLog INNER JOIN roleLog ON employeeLog.role_id = roleLog.id INNER JOIN departmentLog ON roleLog.department_id = departmentLog.id", (err, res) => {
            if (err) throw (err)
            console.table(res)
            mainMenu();
        })
};

const viewDepartments = () => {

    connection.query("SELECT * FROM departmentLog", (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu(); 
     })    
};

const viewRoles = () => {

    connection.query('SELECT * FROM departmentLog', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu(); 
    })
}

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

