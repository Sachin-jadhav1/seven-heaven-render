const httpStatus = require('http-status');
const catchAsync = require('../../../utilities/catchAsync');
const sendResponse = require('../../../utilities/responseHandler');
const clubService = require('../services');

const getClub = catchAsync(async (req, res) => {
    const { clubId } = req.params;
    console.log(`Fetching club with ID: ${clubId}`);

    const result = await clubService.getClub(clubId);

    if (result?.status) {
        sendResponse(
            res,
            httpStatus.OK,
            result?.data,
            null
        );
    } else if (result?.code === 404) {
        sendResponse(res, httpStatus.NOT_FOUND, null, result?.msg || 'Club not found');
    } else if (result?.code === 400) {
        sendResponse(res, httpStatus.BAD_REQUEST, null, result?.msg || 'Invalid club ID');
    } else {
        sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, result?.msg || 'Something went wrong');
    }
});

module.exports = getClub;
