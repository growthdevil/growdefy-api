var Machine = require("machine");
module.exports = {
    'update': function(req, res) {
        Machine.build({
            inputs: {
                "ranking": {
                    "example": 2
                },
                "priorityArray": {
                    "example": "[3,2,5}"
                },
                "details": {
                    "example": "this tactic implies doing x and y for the z segment"
                },
                "segment": {
                    "example": "Boys",
                    "required": true
                },
                "type": {
                    "example": 2,
                    "required": true
                },
                "name": {
                    "example": "Tactic1",
                    "required": true
                },
                "id": {
                    "example": "abc123"
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                return exits.respond({
                    action: 'compiler_error'
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};