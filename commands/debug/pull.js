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
const {Command} = require("discord.js-commando");

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: "pull",
			group: "debug",
			memberName: "pull",
			description: "Pulls in the latest commit on the current branch. Only Owner can run this.",
			examples: ["pull"]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	async run(msg) {
		console.log("Ran .pull");
		if (msg.channel.type === "dm") {
			await msg.say("Starting pull...");
			//Note v implement this nicer v
			await require("simple-git")().pull("origin","master");
			// ^ Should be a better way ^
			return msg.say("Pull complete");
		} else {
			return msg.say("You must send this in a DM. If you don't have a DM with the bot yet, type the help command.");
		}
	}
};
