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

// x dice y - Rolls an y sided dice x times.
const {Command} = require("discord.js-commando");
const dice = require("xdicey");

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
		let thrownDice = await dice(amountOfSides, amountOfRolls).total;

		return msg.say(" :game_die: Threw a " + amountOfSides + " sided die " + amountOfRolls + " times. Result: " + (thrownDice).toLocaleString("en") + "  :game_die:");
	}
};