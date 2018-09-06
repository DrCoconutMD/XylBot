var discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, { colorize: true });
logger.level = 'debug';

var mafbot = new discord.Client({
	token: auth.token,
	autorun: true
});

mafbot.on('ready', evt => {
	logger.info('Connected!');
	logger.info('Logged in as: ');
	logger.info(mafbot.username + ' - (' + mafbot.id + ')');
});

mafbot.on('message', (user, userId, channelId, message, evt) => {
	if (message.substring(0,1) === '!') {
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
		}
	}
});
