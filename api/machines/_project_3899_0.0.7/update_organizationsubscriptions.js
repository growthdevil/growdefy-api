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
    },
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Organizationsubscriptions instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": [{
        "organizationID": "abc123",
        "Permissions": "[1,2]",
        "ActiveDate": "2012-11-04 14:55:45",
        "paymentToken": "dDh5ank214Js123",
        "id": 123,
        "createdAt": "2015-08-11T22:17:17.919Z",
        "updatedAt": "2015-08-11T22:17:17.919Z"
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
    env.sails.models.organizationsubscriptions.update(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "update_organizationsubscriptions"
};