#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import {App} from './src/app';
const { Command } = require('commander');
const program = new Command();

clear();
console.log(chalk.red(figlet.textSync('loto-cli', { horizontalLayout: 'full' })));

program
    .version('0.0.1')
    .description('Play bananalotto grid without browser and ads')
    .option('-g, --game <game>', 'name of the game bananalotto or kingoloto')
    .option('-u, --user <user>', 'email of the credential')
    .option('-p, --password <password>', 'password of the credential')
    .option('--no-interaction', 'play add grid without interaction')
    .parse(process.argv)
;

const app = new App(program);
