const discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');

const dice = require('./dice/dice');

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
	if (message.substring(0,1) !== '!') {
		return;
	}
	var args = message.substring(1).split(' ');
	var cmd = args[0];
	args = args.splice(1);
	switch(cmd) {
		case 'ping':
			mafbot.sendMessage({
				to: channelId,
				message: 'PONGOGONG'
			});
			break;
		case 'roll':
			mafbot.sendMessage({
				to: channelId,
				message: await dice.roll(args)
			});
			break;
	}
});
