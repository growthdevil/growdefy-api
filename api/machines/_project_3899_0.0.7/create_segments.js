module.exports = {
  "inputs": {
    "name": {
      "example": "boys",
      "friendlyName": "name",
      "required": true
    },
    "organizationID": {
      "example": "abc123",
      "friendlyName": "organizationID",
      "required": true
    },
    "ranking": {
      "example": 59,
      "friendlyName": "ranking"
    },
    "priorityArray": {
      "example": "[1,2,3]",
      "friendlyName": "priorityArray"
    },
    "description": {
      "example": "Long description.",
      "friendlyName": "description"
    },
    "marketSize": {
      "example": 100000,
      "friendlyName": "marketSize"
    },
    "colour": {
      "example": "#000000",
      "friendlyName": "colour",
      "required": true
    },
    "status": {
      "example": 1,
      "friendlyName": "status",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "name": "boys",
        "organizationID": "abc123",
        "ranking": 59,
        "priorityArray": "[1,2,3]",
        "description": "Long description.",
        "marketSize": 100000,
        "colour": "#000000",
        "status": 1,
        "id": "abc123",
        "createdAt": "2015-10-07T02:05:29.509Z",
        "updatedAt": "2015-10-07T02:05:29.509Z"
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
    env.sails.models.segments.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_segments"
};