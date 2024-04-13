#!/usr/bin/env node

// Importing the required functions for each command
import addTask from './commands/addTask.js';
import deleteTask from './commands/deleteTask.js';
import readTask from './commands/readTask.js';
import updateTask from './commands/updateTask.js';

// Importing the Command class from Commander.js library
import { Command } from 'commander';

// Creating an instance of the Command Class
const program = new Command();

// setting the name and description of the CLI tool
program
  .name('todo')
  .description('Your terminal task manager!')
  .version('1.0.0')

// Defining a program called add
program
  .command('add')
  .description('Create a new todo.')
  .action(addTask)

// Define program called 'read'
program
  .command('read')
  .description('Reads all the todos.')
  .action(readTask)

// Define a program called 'update'
program
  .command('update')
  .description('Updates a todo.')
  .action(updateTask)

// Define a program called 'delete'
program
  .command('delete')
  .description('Deletes a todo.')
  .action(deleteTask)

// Parsing the command-line arguments
program.parse()
