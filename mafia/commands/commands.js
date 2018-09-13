const config = require('../libs/config.json');
const core = require('../../core/core');

const Statuses = [ {NONE: ''}, {SIGNUPS: 'signups'}, {PROGRESS: 'in progress'} ];
let gameStatus = Statuses.NONE;
let minplayers, maxplayers, currentSetup, playerrole;
let players = [];

module.exports.startGame = async channel => {
    if (gameStatus !== Statuses.NONE) {
        channel.send(`There is already a game in progress!`);
        return;
    }
    gameStatus = Statuses.SIGNUPS;

    minplayers = config.minimum_players;
    maxplayers = config.maximum_players;
    currentSetup = 'normal';
    playerrole = channel.guild.roles.find(role => role.name === config.player_role);
    let timer = config.start_time;

    channel.send(
        `Starting a game of Mafia [${currentSetup}] in ${timer} seconds.` +
        `Type "!in" to sign up.`
    );

    const wait60Seconds = async () => new Promise(resolve => setTimeout(resolve, 60000));
    while (timer > 0) {
        await wait60Seconds();
        // if signups were cancelled, exit
        if (gameStatus !== Statuses.SIGNUPS) {
            return;
        }
        timer -= 60;
        if (timer > 0) {
            channel.send(`${timer} seconds left...`);
        }
    }
    exports.beginGame(channel);
};

module.exports.playerIn = (channel, user) => {
    if (gameStatus !== Statuses.SIGNUPS) {
        channel.send(`Signups are not in progress, ${user.username}.`);
        return;
    }
    if (players.includes(user)) {
        channel.send(`You are already signed up, ${user.username}.`);
        return;
    }
    const BANNED_NAMES = ['none', 'nolynch', 'self', 'sky', 'unknown'];
    if (BANNED_NAMES.includes(user.username)) {
        channel.send(`You cannot join a game with that nick, ${user.username}.`);
        return;
    }
    if (players.length >= maxplayers) {
        channel.send(`Sorry ${user.username}, the game is full!`);
        return;
    }

    players.push(user);
    channel.guild.member(user).addRole(playerrole);
    channel.send(`You are now signed up for the next game, ${user.username}.`);
};

module.exports.beginGame = channel => {
    gameStatus = Statuses.PROGRESS;
    channel.send(`The game is afoot!`);
    channel.send(`Players: ${players.map(player => player.username).join(', ')}`);
    core.mute(channel);
};

module.exports.abortGame = channel => {
    channel.send(`Aborting game. :(`);
    players.forEach(player => {
        channel.guild.member(player).removeRole(playerrole);
    });
    players = [];
    gameStatus = Statuses.NONE;
    core.unmute(channel);
};