const discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');

const dice = require('./dice/dice');
const silly = require('./silly/silly');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, { colorize: true });
logger.level = 'debug';

const mafbot = new discord.Client({
	token: auth.token,
	autorun: true
});

mafbot.on('ready', evt => {
	logger.info(`Connected!`);
	logger.info(`Logged in as: ${mafbot.username} - (${mafbot.id})`);
});

mafbot.on('message', async (user, userId, channelId, message, evt) => {
	if (channelId !== '487080224320782336') {
		return;
	}
	if (message.substring(0,1) !== '!') {
		return;
	}
	var args = message.substring(1).split(' ');
	var cmd = args[0];
	args = args.splice(1);
	switch(cmd) {
		case 'ping':
			sendMessage(channelId, 'PONGOGONG');
			break;
		case 'roll':
			sendMessage(channelId, dice.roll(args));
			break;
		case 'slap':
			sendMessage(channelId, silly.slap(args));
			break;
	}
});

const sendMessage = (channelId, message) => {
	mafbot.sendMessage({
		to: channelId,
		message: message
	});
};
