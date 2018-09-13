const permissions = require('./core/permissions');
const core = require('./core/core');

const mafia = require('./mafia/commands/commands');
const dice = require('./dice/dice');
const silly = require('./silly/silly');

module.exports.getCommand = cmd => {
    switch(cmd) {
        case 'ping':
            return commandObject(core.ping, permissions.isOp);
        case 'roll':
            return commandObject(dice.roll, permissions.isAny);
        case 'slap':
            return commandObject(silly.slap, permissions.isAny);
        case 'mute':
            return commandObject(core.mute, permissions.isHop);
        case 'unmute':
            return commandObject(core.unmute, permissions.isHop);
        case 'start':
            return commandObject(mafia.startGame, permissions.isAny);
        case 'in':
            return commandObject(mafia.playerIn, permissions.isAny);
        case 'out':
            return commandObject(mafia.playerOut, permissions.isAny);
        case 'abort':
            return commandObject(mafia.abortGame, permissions.isHop);
        case 'force-start':
            return commandObject(mafia.beginGame, permissions.isAny);
	case 'Kiss':
            return commandObject(silly.kiss, permissions.isAny);
	}
};

const commandObject = (func, auth) => {
    return { execute: func, hasPermission: auth };
}
