module.exports = {
  "inputs": {
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Vpc instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "roles": "[{ title:\"someTitle\", segments:[segment1, segment2] },{title:\"someTitle\", segments:[segment1, segment2]}]",
        "id": 123,
        "createdAt": "2015-10-06T23:29:28.826Z",
        "updatedAt": "2015-10-06T23:29:28.826Z"
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
    env.sails.models.vpc.findOne(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, record) {
      if (err) {
        return exits.error(err);
      }
      if (!record) {
        return exits.notFound();
      }
      return exits.success(record);
    });
  },
  "identity": "findOne_vpc"
};