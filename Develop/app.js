const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let roster = [];

getEmployeeInfo();

// Write code to use inquirer to gather information about the development team members,
function getEmployeeInfo() {
  inquirer
    .prompt([
      /* Pass your questions in here */

      {
        type: "input",
        message: "Enter employee name:",
        name: "name",
      },
      {
        type: "confirm",
        name: "isManager",
        message: "Is this employee the manager?",
      },
      {
        type: "list",
        message: "Choose role:",
        name: "role",
        choices: ["Engineer", "Intern"],
        when: (answers) => {
          return answers.isManager === true;
        },
      },
      {
        type: "input",
        message: "Enter employee ID?",
        name: "id",
      },
      {
        type: "input",
        message: "Enter employee email:",
        name: "email",
      },
      {
        type: "input",
        message: "Enter office Number:",
        name: "officeNumber",
        when: (answers) => {
          return answers.role === "Manager";
        },
      },
      {
        type: "input",
        message: "Enter engineer's GitHub username:",
        name: "github",
        when: (answers) => {
          return answers.role === "Engineer";
        },
      },
      {
        type: "input",
        message: "Enter intern's school",
        name: "school",
        when: (answers) => {
          return answers.role === "Intern";
        },
      },
      {
        type: "confirm",
        name: "addEmployee",
        message: "Would you like to add another employee?",
      },
    ])
    .then((answers) => {
      // Add employee to roster
      const employee = CreateClassObjects(answers);
      roster.push(employee);
      // if yes to addEmlpoyee loop through prompt again
      if (answers.addEmployee) getEmployeeInfo();
      else {
      } // END HERE HOW TO VERIFY MANAGER?
    });
}

// and to create objects for each team member (using the correct classes as blueprints!)
function CreateClassObjects(obj) {
  let employee;
  if (obj.isManager === true) {
    employee = new Manager(obj.name, obj.id, obj.email, obj.officeNumber);
  } else if (obj.role === "Engineer") {
    employee = new Engineer(obj.name, obj.id, obj.email, obj.github);
  } else if (obj.role === "Intern") {
    employee = new Intern(obj.name, obj.id, obj.email, obj.school);
  }
  return employee;
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
