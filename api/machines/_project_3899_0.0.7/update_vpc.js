module.exports = {
  "inputs": {
    "roles": {
      "example": "[{ title:\"someTitle\", segments:[segment1, segment2] },{title:\"someTitle\", segments:[segment1, segment2]}]",
      "friendlyName": "roles",
      "required": true
    },
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Vpc instances"
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
    env.sails.models.vpc.update(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "update_vpc"
};