const httpStatus = require('http-status');
const catchAsync = require('../../../utilities/catchAsync');
const sendResponse = require('../../../utilities/responseHandler');
const clubService = require('../services');

// const createClub = catchAsync(async (req, res) => {
//     const { name, description } = req.body || {};
//     console.log("Req body for createClub:", req.body);

//     const result = await clubService.createClub({ name, description });

//     if (result?.status) {
//         sendResponse(
//             res,
//             result?.code === 201 ? httpStatus.CREATED : httpStatus.OK,
//             result?.data,
//             null
//         );
//     } else if (result?.code === 400) {
//         sendResponse(res, httpStatus.BAD_REQUEST, null, result?.msg || result?.message);
//     } else if (result?.code === 409) {
//         sendResponse(res, httpStatus.CONFLICT, null, result?.msg);
//     } else {
//         sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, result?.msg);
//     }
// });

// module.exports = createClub;



const createClub = catchAsync(async (req, res) => {
    // ✅ Ensure req.body is an object
    const { name, description } = req.body || {};
    console.log("Req body for createClub:", req.body);

    // Validate input
    if (!name || typeof name !== 'string') {
        return sendResponse(
            res,
            httpStatus.BAD_REQUEST,
            null,
            'Club name is required and must be a string'
        );
    }

    // Call the service
    const result = await clubService.createClub(name, description); // Pass name, description directly

    // Send response based on result.status
    if (result?.status) {
        sendResponse(
            res,
            result?.code === 201 ? httpStatus.CREATED : httpStatus.OK,
            result?.data,
            null
        );
    } else if (result?.code === 400) {
        sendResponse(res, httpStatus.BAD_REQUEST, null, result?.msg || result?.message);
    } else if (result?.code === 409) {
        sendResponse(res, httpStatus.CONFLICT, null, result?.msg);
    } else {
        sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, result?.msg);
    }
});

module.exports = createClub;

