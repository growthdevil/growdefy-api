var Machine = require("machine");
module.exports = {
    'update': function(req, res) {
        Machine.build({
            inputs: {
                "permissions": {
                    "example": "[1,2]",
                    "required": true
                },
                "dateExpired": {
                    "example": "2012-11-04 14:55:45",
                    "required": true
                },
                "paymentToken": {
                    "example": "dDh5ank214Js123",
                    "required": true
                },
                "name": {
                    "example": "string",
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