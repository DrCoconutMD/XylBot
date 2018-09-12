const config = require('../libs/config.json');

let gameStatus = '';
let minplayers, maxplayers, currentSetup;
const players = [];

module.exports.startGame = async channel => {
    if (gameStatus) {
        channel.send(`There is already a game in progress!`);
        return;
    }
    gameStatus = 'signups';

    minplayers = config.minimum_players;
    maxplayers = config.maximum_players;
    currentSetup = 'normal';
    let timer = config.start_time;

    channel.send(
        `Starting a game of Mafia [${currentSetup}] in ${timer} seconds.` +
        `Type "!in" to sign up.`
    );

    const wait60Seconds = async () => new Promise(resolve => setTimeout(resolve, 60000));
    while (timer > 0) {
        await wait60Seconds();
        timer -= 60;
        if (timer > 0) {
            channel.send(`${timer} seconds left...`);
        }
    }
    beginGame(channel);
};

module.exports.playerIn = (user, channel) => {
    if (gameStatus != 'signups') {
        channel.send(`There is no game in progress, ${user.username}.`);
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
    channel.send(`You are now signed up for the next game, ${user.username}.`);
};

const beginGame = channel => {
    channel.send(`The game is afoot!`);
    channel.send(`Players: ${players.map(player => player.username).join(', ')}`);
    const role = channel.guild.roles.find(role => role.name === config.player_role);
    players.forEach(player => {
        channel.guild.member(player).addRole(role);
    });
};