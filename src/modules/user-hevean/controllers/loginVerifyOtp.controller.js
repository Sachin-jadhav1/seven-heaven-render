const httpStatus = require('http-status');
const catchAsync = require('../../../utilities/catchAsync');
const sendResponse = require('../../../utilities/responseHandler');
const userService = require("../services");

const verifyLoginOtp = catchAsync(async (req, res) => {
  const { email, otp } = req.body || {};
  const result = await userService.verifyLoginOtp(email, otp);

  if (result.status) {
    sendResponse(res, httpStatus.OK, result.data, null);
  } else {
    sendResponse(res, httpStatus.BAD_REQUEST, null, result.msg);
  }
});

module.exports = verifyLoginOtp;