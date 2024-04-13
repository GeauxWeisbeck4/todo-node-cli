import inquirer from "inquirer";
import Todos from '../schema/TodoSchema.js'
import {connectDB, disconnectDB} from '../db/connectDB.js'
import ora from "ora";
import chalk from "chalk";

export async function getTaskCode() {
    try {
        // Prompt the user to enter the todo code
        const answers = await inquirer.prompt([
            { name: 'code', 'message': 'Enter the code of the todo: ', type: 'input' },
        ])

        // Trimming user's response so that the todo code does
        // not contain and whitespace
        answers.code = answers.code.trim();

        return answers;
    } catch (error) {
        console.log('Something went wrong... \n', error);
    }
}

export default async function deleteTask() {
    try {
        // Obtaining the todo code from user
        const userCode = await getTaskCode();

        // connect to MongoDB
        await connectDB();

        // Start the spinner
        const spinner = ora('Finding and deleting the todo...').start();

        // Deleting the task
        const response = await Todos.deleteOne({ code: userCode.code });

        // stopping the spinner
        spinner.stop();

        // Checking the delete operation
        if(response.deletedCount === 0) {
            console.log(chalk.redBright('Could not find any todo matching the provided name. Deletion failed.'));
        } else {
            console.log(chalk.greenBright('Deleted task successfully!'));
        }

        // Disconnect from MongoDB
        await disconnectDB();
    } catch (error) {
        // Error handling
        console.log('Something went wrong, Error: ', error);
        process.exit(1);
    }
}
