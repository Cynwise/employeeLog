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
                    console.log('blah');
                    mainMenu();
                    break;

                case 'Add department':
                    console.log('blah');
                    mainMenu();
                    break;

                case 'Add role':
                    console.log('blah');
                    mainMenu();
                    break;

                case 'View employees':
                    console.log('blah');
                    mainMenu();
                    break;

                case 'View departments':
                    console.log('blah');
                    mainMenu();
                    break;

                case 'View roles':
                    console.log('blah');
                    mainMenu();
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

