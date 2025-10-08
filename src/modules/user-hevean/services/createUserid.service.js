const UserModel = require('../user.model');
const mongoose = require('mongoose');

/**
 * Create User ID
 * - Assigns a unique userId to a verified user
 */
const createUserId = async (email, userId) => {
  try {
    // 1. Find user by email
    const user = await UserModel.findOne({ email, active: true });
    if (!user) {
      return { status: false, code: 400, msg: 'User not found.' };
    }

    // 2. Ensure user is verified
    if (!user.isVerified) {
      return { status: false, code: 400, msg: 'Email not verified yet.' };
    }

    // 3. Check if userId already exists
    const existingUserId = await UserModel.findOne({ userId });
    if (existingUserId) {
      return { status: false, code: 409, msg: 'User ID already taken.' };
    }

    // 4. Update user with userId
    user.userId = userId;
    await user.save();

    return {
      status: true,
      code: 201,
      data: { email: user.email, userId: user.userId, message: 'User ID created successfully.' },
    };
  } catch (error) {
    return { status: false, code: 500, msg: error.message || 'Internal Server Error' };
  }
};

module.exports = createUserId
