const httpStatus = require('http-status');
const catchAsync = require('../../../utilities/catchAsync');
const sendResponse = require('../../../utilities/responseHandler');
const clubService = require('../services');

const leaveClub = catchAsync(async (req, res) => {
    const { userId } = req.body || {};
    const { clubId } = req.params;
    console.log(`Req body for leaveClub: userId=${userId}, clubId=${clubId}`);

    const result = await clubService.leaveClub(clubId, userId);

    if (result?.status) {
        sendResponse(
            res,
            result?.code === 200 ? httpStatus.OK : httpStatus.OK,
            result?.data,
            null
        );
    } else if (result?.code === 404) {
        sendResponse(res, httpStatus.NOT_FOUND, null, result?.msg);
    } else if (result?.code === 400) {
        sendResponse(res, httpStatus.BAD_REQUEST, null, result?.msg || result?.message);
    } else {
        sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, result?.msg);
    }
});

module.exports = leaveClub;
