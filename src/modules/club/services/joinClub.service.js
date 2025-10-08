const Club = require('../club.model'); 

const joinClub = async (clubId, userId) => {
  try {
    if (!clubId || !userId) {
      return { status: false, code: 400, msg: 'Club ID and User ID are required' };
    }

    const club = await Club.findById(clubId);
    if (!club) {
      return { status: false, code: 404, msg: 'Club not found' };
    }

    if (club.members.includes(userId)) {
      return { status: false, code: 400, msg: 'User already a member of this club' };
    }

    if (club.members.length >= 40) {
      return { status: false, code: 400, msg: 'Club is full (maximum 40 members)' };
    }

    club.members.push(userId);
    await club.save();

    return { status: true, code: 200, data: club };
  } catch (error) {
    console.error('Error joining club:', error);
    return { status: false, code: 500, msg: error.message };
  }
};

exports.default = joinClub;