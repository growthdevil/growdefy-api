module.exports = {
  "inputs": {
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Gtpm instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "organizationID": "String",
        "name": "ROI",
        "weight": 2,
        "id": 123,
        "createdAt": "2015-09-22T23:10:02.791Z",
        "updatedAt": "2015-09-22T23:10:02.791Z"
      }
    },
    "error": {
      "example": undefined
    },
    "notFound": {
      "void": true
    }
  },
  "sync": false,
  "cacheable": false,
  "defaultExit": undefined,
  "fn": function(inputs, exits, env) {
    env.sails.models.gtpm.findOne(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, record) {
      if (err) {
        return exits.error(err);
      }
      if (!record) {
        return exits.notFound();
      }
      return exits.success(record);
    });
  },
  "identity": "findOne_gtpm"
};