module.exports = {
  "inputs": {
    "userID": {
      "example": "abc123",
      "friendlyName": "userID",
      "required": true
    },
    "organizationID": {
      "example": "abc123",
      "friendlyName": "organizationID",
      "required": true
    },
    "deletePermissions": {
      "example": true,
      "friendlyName": "deletePermissions",
      "required": true
    },
    "writePermissions": {
      "example": true,
      "friendlyName": "writePermissions",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "userID": "abc123",
        "organizationID": "abc123",
        "deletePermissions": true,
        "writePermissions": true,
        "id": "String",
        "createdAt": "2015-09-30T02:01:51.797Z",
        "updatedAt": "2015-09-30T02:01:51.797Z"
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
    env.sails.models.organizationacl.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_organizationacl"
};