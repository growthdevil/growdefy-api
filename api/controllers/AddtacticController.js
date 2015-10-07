var Machine = require("machine");
module.exports = {
    'create': function(req, res) {
        Machine.build({
            inputs: {
                "priorityArray": {
                    "example": "[3,2,5}"
                },
                "ranking": {
                    "example": 2
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