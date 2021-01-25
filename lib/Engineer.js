//this imports the employee module 
const Employee = require("../lib/Employee");

//extends allows you to tack on new arguments to an existing function
class Engineer extends Employee {
    constructor (name, id, email, github){
        //super grabs existing variables from the employee class
        super (name, id, email)
        //here we add the new variable
        this.github = github;
    }
    //this adds the team member's role
    getRole() {
        return "Engineer"
    }
    //this adds their github account name
    getGithub() {
        return this.github
    }
}

//this exports the module to be used elsewhere in the program
module.exports = Engineer