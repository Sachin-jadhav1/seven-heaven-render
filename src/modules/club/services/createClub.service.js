const Club = require('../club.model'); // your Mongoose model

const createClub = async (name, description) => {
  try {
    if (!name) {
      return { status: false, code: 400, msg: 'Club name is required' };
    }

    const existing = await Club.findOne({ name });
    if (existing) {
      return { status: false, code: 409, msg: 'Club name already exists' };
    }

    const club = await Club.create({ name, description, members: [] });

    return { status: true, code: 200, data: club };
  } catch (error) {
    console.error('Error creating club:', error);
    return { status: false, code: 500, msg: error.message };
  }
};

module.exports =  createClub;
