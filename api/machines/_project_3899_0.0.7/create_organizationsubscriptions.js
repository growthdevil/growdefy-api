module.exports = {
  "inputs": {
    "organizationID": {
      "example": "abc123",
      "friendlyName": "organizationID",
      "required": true
    },
    "Permissions": {
      "example": "[1,2]",
      "friendlyName": "Permissions",
      "required": true
    },
    "ActiveDate": {
      "example": "2012-11-04 14:55:45",
      "friendlyName": "ActiveDate",
      "required": true
    },
    "paymentToken": {
      "example": "dDh5ank214Js123",
      "friendlyName": "paymentToken",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "organizationID": "abc123",
        "Permissions": "[1,2]",
        "ActiveDate": "2012-11-04 14:55:45",
        "paymentToken": "dDh5ank214Js123",
        "id": "String",
        "createdAt": "2015-09-30T02:01:36.254Z",
        "updatedAt": "2015-09-30T02:01:36.254Z"
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
    env.sails.models.organizationsubscriptions.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_organizationsubscriptions"
};