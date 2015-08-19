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
      "example": {
        "organizationID": "abc123",
        "Permissions": "[1,2]",
        "ActiveDate": "2012-11-04 14:55:45",
        "paymentToken": "dDh5ank214Js123",
        "id": 123,
        "createdAt": "2015-08-11T22:17:17.919Z",
        "updatedAt": "2015-08-11T22:17:17.919Z"
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
    env.sails.models.organizationsubscriptions.findOne(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, record) {
      if (err) {
        return exits.error(err);
      }
      if (!record) {
        return exits.notFound();
      }
      return exits.success(record);
    });
  },
  "identity": "findOne_organizationsubscriptions"
};