const express = require('express');

const {createClub,getClub,joinClub,leaveClub } = require('../modules/club/controllers');

const { createClubs,getAllClan,getClanById,updateClan,addUserToClan} = require('../modules/clan-club/controllers');


const router = express.Router();
//Gaffar 
router.route('/create-clubs').post(createClubs);
router.route('/get-all-clan').get(getAllClan);
router.route('/get-clan/:clanId').get(getClanById);
router.route('/update-clan:clanId').patch(updateClan);
router.route('/add-user-to-clan/:clanId').post(addUserToClan);



//Gaffar 

router.route('/create-club').post(createClub);
// router.route('/get-club').post(getClub);
// router.route('/join-club').post(joinClub);
// router.route('/leave-club').post(leaveClub);

module.exports = router;