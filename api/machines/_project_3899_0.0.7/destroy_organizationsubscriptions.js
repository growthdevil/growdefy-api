module.exports = {
  "inputs": {
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
        "id": "String",
        "createdAt": "2015-09-30T02:01:36.254Z",
        "updatedAt": "2015-09-30T02:01:36.254Z"
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
    env.sails.models.organizationsubscriptions.destroy(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "destroy_organizationsubscriptions"
};