// Get Configuration
var mysqlConfig = require('../config/mysqldb.js');

// ORM Library
const Sequelize = require('sequelize');

// Initialize Database
const sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.user, mysqlConfig.password, {
  host: mysqlConfig.host,
  dialect: 'mysql'
});

// ORM Objects
//const SurveyObj = require('./data-type/quest');
let RiderObj = sequelize.define('rider', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  lati: Sequelize.FLOAT,
  longi: Sequelize.FLOAT,
  status: Sequelize.INTEGER
}, {
  freezeTableName: true,
});

//const SurveyObj = require('./data-type/quest');
let RestaurentObj = sequelize.define('restaurant', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  lati: Sequelize.FLOAT,
  longi: Sequelize.FLOAT,
  mobile: Sequelize.STRING
}, {
  freezeTableName: true,
});

// add query functions
module.exports = {
  createUpdateRiderInfo: createUpdateRiderInfo,
  getRestaurantWithId: getRestaurantWithId,
  getAllRiders: getAllRiders
};

function createUpdateRiderInfo(req) {
  // Validate Request
  var lati = Number.parseFloat(req.body.lati);
  var longi = Number.parseFloat(req.body.longi);
  
  if (Number.isNaN(lati) || Number.isNaN(longi)) {
    return false;
  }else{
    const rider = RiderObj.build({
      lati: lati,
      longi: longi,
      status: 1
    });
  
    return new Promise((resolve, reject) => {
      rider.save().then(() => {
        resolve(req.body);
      });
    })
  }
}

function getRestaurantWithId(restaurantId) {
  return RestaurentObj.findOne({
    where: {
      id: restaurantId
    }
  });
}

function getAllRiders() {
  return RiderObj.findAll({
    attributes: ['id', 'lati', 'longi']
  });
}