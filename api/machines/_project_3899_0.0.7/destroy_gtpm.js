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
      "example": [{
        "organizationID": "String",
        "name": "ROI",
        "weight": 2,
        "id": 123,
        "createdAt": "2015-09-22T23:10:02.791Z",
        "updatedAt": "2015-09-22T23:10:02.791Z"
      }]
    },
    "error": {
      "example": undefined
    }
  },
  "sync": false,
  "cacheable": false,
  "defaultExit": undefined,
  "fn": function(inputs, exits, env) {
    env.sails.models.gtpm.destroy(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "destroy_gtpm"
};