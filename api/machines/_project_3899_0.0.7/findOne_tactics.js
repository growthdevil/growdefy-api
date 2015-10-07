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
        "segmentID": "abc123",
        "type": 2,
        "priorityArray": "[3,2,5}",
        "name": "Tactic1",
        "id": "String",
        "createdAt": "2015-10-06T22:54:08.830Z",
        "updatedAt": "2015-10-06T22:54:08.830Z"
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