var Machine = require("machine");
module.exports = {
    'update': function(req, res) {
        Machine.build({
            inputs: {
                "yCoordinate": {
                    "example": -8232,
                    "required": true
                },
                "xCoordinate": {
                    "example": 12345,
                    "required": true
                },
                "contentTitle": {
                    "example": "ijdasn",
                    "required": true
                },
                "contentType": {
                    "example": 1
                },
                "boxRelationship": {
                    "example": "\"[231908,\"*\",219837,\"+\",9824]\""
                },
                "contentValue": {
                    "example": 12
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