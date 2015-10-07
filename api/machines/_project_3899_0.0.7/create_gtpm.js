module.exports = {
  "inputs": {
    "organizationID": {
      "example": "String",
      "friendlyName": "organizationID",
      "required": true
    },
    "name": {
      "example": "ROI",
      "friendlyName": "name",
      "required": true
    },
    "weight": {
      "example": 2,
      "friendlyName": "weight",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "organizationID": "String",
        "name": "ROI",
        "weight": 2,
        "id": "String",
        "createdAt": "2015-09-30T02:00:59.142Z",
        "updatedAt": "2015-09-30T02:00:59.142Z"
      }
    },
    "error": {
      "example": undefined
    }
  },
  "sync": false,
  "cacheable": false,
  "defaultExit": undefined,
  "fn": function(inputs, exits, env) {
    env.sails.models.gtpm.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_gtpm"
};