module.exports = {
  "inputs": {
    "name": {
      "example": "someString",
      "friendlyName": "name",
      "required": true
    },
    "password": {
      "example": "abc123",
      "friendlyName": "password",
      "required": true
    },
    "username": {
      "example": "akashKakumani",
      "friendlyName": "username",
      "required": true
    },
    "superUser": {
      "example": false,
      "friendlyName": "superUser",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "name": "someString",
        "password": "abc123",
        "username": "akashKakumani",
        "superUser": false,
        "id": 123,
        "createdAt": "2015-08-19T01:31:51.956Z",
        "updatedAt": "2015-08-19T01:31:51.956Z"
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
    env.sails.models.user.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_user"
};