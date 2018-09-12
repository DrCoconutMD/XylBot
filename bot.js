const discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');

const core = require('./core/core');
const mafia = require('./mafia/commands/commands');
const dice = require('./dice/dice');
const silly = require('./silly/silly');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, { colorize: true });
logger.level = 'debug';

const mafbot = new discord.Client();

mafbot.on('ready', () => {
	logger.info(`Connected!`);
	logger.info(`Logged in as: ${mafbot.user.username} - (${mafbot.user.id})`);
});

mafbot.on('message', async message => {
	const channel = message.channel;
	const content = message.content;
	const user = message.author;
	if (content.substring(0,1) !== '!') {
		return;
	}
	var args = content.substring(1).split(' ');
	var cmd = args[0];
	args = args.splice(1);
	switch(cmd) {
		case 'ping':
			sendMessage(channel, 'PONGOGONG');
			break;
		case 'roll':
			sendMessage(channel, dice.roll(args));
			break;
		case 'slap':
			if (args[0] && (args[0].includes('everyone') || args[0].includes('here'))) {
				args[0] = user.username;
			}
			sendMessage(channel, silly.slap(args));
			break;
		case 'mute':
			core.mute(channel);
			break;
		case 'unmute':
			core.unmute(channel);
			break;
		case 'start':
			mafia.startGame(channel);
			break;
		case 'in':
			mafia.playerIn(user, channel);
			break;
	}
});

const sendMessage = (channel, message) => {
	channel.send(message);
};

mafbot.login(auth.token);
