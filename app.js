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
const path = require("path");
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const logChannelConfig = config.logChannel;
const softbanPersistent = new EnmapLevel({name: "softbanned"});
const badWordPersistent = new EnmapLevel({name: "badWords"});
const rulesPersistent = new EnmapLevel({name: "rules"});

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

client.softbanned = new Enmap({provider: softbanPersistent});
client.lockedChannels = new Enmap();
client.badWords = new Enmap({provider: badWordPersistent});
client.rules = new Enmap({provider: rulesPersistent});

client.on("ready", () => {
	console.log("Logged in!");
	client.user.setGame("on 2.0");
});

client.on("guildMemberAdd", member => {
	let logChannel = client.channels.get(logChannelConfig);
	softbanCheck();

	async function softbanCheck() {
		if (client.softbanned.get(member.id) === true) {
			await member.send("You have been auto-banned from the freeShop Discord. The cause of this may be due to various reasons. Examples of these reasons may include:" +
				"\n- Dodging a warn by leaving the server." +
				"\n- Being a sockpuppet of a banned member." +
				"\n- Any other reason." +
				"\nIf you desire this ban lifted, please contact the staff of the Discord.");
			await member.ban("Member was softbanned earlier.");
			return logChannel.send("🔨 " + member.toString() + " softban enacted.");
		}
	}
});

client.login(config.token);
