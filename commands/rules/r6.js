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
// Rule 6
const rulenumber = 6;
const ruleDescription = "NSFW is prohibited.";
const {Command} = require('discord.js-commando');
const Discord = require("discord.js");

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'r' + rulenumber,
            group: 'rules',
            memberName: 'r' + rulenumber,
            description: 'Prints rule ' + rulenumber,
            examples: ['r' + rulenumber]
        })
    }

    async

    run(msg) {
        let ruleEmbed = new Discord.RichEmbed();

        ruleEmbed
            .setColor("#2e888e")
            .setTitle("Rule " + rulenumber)
            .setDescription(ruleDescription)
            .setFooter("This embed is part of pedro-discordjs-bot. (c) Ev1l0rd 2017", "https://cdn.discordapp.com/emojis/349312608387596299.png")

        await
        msg.embed(ruleEmbed)
    }
}