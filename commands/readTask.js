import { connectDB, disconnectDB } from '../db/connectDB.js';
import Todos from '../schema/TodoSchema.js';
import chalk from 'chalk';
import ora from 'ora';

export default async function readTask() {
    try {
        // connect to MongoDB
        await connectDB();

        // Start the spinner
        const spinner = ora('Fetching all the todos...').start();

        // fetching all the todos from MongoDB
        const todos = await Todos.find({});

        // stopping the spinner
        spinner.stop();

        // Check if todos exist or not
        if(todos.length === 0) {
            console.log(chalk.blueBright('You do not have any tasks yet!'));
        } else {
            todos.forEach(todo => {
                console.log(
                    chalk.cyanBright('Todo Code: ') + todo.code + '\n' +
                    chalk.blueBright('Name: ') + todo.name + '\n' +
                    chalk.yellowBright('Description: ') + todo.detail + '\n'
                )
            })
        }

        // disconnect from MongoDB
        await disconnectDB()
    } catch (error) {
        // Error Handling
        console.log('Something went wrong, Error: ', error);
        process.exit(1);
    }
}
// For testing purposes
// readTask();
