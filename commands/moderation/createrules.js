//Creates the rules post

const { Command } = require('discord.js-commando');

module.exports = class createRules extends Command {
	constructor(client) {
		super(client, {
			name: 'createrules',
			group: 'moderation',
			memberName: 'createrules',
			description: 'Creates the rules message and deletes old ones. _Note, that this is a hardcoded message and probably should have setapproval run after it._',
			examples: ['createrules'],
			guildOnly: true
		})
	}

	hasPermission(msg) {
		if (!this.client.isOwner(msg.author)) return 'Only the bot owner can run this command';
		return true;
	}

	async run(msg){
		var rulesChannel = this.client.channels.get("349286964580712451")
        console.log(rulesChannel);
        rulesChannel.bulkDelete(1,false) //Rules should only contain one message anyway, so I'm allowed to be lazy. And if it fails, a manual remove is annoying at worst.
		var rulesList = `Rules

1. Don't be a jerk. Be kind to other people and help them out.
  - This rule is also talking about messing with Paul because of the unbanmii situation 

2. No piracy. Don't link to wares - this includes the key site and the angel tool.

3. No alts, at least without asking a moderator first.
  - In order to get activated, you'll need to say "!APPROVEWORD" in #approval

4. Don't spam. This falls under rule 1 but I want to be explicit.

5. Don't bring up drama. This falls under rule 1 but I want to be explicit.
  - This includes importing drama from other servers. Hash it out there or in DMs. 
  - This rule also prohibits questions like "will freeshop contain malware?" (BTW, the answer to that is that as long as it's open sourced, we can see all the changes to freeshop meaning that it's possible to check if a developer adds nasty stuff to it): 

6. NSFW is prohibited.

7. Don't ask for any roles.

8. The cache updates on Monday, Wednesday & Saturday. Don't ask if it has updated, or for an update. The cache maintainer has a life outside of Freeshop.

9. All decisions by staff are final and not up to public debate. If you have a concern, take it up privately or in #meta.

10. No slurs.

Staff Members:

Administrators:
@Dionicio3 [Administrator] 
@Paul [Main Dev, Timmy's Killer]
@Skiddo [Administrator] 

Supervisors:
@Kobayashi [Supervisor]
@ev1l0rd [tubularSupervisor] 👻
@370 [Supervisor]

Moderators:
@EdTheNerd [Moderator]
@trainboy2019 [Moderator]
@Byokugen Unit_01(edited)
Permanent invite to this server: http://discord.gg/vqcD33r`; //Note: This is kinda ugly
		rulesChannel.send(rulesList);
		return msg.say("Rules succesfully generated!");
	}
}