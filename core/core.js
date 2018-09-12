module.exports.mute = channel => {
    channel.overwritePermissions(channel.guild.defaultRole, { SEND_MESSAGES: false });
};

module.exports.unmute = channel => {
    channel.overwritePermissions(channel.guild.defaultRole, { SEND_MESSAGES: true });
};