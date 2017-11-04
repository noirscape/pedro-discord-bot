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
const {Command} = require("discord.js-commando");
let config = require("../../config.json");
let modRole = config.modID;
let adminRole = config.adminID;
let logChannelConfig = config.logChannel;

module.exports = class createRules extends Command {
	constructor(client) {
		super(client, {
			name: "liftsoftban",
			group: "moderation",
			memberName: "liftsoftban",
			description: "Lifts the softban from a userID. Does not auto-reinvite the banned user.",
			examples: ["liftsoftban 0000"],
			guildOnly: true,

			args: [
				{
					key: "userID",
					prompt: "Please specify the userID to lift the softban from.",
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
		await softbanTable.set(userID,false);

		msg.guild.unban(userID);

		let logChannel = this.client.channels.get(logChannelConfig);
		logChannel.send("⚒ Softbanned lifted from userID: " + userID + " - Softban lifter was " + msg.author.toString());

		return msg.say("Lifting softb& succesful!");
	}
};