const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const questions = [
    {"message": "Enter Employee name" , name:"name"},
    {"message": "Enter Employee role" , name:"role", type:"checkbox",
    choices: ["Manager","Engineer","Intern"]},
    {"message": "Enter ID" , name:"id"},
    {"message": "Enter email" , name:"email"}
];
const extraQuestion ={
    Manager: {
        "message": "What is your office number" , name:"extra"
    },
    Engineer: {"message": "What is your Github" , name:"extra"},
    Intern:{"message": "What school did you graduate or program from?" , name:"extra"}
}

const classes = {
    Manager,
    Intern,
    Engineer
}
const employees =[];
makeTeam()
function makeTeam(){

inquirer.prompt(questions)
.then(function(response){ 
    inquirer.prompt(extraQuestion[response.role])  
.then((extra)=>{
    const newEmp = new classes[response.role](response.name,response.id,response.email,extra)
employees.push(newEmp)
inquirer.prompt({"message":"Would you like to add more employees", name:"confirmation", type:"confirm"})
.then(function(confirm){  confirm.confirmation ? makeTeam() : writeFile(render(employees))})
})

})

}

function writeFile(html){
    fs.writeFile(outputPath, html, (err)=>{})

}

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
