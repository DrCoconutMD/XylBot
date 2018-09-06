
const logger = require('winston');

module.exports.roll = async args => {
    const arg = args[0];
    if (!arg) {
        arg = `1d6`;
    }
    const dice = deduceDice(arg);

    const numberOfDice = dice[0] ? dice[0] : 1;
    const sidesOfDice = dice[1] ? dice[1] : 6;

    const rolledDice = [];
    for (let i = 0; i < numberOfDice; i++) {
        rolledDice.push(Math.floor(Math.random() * sidesOfDice + 1));
    }
    const total = rolledDice.reduce((a, b) => a + b, 0);

    return `You rolled a ${total} (${rolledDice.join(', ')}).`;
};

const deduceDice = dice => {
    return dice.split('d');
};