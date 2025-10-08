const Club = require('../club.model'); 

const getClub = async (clubId) => {
  try {
    if (!clubId) {
      return { status: false, code: 400, msg: 'Club ID is required' };
    }

    const club = await Club.findById(clubId).populate('members', 'name email'); // optional populate
    if (!club) {
      return { status: false, code: 404, msg: 'Club not found' };
    }

    return { status: true, code: 200, data: club };
  } catch (error) {
    console.error('Error getting club:', error);
    return { status: false, code: 500, msg: error.message };
  }
};

module.exports =  getClub;
