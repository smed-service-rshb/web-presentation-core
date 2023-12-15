#!/usr/bin/env node

const {resolve} = require('path');
const execute = require('dockr');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let push = () => {
    execute({
        registry: 'docker.dos.softlab.ru',
        imageName: dockerOptions.imageName,
        verbose: true
    }).then(tag => {
        console.log('Образ %s успешно опубликован', tag);
        rl.close();
    }).catch(error => {
        console.error(error);
        process.exit(1);
    });
}

let dockerOptions = require(resolve(process.cwd(), "package.json")).dockerOptions;
let argv = require('yargs').argv;
if (argv.type === 'auto') {
    push()
}
rl.question('Вы действительно хотите опубликовать образ ' + dockerOptions.imageName + ' в Docker Registry? y/n ', (answer) => {
    if (answer.match(/^y(es)?$/i)) {
        push()
    } else {
        console.log('Отказ от выполнения команды, введено значение: ' + answer);
        process.exit(0);
    }
});