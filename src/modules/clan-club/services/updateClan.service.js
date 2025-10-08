const Clan = require('../Clan'); // Mongoose model

const updateClan = async (clanId, updates) => {
  try {
    const clan = await Clan.findByIdAndUpdate(clanId, updates, { new: true });
    if (!clan) return { status: false, code: 404, msg: 'Clan not found' };

    return { status: true, code: 200, data: clan };
  } catch (error) {
    console.error('Error updating clan:', error);
    return { status: false, code: 500, msg: error.message };
  }
};

module.exports =  updateClan ;
