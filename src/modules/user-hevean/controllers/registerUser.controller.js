const httpStatus = require('http-status');
const catchAsync = require('../../../utilities/catchAsync');
const sendResponse = require('../../../utilities/responseHandler');
const userService = require("../services");

// Screen-1: Sign Up with Email
// const registerUsers = catchAsync(async (req, res) => {
//     const { email, password, referralCode } = req.body || {};
//        console.log("Req body", req.body)
//     const result = await userService.registerUser({ email, password, referralCode });

//     if (result?.status) {
//         sendResponse(
//             res,
//             result?.code === 201 ? httpStatus.CREATED : httpStatus.OK,
//             result?.data,
//             null
//         );
//     } else if (result?.code === 400) {
//         sendResponse(res, httpStatus.BAD_REQUEST, null, result?.message);
//     } else if (result?.code === 409) {
//         sendResponse(res, httpStatus.CONFLICT, null, result?.msg);
//     } else {
//         sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, result?.msg);
//     }
// });

// module.exports = registerUsers;

// Screen-1: Sign Up with Email
const registerUsers = catchAsync(async (req, res) => {
    const { email } = req.body || {};  // Only email now
    console.log("Req body", req.body);

    const result = await userService.registerUser({ email });  // Pass only email

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

module.exports = registerUsers;



