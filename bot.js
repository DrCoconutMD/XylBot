const discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');

const core = require('./core/core');
const permissions = require('./core/permissions');
const mafia = require('./mafia/commands/commands');
const dice = require('./dice/dice');
const silly = require('./silly/silly');

const cmd = require('./cmd');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, { colorize: true });
logger.level = 'debug';

const mafbot = new discord.Client();

mafbot.on('ready', () => {
	logger.info(`Connected!`);
	logger.info(`Logged in as: ${mafbot.user.username} - (${mafbot.user.id})`);
});

mafbot.on('message', async message => {
	const content = message.content;
	if (content.substring(0,1) !== '!') {
		return;
	}

	const channel = message.channel;
	const user = message.member;

	var args = content.substring(1).split(' ');
	const command = cmd.getCommand(args.shift());

	if (!command) {
		channel.send(`${user.displayName}, that is not a valid command. Shame on you.`);
	} else if (command.hasPermission(user)) {
		command.execute(channel, user, args);
	} else {
		channel.send(`Sorry ${user.displayName}, you don't have permission to use that command.`);
	}
});

mafbot.login(auth.token);
