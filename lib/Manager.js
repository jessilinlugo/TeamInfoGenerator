//this imports the employee module 
const Employee = require("../lib/Employee");

//extends allows you to tack on new arguments to an existing function
class Manager extends Employee {
    constructor (name, id, email, officeNumber){
        //super grabs existing variables from the employee class
        super (name, id, email)
        //here we add the new variable
        this.officeNumber = officeNumber;
    }
    //this adds the team member's role
    getRole() {
        return "Manager"
    }
    //this adds their github account name
    getOfficeNumber() {
        return this.officeNumber
    }
}

//this exports the module to be used elsewhere in the program
module.exports = Manager