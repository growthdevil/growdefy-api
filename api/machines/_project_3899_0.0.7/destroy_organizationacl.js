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
      "example": [{
        "userID": "abc123",
        "organizationID": "abc123",
        "writePermissions": true,
        "deletePermissions": true,
        "id": 123,
        "createdAt": "2015-08-04T08:38:42.794Z",
        "updatedAt": "2015-08-04T08:38:42.794Z"
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
    env.sails.models.organizationacl.destroy(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "destroy_organizationacl"
};