const httpStatus = require('http-status');
const catchAsync = require('../../../utilities/catchAsync');
const sendResponse = require('../../../utilities/responseHandler');
const clanService = require('../services');

const getAllClans = catchAsync(async (req, res) => {
  const result = await clanService.getAllClan();

  if (result?.status) {
    return sendResponse(res, httpStatus.OK, result.data, null);
  } else {
    return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, result.msg);
  }
});

module.exports = getAllClans;
