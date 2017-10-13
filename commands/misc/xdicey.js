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
// x dice y - Rolls an y sided dice x times.
const {Command} = require("discord.js-commando");

module.exports = class xdicey extends Command {
	constructor(client) {
		super(client, {
			name: "xdicey",
			group: "misc",
			memberName: "xdicey",
			description: "Rolls an y sided die x amount of times.",
			examples: ["xdicey 4 7"],

			args: [
				{
					key: "amountOfRolls",
					prompt: "How many times would you like to roll the die?",
					default: "1",
					type: "integer",
					validate: amountOfRolls => {
						if (amountOfRolls >= 0 && amountOfRolls <= 10000) return true;
						return "You either tried to roll more than 10000 times or you tried to roll a negative amount of times.";
					}
				},
				{
					key: "amountOfSides",
					prompt: "How many sides does your die have?",
					default: "6",
					type: "integer",
					validate: amountOfSides => {
						if (amountOfSides >= 0 && amountOfSides <= 10000) return true;
						return "You either tried to have a dice with more than 10000 sides or you tried to have a negative dice.";
					}
				}
			]
		});
	}

	async run(msg, {amountOfRolls, amountOfSides}) {
		//return sanityCheck(amountOfRolls, amountOfSides);
		let thrownDice = await throwDice(amountOfRolls, amountOfSides);

		return msg.say(" :game_die: Threw a " + amountOfSides + " sided die " + amountOfRolls + " times. Result: " + (thrownDice).toLocaleString("en") + "  :game_die:");

		//This function throws an x sided die y amount of times.
		function throwDice(amountOfRolls, amountOfSides) {
			let totalAmount;
			let result = [];
			for (let i = 1; i <= amountOfRolls; i++) {
				let arrayVal = i - 1;
				let min = Math.ceil(1);
				let max = Math.floor(amountOfSides);
				result[arrayVal] = Math.floor(Math.random() * (max - min + 1)) + min;
			}

			// Taken from https://stackoverflow.com/a/16751601/4666756
			totalAmount = result.reduce(add, 0);

			function add(a, b) {
				return a + b;
			}

			return totalAmount;
		}

	}
}
;