const permissions = require('./core/permissions');
const core = require('./core/core');

const mafia = require('./mafia/commands/commands');
const dice = require('./dice/dice');
const silly = require('./silly/silly');

module.exports.getCommand = cmd => {
    switch(cmd) {
        case 'ping':
            return { execute: core.ping, hasPermission: permissions.isOp };
        case 'roll':
            return { execute: dice.roll, hasPermission: permissions.isAny };
        case 'slap':
            return { execute: silly.slap, hasPermission: permissions.isAny };
        case 'mute':
            return { execute: core.mute, hasPermission: permissions.isHop };
        case 'unmute':
            return { execute: core.unmute, hasPermission: permissions.isHop };
        case 'start':
            return { execute: mafia.startGame, hasPermission: permissions.isAny };
        case 'in':
            return { execute: mafia.playerIn, hasPermission: permissions.isAny };
        case 'abort':
            return { execute: mafia.abortGame, hasPermission: permissions.isHop };
        case 'force-start':
            return { execute: mafia.beginGame, hasPermission: permissions.isAny };
	}
};