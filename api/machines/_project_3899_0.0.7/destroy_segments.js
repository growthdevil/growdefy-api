module.exports = {
  "inputs": {
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Segments instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": [{
        "name": "boys",
        "organizationID": "abc123",
        "ranking": 59,
        "priorityArray": "[1,2,3]",
        "description": "Long description.",
        "marketSize": 100000,
        "colour": "#000000",
        "status": 1,
        "id": "abc123",
        "createdAt": "2015-10-07T02:05:29.509Z",
        "updatedAt": "2015-10-07T02:05:29.509Z"
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
    env.sails.models.segments.destroy(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "destroy_segments"
};