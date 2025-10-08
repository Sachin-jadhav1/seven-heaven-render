const Clan = require('../Clan'); // Mongoose model

// const createClan = async (leaderId, { name, tag, description, emblem, settings }) => {
//   try {
//     if (!name || !tag) {
//       return { status: false, code: 400, msg: 'Clan name and tag are required' };
//     }

//     const existing = await Clan.findOne({ $or: [{ name }, { tag }] });
//     if (existing) {
//       return { status: false, code: 409, msg: 'Clan name or tag already exists' };
//     }

//     const clan = await Clan.create({
//       name,
//       tag,
//       description,
//       emblem,
//       leaderId,
//       members: [{ userId: leaderId, role: 'Leader' }],
//       settings,
//     });

//     return { status: true, code: 201, data: clan };
//   } catch (error) {
//     console.error('Error creating clan:', error);
//     return { status: false, code: 500, msg: error.message };
//   }
// };

// module.exports =  createClan ;


const createClan = async (leaderId, { name, tag, description, emblem, settings }) => {
  try {
    if (!name || !tag) {
      return { status: false, code: 400, msg: 'Clan name and tag are required' };
    }

    // Check if clan with same name or tag exists
    const existing = await Clan.findOne({ $or: [{ name }, { tag }] });
    if (existing) {
      return { status: false, code: 409, msg: 'Clan name or tag already exists' };
    }

    const clan = await Clan.create({
      name,
      tag,
      description,
      emblem,
      leaderId,
      members: [{ userId: leaderId, role: 'Leader' }],
      settings,
    });

    return { status: true, code: 201, data: clan };
  } catch (error) {
    console.error('Error creating clan:', error);
    return { status: false, code: 500, msg: error.message };
  }
};

module.exports = createClan ;
