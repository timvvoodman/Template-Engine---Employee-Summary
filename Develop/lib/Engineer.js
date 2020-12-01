// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github; //GitHub username

    getGithub();
    getRole(); //Overridden to return 'Engineer'
  }
}

module.exports = Engineer;
