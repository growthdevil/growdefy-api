module.exports = {
  "inputs": {
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Box instances"
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
    },
    "notFound": {
      "void": true
    }
  },
  "sync": false,
  "cacheable": false,
  "defaultExit": undefined,
  "fn": function(inputs, exits, env) {
    env.sails.models.box.findOne(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, record) {
      if (err) {
        return exits.error(err);
      }
      if (!record) {
        return exits.notFound();
      }
      return exits.success(record);
    });
  },
  "identity": "findOne_box"
};