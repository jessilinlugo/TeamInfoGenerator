const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

//these questions allow a user to input their info
const employeeQuestions = [
    {
        type: "input",
        message: "What is the team members name?",
        name: "name",
    },
    {
        type: "input",
        message: "What is their ID number?",
        name: "id",
    },
    {
        type: "input",
        message: "What is their email?",
        name: "email",
    },
    {
        type: "list",
        message: "What is their title?",
        choices: ["Manager", "Engineer", "Intern"],
        name: "employmentType",
    }

]

//this function begins the program/allows you to continue adding members to your team & then completes and renders the HTML file once the team has been completed
function init() {
    inquirer
        .prompt(
            {
                type: "list",
                message: "Would you like to add another employee?",
                choices: ["Yes", "No"],
                name: "addEmployee",
            }
        )
        .then((answers) => {
            if (answers.addEmployee === "Yes") {
                chooseType();
            }
            else {
                writeFile()
            }
        })
        .catch(error => {
            if (error) {
                console.error(error)
            }
        })
}

//an asynchronous function is required to wait for the user to complete their team input, this function only deploys once the user selects "yes"
async function writeFile() {
    let renderEmployees = await render(employees)
    fs.writeFile(outputPath, renderEmployees, function (err) {
        if (err) console.log('error', err);
    })
    console.log("HTML file has been successfully created!")
}


//this function essentially creates a path to the separate js files in order to pull the info required based on the user input
function chooseType() {
    inquirer
        .prompt(employeeQuestions)
        .then((answers) => {
            if (answers.employmentType === "Manager") {
                addManager(answers);
            }
            else if (answers.employmentType === "Engineer") {
                addEngineer(answers);
            }
            else if (answers.employmentType === "Intern") {
                addIntern(answers);
            }
            else {
                console.log("error")
            }
        })
        .catch(error => {
            if (error) {
                console.error(error)
            }
        })
}

//because each employee type has one different additional question/answer, these functions allow that last question to be asked and inputted
function addManager(managerAnswers) {
    inquirer
        .prompt(
            {
                type: "input",
                message: "What is their office number?",
                name: "officeNumber",
            }
        )
        //within each function is an asynchronous function that waits for the final answer and pushes the established results into a console table (rather than a log) for easier review before the final HTML is created
        .then(async (answer) => {
            const { name, id, email } = managerAnswers
            let newManager = await new Manager(name, id, email, answer.officeNumber)
            employees.push(newManager)
            console.table(employees)
            init();
        })
        .catch(error => {
            if (error) {
                console.error(error)
            }
        })
}

function addEngineer(engineerAnswers) {
    inquirer
        .prompt(
            {
                type: "input",
                message: "What is their GitHub username?",
                name: "github",
            }
        )
        .then(async (answer) => {
            const { name, id, email } = engineerAnswers
            let newEngineer = await new Engineer(name, id, email, answer.github);
            employees.push(newEngineer)
            console.table(employees)
            init();
        })
        .catch(error => {
            if (error) {
                console.error(error)
            }
        })
}

function addIntern(internAnswers) {
    inquirer
        .prompt(
            {
                type: "input",
                message: "What school are they attending?",
                name: "school",
            }
        )
        .then(async (answer) => {
            const { name, id, email } = internAnswers
            let newIntern = await new Intern(name, id, email, answer.school);
            employees.push(newIntern)
            console.table(employees)
            init();
        })
        .catch(error => {
            if (error) {
                console.error(error)
            }
        })
}

init();





// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
