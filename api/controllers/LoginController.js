var Machine = require("machine");
module.exports = {
    'update': function(req, res) {
        Machine.build({
            inputs: {
                "password": {
                    "example": "l0lcatzz",
                    "required": true
                },
                "username": {
                    "example": "abc123"
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Find One User
                sails.machines['_project_3899_0.0.7'].findOne_user({
                    "criteria": {
                        username: inputs.username
                    }
                }).setEnvironment({
                    sails: sails
                }).exec({
                    "success": function(findOneUser) {
                        // Check password
                        sails.machines['e05a71f7-485d-443a-803e-029b84fe73a4_2.3.0'].checkPassword({
                            "passwordAttempt": inputs.password,
                            "encryptedPassword": (findOneUser && findOneUser.password)
                        }).exec({
                            "error": function(checkPassword) {
                                return exits.error({
                                    data: checkPassword,
                                    status: 500
                                });

                            },
                            "incorrect": function(checkPassword) {
                                return exits.respond({
                                    data: "password incorrect",
                                    action: "respond_with_value_and_status",
                                    status: 500
                                });

                            },
                            "success": function(checkPassword) {
                                // Save me to session
                                sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.4.0'].save({
                                    "key": "me",
                                    "value": (findOneUser && findOneUser.id)
                                }).setEnvironment({
                                    req: req
                                }).exec({
                                    "error": function(saveMeToSession) {
                                        return exits.error({
                                            data: saveMeToSession,
                                            status: 500
                                        });

                                    },
                                    "success": function(saveMeToSession) {
                                        // Save superuser to session
                                        sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.4.0'].save({
                                            "key": "super",
                                            "value": (findOneUser && findOneUser.superUser)
                                        }).setEnvironment({
                                            req: req
                                        }).exec({
                                            "error": function(saveSuperuserToSession) {
                                                return exits.error({
                                                    data: saveSuperuserToSession,
                                                    status: 500
                                                });

                                            },
                                            "success": function(saveSuperuserToSession) {
                                                return exits.respond({
                                                    data: findOneUser,
                                                    action: "respond_with_value_and_status",
                                                    status: 200
                                                });

                                            }
                                        });

                                    }
                                });

                            }
                        });

                    },
                    "error": function(findOneUser) {
                        return exits.respond({
                            data: null,
                            action: "respond_with_value_and_status",
                            status: 500
                        });

                    },
                    "notFound": function(findOneUser) {
                        return exits.respond({
                            data: "user DNE",
                            action: "respond_with_value_and_status",
                            status: 500
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