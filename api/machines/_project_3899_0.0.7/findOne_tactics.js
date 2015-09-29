module.exports = {
  "inputs": {
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Tactics instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
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
    env.sails.models.tactics.findOne(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, record) {
      if (err) {
        return exits.error(err);
      }
      if (!record) {
        return exits.notFound();
      }
      return exits.success(record);
    });
  },
  "identity": "findOne_tactics"
};