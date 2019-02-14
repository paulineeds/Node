#!/usr/bin/env node

// console.log("Hello, Node.JS!");

// const validator = require("email-validator");
// const axios = require("axios");
// const argv = require("yargs").argv;

// if (validator.validate(argv._[0])){
//   const email = argv._[0];
//   const encodedEmail = encodeURIComponent(email);

//   const url = "https://haveibeenpwned.com/api/v2/breachedaccount/account"+encodedEmail;

// axios.get(url, {
//     "headers": {
//       "User-Agent": "Node CLI tool"
//     }
//   })
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// }

// const readline = require('readline');
// const rl = readline.createInterface({ input: process.stdin,
// output: process.stdout
// });
// rl.question('What is your name?', (name) => {
//     console.log(`Hello ${name}!`);
//     rl.close();
// });



// NPM EXTENSIONS
const validator = require("email-validator");
const axios = require("axios");
const argv = require("yargs").argv;
const chalk = require('chalk');
const readlineSync = require('readline-sync')

// WRITE INFO
const checkEmail = (e) => {
    {
        // console.log(e.data);
        // console.log(e);
        e.data.forEach(a => {
            console.log(chalk.magenta(`Your email has been hacked on:`));
            console.log(chalk.yellow.bold(a.Name));

            console.log('');

            console.log(chalk.magenta(`The breach happened on:`));
            console.log(chalk.yellow.bold(a.BreachDate));

            console.log('');

            console.log(chalk.magenta(`Here is how it happened:`));
            console.log(chalk.yellow(a.Description));
        })
    }
}

const writeError = (x) => {
    // console.log(x.response.status);
    if (x.response.status == 404) {
        console.log(chalk.cyan("Your email has not been hacked yet."));
    }
}

email=readlineSync.question("what's your e-mail adress ")
// Validate
if (validator.validate(email)) {
    console.log(chalk.cyan.bold.underline(email));
    console.log('');

    const encodedEmail = encodeURIComponent(email);

    const url = `https://haveibeenpwned.com/api/v2/breachedaccount/${encodedEmail}`;

    // GET DATA
    axios.get(url, {
            headers: {
                "User-Agent": "Learning to work with Node.js"
            }
        })
        .then(response => checkEmail(response))
        .catch(error => writeError(error))
} else {
    const notEmail = email;
    console.log(`${chalk.cyan.bold(notEmail)} ${chalk.red(`didn't pass as a correct mail-adress`)}`);
}