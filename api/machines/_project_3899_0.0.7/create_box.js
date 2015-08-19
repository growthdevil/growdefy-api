module.exports = {
  "inputs": {
    "yCoordinate": {
      "example": -8232,
      "friendlyName": "yCoordinate",
      "required": true
    },
    "xCoordinate": {
      "example": 12345,
      "friendlyName": "xCoordinate",
      "required": true
    },
    "organizationID": {
      "example": "id21",
      "friendlyName": "organizationID",
      "required": true
    },
    "contentTitle": {
      "example": "ijdasn",
      "friendlyName": "contentTitle",
      "required": true
    },
    "contentType": {
      "example": 1,
      "friendlyName": "contentType"
    },
    "boxRelationship": {
      "example": "\"[231908,\"*\",219837,\"+\",9824]\"",
      "friendlyName": "boxRelationship"
    },
    "contentValue": {
      "example": 12,
      "friendlyName": "contentValue"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "yCoordinate": -8232,
        "xCoordinate": 12345,
        "organizationID": "id21",
        "contentTitle": "ijdasn",
        "contentType": 1,
        "boxRelationship": "\"[231908,\"*\",219837,\"+\",9824]\"",
        "contentValue": 12,
        "id": 123,
        "createdAt": "2015-08-04T22:21:26.958Z",
        "updatedAt": "2015-08-04T22:21:26.958Z"
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
    env.sails.models.box.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_box"
};