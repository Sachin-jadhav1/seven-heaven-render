const httpStatus = require('http-status');
const catchAsync = require('../../../utilities/catchAsync');
const sendResponse = require('../../../utilities/responseHandler');
const userService = require("../services");

const sendLoginOtp = catchAsync(async (req, res) => {
  const { email } = req.body || {};
  const result = await userService.sendLoginOtp(email);

  if (result.status) {
    sendResponse(res, httpStatus.OK, result.data, null);
  } else {
    sendResponse(res, httpStatus.BAD_REQUEST, null, result.msg);
  }
});

module.exports = sendLoginOtp;