module.exports = {
  "inputs": {
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Vpc instances"
    },
    "limit": {
      "friendlyName": "limit",
      "example": 123,
      "description": "The maximum number of records to return"
    },
    "skip": {
      "friendlyName": "skip",
      "example": 123,
      "description": "The number of records to skip in the result"
    },
    "sort": {
      "friendlyName": "sort",
      "typeclass": "dictionary",
      "description": "Sort options for results, as a dictionary where the keys are attribute names and values are 1 (ascending) or 0 (descending)"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": [{
        "roles": "[{ title:\"someTitle\", segments:[segment1, segment2] },{title:\"someTitle\", segments:[segment1, segment2]}]",
        "id": 123,
        "createdAt": "2015-10-06T23:29:28.826Z",
        "updatedAt": "2015-10-06T23:29:28.826Z"
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
    var query = env.sails.models.vpc.find(env.sails.util.objCompact(inputs.criteria));
    if (inputs.skip) {
      query = query.skip(inputs.skip);
    }
    if (inputs.limit) {
      query = query.limit(inputs.limit);
    }
    if (inputs.sort) {
      query = query.sort(inputs.sort);
    }
    query.exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "find_vpc"
};