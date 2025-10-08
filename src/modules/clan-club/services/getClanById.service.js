
const Clan = require('../Clan'); // Mongoose model

const getClanById = async (clanId) => {
  try {
    const clan = await Clan.findById(clanId);
    if (!clan) return { status: false, code: 404, msg: 'Clan not found' };

    return { status: true, code: 200, data: clan };
  } catch (error) {
    console.error('Error fetching clan:', error);
    return { status: false, code: 500, msg: error.message };
  }
};

module.exports = getClanById ;