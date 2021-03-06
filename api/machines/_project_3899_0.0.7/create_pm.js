module.exports = {
  "inputs": {
    "organizationID": {
      "example": "abc123",
      "friendlyName": "organizationID",
      "required": true
    },
    "name": {
      "example": "ease of market",
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
        "organizationID": "abc123",
        "name": "ease of market",
        "weight": 2,
        "id": "abc123",
        "createdAt": "2015-10-06T22:56:59.569Z",
        "updatedAt": "2015-10-06T22:56:59.569Z"
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
    env.sails.models.pm.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_pm"
};