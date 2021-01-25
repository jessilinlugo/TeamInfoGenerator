class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    //displays the name
    getName() {
        return this.name
    }
    //displays employee ID
    getId() {
        return this.id
    }
    //displays email
    getEmail() {
        return this.email
    }
    //this allows you to continue adding to your team
    getRole() {
        return "Employee"
    }
}

//this exports the entire module so it can be used elsewhere
module.exports = Employee