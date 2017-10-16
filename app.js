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
const {CommandoClient} = require("discord.js-commando");
const config = require("./config.json");
const forbiddenWords = require("./forbiddenWords.json");

const path = require("path");

const client = new CommandoClient({
	commandPrefix: config.prefix,
	unknownCommandResponse: false,
	owner: "126747960972279808",
	disableEveryone: true
});

client.registry
	.registerDefaultTypes()
	.registerGroups([
		["debug", "Debug commands"],
		["misc", "Miscellaneous"],
		["rules", "Rules list"],
		["moderation", "Mod Tools"]
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, "commands"));

client.on("ready", () => {
	console.log("Logged in!");
	client.user.setGame("on 1.4-HEAD");
});

client.on("message", message => {
	//Wordfilter code
	let naughtyList = forbiddenWords.badWords;
	for (var i = 0; i < naughtyList.length; i++) {
		if(message.content.includes(naughtyList[i] && !(message.author.bot))){
			message.delete();
			//TODO send a DM to the naughty member
			break;
		}
	}
});

client.login(config.token);
