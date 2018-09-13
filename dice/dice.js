module.exports.roll = (channel, user, args) => {
    if (!args[0]) {
        args.push(`1d6`);
    }
    const rolledDice = [];
    
    while (args.length > 0) {
        const dice = deduceDice(args.shift());

        const numberOfDice = dice[0] ? dice[0] : 1;
        const sidesOfDice = dice[1] ? dice[1] : 6;

        for (let i = 0; i < numberOfDice; i++) {
            rolledDice.push(Math.floor(Math.random() * sidesOfDice + 1));
        }
    }
    const total = rolledDice.reduce((a, b) => a + b, 0);

    channel.send(`Hey ${user.username}, You rolled a ${total} (${rolledDice.join(', ')}).`);
};

const deduceDice = dice => {
    return dice.split('d');
};