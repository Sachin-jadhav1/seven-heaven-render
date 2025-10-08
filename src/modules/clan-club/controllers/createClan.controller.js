const httpStatus = require('http-status');
const catchAsync = require('../../../utilities/catchAsync');
const sendResponse = require('../../../utilities/responseHandler');
const clanService = require('../services'); 
const mongoose = require('mongoose');




// const createClans = catchAsync(async (req, res) => {
//   const { name, tag, description, emblem, settings } = req.body || {};
//   console.log('Req body for createClan:', req.body);

//   // ✅ Validate required fields
//   if (!name || typeof name !== 'string' || !tag || typeof tag !== 'string') {
//     return sendResponse(
//       res,
//       httpStatus.BAD_REQUEST,
//       null,
//       'Clan name and tag are required and must be strings'
//     );
//   }

//   // Call the service
//   const result = await clanService.createClan(req.user.id, {
//     name,
//     tag,
//     description,
//     emblem,
//     settings,
//   });

//   // Send response
//   if (result?.status) {
//     return sendResponse(
//       res,
//       result.code === 201 ? httpStatus.CREATED : httpStatus.OK,
//       result.data,
//       null
//     );
//   } else if (result?.code === 400) {
//     return sendResponse(res, httpStatus.BAD_REQUEST, null, result.msg || result.message);
//   } else if (result?.code === 409) {
//     return sendResponse(res, httpStatus.CONFLICT, null, result.msg);
//   } else {
//     return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, result.msg);
//   }
// });

// module.exports = createClans;


const createClans = catchAsync(async (req, res) => {
  const { name, tag, description, emblem, settings } = req.body || {};
  console.log('Req body for createClan:', req.body);

  // Validate required fields
  if (!name || typeof name !== 'string' || !tag || typeof tag !== 'string') {
    return sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      null,
      'Clan name and tag are required and must be strings'
    );
  }

  // Generate a temporary leader ID for testing (valid ObjectId)
  const tempLeaderId = new mongoose.Types.ObjectId();

  // Call the service
  const result = await clanService.createClan(tempLeaderId, { name, tag, description, emblem, settings });

  // Send response
  if (result?.status) {
    return sendResponse(
      res,
      result.code === 201 ? httpStatus.CREATED : httpStatus.OK,
      result.data,
      null
    );
  } else if (result?.code === 400) {
    return sendResponse(res, httpStatus.BAD_REQUEST, null, result.msg || result.message);
  } else if (result?.code === 409) {
    return sendResponse(res, httpStatus.CONFLICT, null, result.msg);
  } else {
    return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, result.msg);
  }
});

module.exports = createClans;
