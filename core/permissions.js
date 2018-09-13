const OP_ROLE = "Ops";
const HOP_ROLE = "HalfOps";
const PLAYER_ROLE = "Players";

module.exports.isOp = user => {
    return user.roles.some(role => role.name === OP_ROLE);
};

module.exports.isHop = user => {
    return user.roles.some(role => role.name.contains(OP_ROLE));
};

module.exports.isPlayer = user => {
    return user.roles.some(role => role.name === PLAYER_ROLE);
};

module.exports.isAny = user => {
    return true;
};
