/*
 * pedro-discordjs-bot - A dedicated bot for the freeShop discord.
 * Copyright (C) 2017 Valentijn "ev1l0rd"
 *
 * This file is part of pedro-discordjs-bot.
 *
 * pedro-discordjs-bot is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * pedro-discordjs-bot is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with pedro-discordjs-bot.  If not, see <http://www.gnu.org/licenses/>.
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
	client.user.setGame("on 2.1");
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
