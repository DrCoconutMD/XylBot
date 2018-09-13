module.exports.slap = (channel, user, args) => {
    let arg = args[0];

    if (!arg) {
        arg = `himself`;
    } else if ((arg.includes('everyone') || arg.includes('here'))) {
        arg = user.displayName;
    }

    const weight = Math.floor(Math.random() * 1000 + 1);
    const animalIndex = Math.floor(Math.random() * creatures.length);
    const animal = creatures[animalIndex];

    channel.send(`\:hand_splayed: slaps ${arg} with a ${weight}lb ${animal}!`);
};

const creatures = [
    'trout',
    'salmon',
    'tuna',
    'cuttlefish',
    'panther',
    'impala',
    'yak',
    'ant',
    'bumblebee',
    'tarantula',
    'wolf',
    'doggo',
    'baby',
    'goat',
    'steak',
    'petunia',
    'note',
    'Ed Sheeran',
    'aardvark',
    'platypus',
    'jellyfish',
    'stingray',
    'komodo dragon',
    'mantis shrimp',
    'sapling',
    'chicken nugget',
    'garbonzo bean',
    'spaghetti noodle',
    'cicada',
    'ocelot'
];
