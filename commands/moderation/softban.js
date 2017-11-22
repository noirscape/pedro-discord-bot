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

const {Command} = require("discord.js-commando");
let config = require("../../config.json");
let modRole = config.modID;
let adminRole = config.adminID;
let logChannelConfig = config.logChannel;

module.exports = class createRules extends Command {
	constructor(client) {
		super(client, {
			name: "softban",
			group: "moderation",
			memberName: "softban",
			description: "Softbans a userID. Softbanned userIDs are auto-banned when they join the server. userID argument is required.",
			examples: ["softban 0000"],
			guildOnly: true,

			args: [
				{
					key: "userID",
					prompt: "Please specify the userID to softban.",
					type: "string"
				}
			]
		});
	}

	hasPermission(msg) {
		if (msg.member.roles.has(modRole) || msg.member.roles.has(adminRole)){
			return true;
		} else {
			return false;
		}
	}

	async run(msg, {userID}){
		let softbanTable = this.client.softbanned;
		await softbanTable.set(userID,true);

		let logChannel = this.client.channels.get(logChannelConfig);
		logChannel.send("⚒ Softbanned userID: " + userID + " - Softban issuer was " + msg.author.toString());

		return msg.say("Softb&!");
	}
};