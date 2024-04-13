import inquirer from "inquirer";
import { connectDB, disconnectDB } from "../db/connectDB.js";
import Todos from "../schema/TodoSchema.js";
import ora from "ora";
import chalk from "chalk";

// Initial input request from CLI user
async function input() {
    const answers = await inquirer.prompt([
        { name: 'name', message: 'Enter the name of the task', type: 'input' },
        { name: 'detail', message: 'Enter the details of the task', type: 'input' },
    ])

    return answers;
};

// For testing purposes
// const output = await askQuestions();
// console.log(output);

// ask user if they want to add more tasks and loop until they don't want to add any more tasks
const askQuestions = async() => {
    // create array for tasks
    const todoArray = [];
    let loop = false;

    do {
        const userRes = await input();
        todoArray.push(userRes);
        const confirmQ = await inquirer.prompt([{ name: 'confirm', message: 'Do you want to add more tasks?', type: 'confirm' }]);
        if(confirmQ.confirm) {
            loop = true;
        } else {
            loop = false;
        }
    } while(loop)

    return todoArray;
}

// For testing purposes
// const output = await askQuestions();
// console.log(output);

// Bring everything together and finish task creation process
export default async function addTask() {
    try {
        // calling askQuestions() to get array of todo's
        const userResponse = await askQuestions();

        // connecting to MongoDB
        await connectDB();

        // Display a spinner with the following text
        let spinner = ora('Creating the todos...').start();

        // looping over every todo in the userResponse
        // and saving each todo to the database
        for(let i=0; i < userResponse.length; i++) {
            const response = userResponse[i];
            await Todos.create(response);
        }

        // Stopping the spinner and displaying the todo's
        spinner.stop();
        console.log(
            chalk.greenBright('Created the todos!')
        )

        // disconnecting the database
        await disconnectDB();
    } catch (error) {
        // Error handling
        console.log('Something went wrong, Error: ', error);
        process.exit(1);
    }
};
