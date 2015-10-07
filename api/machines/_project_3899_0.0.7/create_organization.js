module.exports = {
  "inputs": {
    "name": {
      "example": "string",
      "friendlyName": "name",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "name": "string",
        "id": "String",
        "createdAt": "2015-09-30T02:02:24.757Z",
        "updatedAt": "2015-09-30T02:02:24.757Z"
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
    env.sails.models.organization.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_organization"
};