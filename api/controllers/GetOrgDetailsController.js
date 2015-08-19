var Machine = require("machine");
module.exports = {
    'find': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // If defined
                sails.machines['4bf9c923-efd3-4077-b3e1-6b8d84d740c0_1.2.0'].ifDefined({
                    "value": (req.session.organizationID ? (req.session.organizationID + '') : '')
                }).exec({
                    "error": function(ifDefined) {
                        return exits.error({
                            data: ifDefined,
                            status: 500
                        });

                    },
                    "otherwise": function(ifDefined) {
                        return exits.respond({
                            data: "user not defined",
                            action: "respond_with_value_and_status",
                            status: 500
                        });

                    },
                    "success": function(ifDefined) {
                        // Find One Organizationacl
                        sails.machines['_project_3899_0.0.7'].findOne_organizationacl({
                            "criteria": {
                                userID: (req.session.me ? (req.session.me + '') : ''),
                                organizationID: (req.session.organizationID ? (req.session.organizationID + '') : '')
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(findOneOrganizationacl) {
                                // List Organizationacl
                                sails.machines['_project_3899_0.0.7'].find_organizationacl({
                                    "criteria": {
                                        organizationID: (req.session.organizationID ? (req.session.organizationID + '') : '')
                                    }
                                }).setEnvironment({
                                    sails: sails
                                }).exec({
                                    "success": function(listOrganizationacl) {
                                        // Pluck
                                        sails.machines['c646f5e7-9c6f-49a5-91f6-7e1eabfd1186_4.2.0'].pluck({
                                            "array": listOrganizationacl,
                                            "key": "userID"
                                        }).exec({
                                            "error": function(pluck) {
                                                return exits.error({
                                                    data: pluck,
                                                    status: 500
                                                });

                                            },
                                            "success": function(pluck) {
                                                // List User
                                                sails.machines['_project_3899_0.0.7'].find_user({
                                                    "criteria": {
                                                        id: pluck
                                                    }
                                                }).setEnvironment({
                                                    sails: sails
                                                }).exec({
                                                    "success": function(listUser) {
                                                        // Find One Organizationsubscriptions
                                                        sails.machines['_project_3899_0.0.7'].findOne_organizationsubscriptions({
                                                            "criteria": {
                                                                organizationID: (req.session.organizationID ? (req.session.organizationID + '') : '')
                                                            }
                                                        }).setEnvironment({
                                                            sails: sails
                                                        }).exec({
                                                            "success": function(findOneOrganizationsubscriptions) {
                                                                return exits.respond({
                                                                    data: {
                                                                        users: listUser,
                                                                        subscriptions: findOneOrganizationsubscriptions
                                                                    },
                                                                    action: "respond_with_value_and_status",
                                                                    status: 200
                                                                });

                                                            },
                                                            "error": function(findOneOrganizationsubscriptions) {
                                                                return exits.respond({
                                                                    data: "error finding subscription",
                                                                    action: "respond_with_value_and_status",
                                                                    status: 500
                                                                });

                                                            },
                                                            "notFound": function(findOneOrganizationsubscriptions) {
                                                                return exits.respond({
                                                                    data: "subscription not found",
                                                                    action: "respond_with_value_and_status",
                                                                    status: 500
                                                                });

                                                            }
                                                        });

                                                    },
                                                    "error": function(listUser) {
                                                        return exits.error({
                                                            data: listUser,
                                                            status: 500
                                                        });

                                                    }
                                                });

                                            }
                                        });

                                    },
                                    "error": function(listOrganizationacl) {
                                        return exits.error({
                                            data: listOrganizationacl,
                                            status: 500
                                        });

                                    }
                                });

                            },
                            "error": function(findOneOrganizationacl) {
                                return exits.respond({
                                    data: "error finding acl",
                                    action: "respond_with_value_and_status",
                                    status: 500
                                });

                            },
                            "notFound": function(findOneOrganizationacl) {
                                return exits.respond({
                                    data: {
                                        error: "permissions not valid",
                                        organizationID: (req.session.organizationID ? (req.session.organizationID + '') : ''),
                                        me: (req.session.me ? (req.session.me + '') : '')
                                    },
                                    action: "respond_with_value_and_status",
                                    status: 500
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