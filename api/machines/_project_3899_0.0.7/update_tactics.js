module.exports = {
  "inputs": {
    "organizationID": {
      "example": "abc123",
      "friendlyName": "organizationID",
      "required": true
    },
    "ranking": {
      "example": 2,
      "friendlyName": "ranking"
    },
    "details": {
      "example": "this tactic implies doing x and y for the z segment",
      "friendlyName": "details"
    },
    "segment": {
      "example": "Boys",
      "friendlyName": "segment",
      "required": true
    },
    "type": {
      "example": 2,
      "friendlyName": "type",
      "required": true
    },
    "priorityArray": {
      "example": "[3,2,5}",
      "friendlyName": "priorityArray"
    },
    "name": {
      "example": "Tactic1",
      "friendlyName": "name",
      "required": true
    },
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Tactics instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": [{
        "organizationID": "abc123",
        "ranking": 2,
        "details": "this tactic implies doing x and y for the z segment",
        "segment": "Boys",
        "type": 2,
        "priorityArray": "[3,2,5}",
        "name": "Tactic1",
        "id": 123,
        "createdAt": "2015-09-23T04:56:36.935Z",
        "updatedAt": "2015-09-23T04:56:36.935Z"
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
    env.sails.models.tactics.update(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "update_tactics"
};