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

//Locks down a channel
let config = require("../../config.json");
let modRole = config.modID;
let adminRole = config.adminID;
let approvedConfig = config.approvedID;
let logChannelConfig = config.logChannel;
const {Command} = require("discord.js-commando");

module.exports = class createRules extends Command {
	constructor(client) {
		super(client, {
			name: "lockdown",
			group: "moderation",
			memberName: "lockdown",
			description: "Locks down a channel. Only roles defined as Moderator or Administator in config.json can speak. Use _liftlockdown_ to remove the lockdown.",
			examples: ["lockdown"],
			guildOnly: true
		});
	}

	hasPermission(msg) {
		if (msg.member.roles.has(modRole) || msg.member.roles.has(adminRole)) {
			return true;
		} else {
			return "Only people marked as Supervisor or Administrator can run this command.";
		}
	}

	async run(msg) {
		let channelToLock = msg.channel;
		let logChannel = this.client.channels.get(logChannelConfig);
		let approvedRole = msg.guild.roles.get(approvedConfig);


		channelToLock.overwritePermissions(approvedRole, {
			SEND_MESSAGES: false
		}, "Channel Lockdown initiated.");

		if (!this.client.lockedChannels.get(channelToLock.id)) {
			logChannel.send("🔒 User " + msg.author.toString() + "initiated a lockdown in channel" + msg.channel.toString() + ".");
		}

		await this.client.lockedChannels.set(channelToLock.id, true);
		return msg.say("Channel lockdown initiated");
	}
};