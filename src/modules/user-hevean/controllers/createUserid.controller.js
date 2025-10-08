const httpStatus = require('http-status');
const catchAsync = require('../../../utilities/catchAsync');
const sendResponse = require('../../../utilities/responseHandler');
const userService = require("../services");

const createUserId = catchAsync(async (req, res) => {
    const { email, userId } = req.body || {};

    const result = await userService.createUserId(email, userId);

    if (result?.status) {
        sendResponse(res, httpStatus.CREATED, result?.data, null);
    } else if (result?.code === 400) {
        sendResponse(res, httpStatus.BAD_REQUEST, null, result?.message);
    } else if (result?.code === 409) {
        sendResponse(res, httpStatus.CONFLICT, null, result?.msg);
    } else {
        sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, result?.msg);
    }
});

module.exports = createUserId;