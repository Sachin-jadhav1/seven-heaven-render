const httpStatus = require('http-status');
const catchAsync = require('../../../utilities/catchAsync');
const sendResponse = require('../../../utilities/responseHandler');
const clanService = require('../services');

const addUserToClan = catchAsync(async (req, res) => {
  const { clanId } = req.params;
  const { userId } = req.body;

  if (!clanId || !userId) {
    return sendResponse(res, httpStatus.BAD_REQUEST, null, 'Clan ID and User ID are required');
  }

  const result = await clanService.addUserToClan(clanId, userId);

  if (result?.status) {
    sendResponse(res, httpStatus.OK, result.data, 'User added to clan successfully');
  } else {
    sendResponse(res, result.code || httpStatus.INTERNAL_SERVER_ERROR, null, result.msg || 'Failed to add user');
  }
});

module.exports = addUserToClan;
