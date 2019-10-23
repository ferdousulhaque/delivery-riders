// Models
const ridersModel = require('../models/riders');

// add query functions
module.exports = {
  createUpdateRiderInfo: createUpdateRiderInfo,
  checkRidersNearby: checkRidersNearby
};

function createUpdateRiderInfo(req, res, next) {
  ridersModel.createUpdateRiderInfo(req).then(resp => {
    res.status(200)
      .json({
        response: {
          status: 'success',
          data: resp,
          message: 'New Rider Added'
        }
      })
  })
}


function checkRidersNearby(req, res, next) {
  var restaurentId = parseInt(req.query.restaurent_id);
  var ridersData;
  var ridersNearby;

  ridersModel.getRestaurantWithId(restaurentId).then(resp => {
    restaurent_lati = resp.lati;
    restaurent_longi = resp.longi;
    
    // Get All Riders
    riders = ridersModel.getAllRiders().then((data) => {
      ridersData = data;
      ridersNearby = ridersData.filter((single) => {
        if(distance(single.lati, single.longi, restaurent_lati, restaurent_longi, "K") < 300){
          return true;
        }
      });

      res.status(200)
      .json({
        response: {
          status: 'success',
          data: ridersNearby,
          message: 'Riders Nearby'
        }
      })
    });
  })
}

function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}