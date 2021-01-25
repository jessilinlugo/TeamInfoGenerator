//this imports the employee module 
const Employee = require("../lib/Employee");

//extends allows you to tack on new arguments to an existing function
class Intern extends Employee {
    constructor (name, id, email, school){
        //super grabs existing variables from the employee class
        super (name, id, email)
        //here we add the new variable
        this.school = school;
    }
    //this adds the team member's role
    getRole() {
        return "Intern"
    }
    //this adds their github account name
    getSchool() {
        return this.school
    }
}

//this exports the module to be used elsewhere in the program
module.exports = Intern