const httpStatus = require('http-status');
const catchAsync = require('../../../utilities/catchAsync');
const sendResponse = require('../../../utilities/responseHandler');
const clubService = require('../services');

const joinClub = catchAsync(async (req, res) => {
    const { userId } = req.body || {};
    const { clubId } = req.params;
    console.log(`Req body for joinClub: userId=${userId}, clubId=${clubId}`);

    const result = await clubService.joinClub(clubId, userId);

    if (result?.status) {
        sendResponse(
            res,
            result?.code === 201 ? httpStatus.CREATED : httpStatus.OK,
            result?.data,
            null
        );
    } else if (result?.code === 400) {
        sendResponse(res, httpStatus.BAD_REQUEST, null, result?.msg || result?.message);
    } else if (result?.code === 404) {
        sendResponse(res, httpStatus.NOT_FOUND, null, result?.msg);
    } else if (result?.code === 409) {
        sendResponse(res, httpStatus.CONFLICT, null, result?.msg);
    } else {
        sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, result?.msg);
    }
});

module.exports =  joinClub;
