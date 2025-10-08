const Club = require('../club.model'); 


const leaveClub = async (clubId, userId) => {
  try {
    if (!clubId || !userId) {
      return { status: false, code: 400, msg: 'Club ID and User ID are required' };
    }

    const club = await Club.findById(clubId);
    if (!club) {
      return { status: false, code: 404, msg: 'Club not found' };
    }

    if (!club.members.includes(userId)) {
      return { status: false, code: 400, msg: 'User is not a member of this club' };
    }

    club.members = club.members.filter(id => id.toString() !== userId.toString());
    await club.save();

    return { status: true, code: 200, data: club };
  } catch (error) {
    console.error('Error leaving club:', error);
    return { status: false, code: 500, msg: error.message };
  }
};
exports.default = leaveClub;