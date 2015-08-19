module.exports = {
  "inputs": {
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Organizationacl instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "userID": "abc123",
        "organizationID": "abc123",
        "writePermissions": true,
        "deletePermissions": true,
        "id": 123,
        "createdAt": "2015-08-04T08:38:42.794Z",
        "updatedAt": "2015-08-04T08:38:42.794Z"
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
    env.sails.models.organizationacl.findOne(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, record) {
      if (err) {
        return exits.error(err);
      }
      if (!record) {
        return exits.notFound();
      }
      return exits.success(record);
    });
  },
  "identity": "findOne_organizationacl"
};