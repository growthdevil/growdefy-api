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
      "example": {
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
    env.sails.models.segments.findOne(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, record) {
      if (err) {
        return exits.error(err);
      }
      if (!record) {
        return exits.notFound();
      }
      return exits.success(record);
    });
  },
  "identity": "findOne_segments"
};