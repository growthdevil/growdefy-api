var Machine = require("machine");
module.exports = {
    'create': function(req, res) {
        Machine.build({
            inputs: {
                "password": {
                    "example": "l0lcatzz",
                    "required": true
                },
                "name": {
                    "example": "someString",
                    "required": true
                },
                "username": {
                    "example": "akashKakumani",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Encrypt password
                sails.machines['e05a71f7-485d-443a-803e-029b84fe73a4_2.3.0'].encryptPassword({
                    "password": inputs.password
                }).exec({
                    "error": function(encryptPassword) {
                        return exits.respond({
                            data: "error encrypting password",
                            action: "respond_with_value_and_status",
                            status: 500
                        });

                    },
                    "success": function(encryptPassword) {
                        // Find One User
                        sails.machines['_project_3899_0.0.7'].findOne_user({
                            "criteria": {
                                username: inputs.username
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(findOneUser) {
                                return exits.respond({
                                    data: "this user already exists",
                                    action: "respond_with_value_and_status",
                                    status: "500"
                                });

                            },
                            "error": function(findOneUser) {
                                return exits.respond({
                                    action: "respond_with_status",
                                    status: 500
                                });

                            },
                            "notFound": function(findOneUser) {
                                // Create User
                                sails.machines['_project_3899_0.0.7'].create_user({
                                    "name": inputs.name,
                                    "password": encryptPassword,
                                    "username": inputs.username,
                                    "superUser": false
                                }).setEnvironment({
                                    sails: sails
                                }).exec({
                                    "success": function(createUser) {
                                        return exits.respond({
                                            data: createUser,
                                            action: "respond_with_result_and_status",
                                            status: 200
                                        });

                                    },
                                    "error": function(createUser) {
                                        return exits.error({
                                            data: createUser,
                                            status: 500
                                        });

                                    }
                                });

                            }
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};