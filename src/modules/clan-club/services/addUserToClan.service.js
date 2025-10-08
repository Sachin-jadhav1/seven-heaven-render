const Clan = require('../Clan'); // Mongoose model`

const addUserToClan = async (clanId, userId) => {
  try {
    const clan = await Clan.findById(clanId);
    if (!clan) {
      return { status: false, code: 404, msg: 'Clan not found' };
    }

    // Check if user already in clan
    const alreadyMember = clan.members.some(member => member.userId === userId);
    if (alreadyMember) {
      return { status: false, code: 400, msg: 'User already in this clan' };
    }

    // Add user
    clan.members.push({ userId });
    await clan.save();

    return { status: true, code: 200, data: clan };
  } catch (error) {
    return { status: false, code: 500, msg: error.message };
  }
};

module.exports =  addUserToClan;

