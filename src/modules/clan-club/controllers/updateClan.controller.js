const httpStatus = require('http-status');
const catchAsync = require('../../../utilities/catchAsync');
const sendResponse = require('../../../utilities/responseHandler');
const clanService = require('../services');

const updateClan = catchAsync(async (req, res) => {
  const { clanId } = req.params;
  const updates = req.body;

  const result = await clanService.updateClan(clanId, updates);

  if (result?.status) {
    return sendResponse(res, httpStatus.OK, result.data, null);
  } else if (result?.code === 404) {
    return sendResponse(res, httpStatus.NOT_FOUND, null, result.msg);
  } else {
    return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, result.msg);
  }
});

module.exports = updateClan;
