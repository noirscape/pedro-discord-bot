/*
pedro-discordjs-bot (c) 2017 Valentijn "Ev1l0rd"
A moderation bot for the freeShop server
Unless explicitly acquired and licensed from Licensor under another
license, the contents of this file are subject to the Reciprocal Public
License ("RPL") Version 1.5, or subsequent versions as allowed by the RPL,
	and You may not copy or use this file in either source code or executable
form, except in compliance with the terms and conditions of the RPL.

	All software distributed under the RPL is provided strictly on an "AS
IS" basis, WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, AND
LICENSOR HEREBY DISCLAIMS ALL SUCH WARRANTIES, INCLUDING WITHOUT
LIMITATION, ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE, QUIET ENJOYMENT, OR NON-INFRINGEMENT. See the RPL for specific
	language governing rights and limitations under the RPL.
*/
// Update the bot !WIP!
const { Command } = require('discord.js-commando');

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pull',
            group: 'debug',
            memberName: 'pull',
            description: 'Pulls in the latest commit on the current branch. Only Owner can run this.',
            examples: ['pull']
        })
    }

    hasPermission(message) {
        if (!messageSendByOwner(message)) {
            if (isInDm(message)) {
                return true
            } else {
                return "You must send this in a DM. If you don't have a DM with the bot yet, type the help command."
            }
        } else {
            return "You are not the Bot Owner."
        }
    }

    //Returns true if command is send in a DM
    isInDm(message) {
        if (message.channel.type === 'dm') return true

    }

    //Returns true if command is executed by the owner
    messageSendByOwner(message) {
        if (this.client.isOwner(msg.author)) return true;
    }
}
