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
        "id": 123,
        "createdAt": "2015-08-04T08:30:14.216Z",
        "updatedAt": "2015-08-04T08:30:14.216Z"
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