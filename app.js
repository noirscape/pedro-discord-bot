const { CommandoClient } = require('discord.js-commando');
const config = require('./config.json');
const path = require('path');

const client = new CommandoClient({
    commandPrefix: '.',
    unknownCommandResponse: false,
    owner: '126747960972279808',
    disableEveryone: true
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['debug', 'Debug commands'],
        ['rules', 'Rules list'],
        ['moderation', 'Mod Tools']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log('Logged in!');
    client.user.setGame('still a WIP');
});

client.login(config.token);
