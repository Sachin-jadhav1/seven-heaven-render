
const Clan = require('../Clan'); // Mongoose model

const getAllClans = async () => {
  try {
    const clans = await Clan.find().sort({ createdAt: -1 });
    return { status: true, code: 200, data: clans };
  } catch (error) {
    console.error('Error fetching clans:', error);
    return { status: false, code: 500, msg: error.message };
  }
};

module.exports = getAllClans ;
