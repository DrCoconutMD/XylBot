module.exports.roll = async arg => {
    const dice = deduceDice(arg);
    let numberOfDice;
    let sidesOfDice;

    if (!dice[0]) numberOfDice = 1;
    if (!dice[1]) sidesOfDice = 6;

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