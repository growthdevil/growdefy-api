var Machine = require("machine");
module.exports = {
    'create': function(req, res) {
        Machine.build({
            inputs: {
                "name": {
                    "example": "string",
                    "required": true
                },
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
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // If defined
                sails.machines['4bf9c923-efd3-4077-b3e1-6b8d84d740c0_1.2.0'].ifDefined({
                    "value": (req.session.me ? (req.session.me + '') : '')
                }).exec({
                    "error": function(ifDefined) {
                        return exits.respond({
                            data: "error with finding out if me is defined or not",
                            action: "respond_with_value_and_status",
                            status: 500
                        });

                    },
                    "otherwise": function(ifDefined) {
                        return exits.respond({
                            data: "me is not define",
                            action: "respond_with_value_and_status",
                            status: 500
                        });

                    },
                    "success": function(ifDefined) {
                        // Create Organization
                        sails.machines['_project_3899_0.0.7'].create_organization({
                            "name": inputs.name
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(createOrganization) {
                                // Create Organizationacl
                                sails.machines['_project_3899_0.0.7'].create_organizationacl({
                                    "userID": (req.session.me ? (req.session.me + '') : ''),
                                    "organizationID": (createOrganization && createOrganization.id),
                                    "writePermissions": true,
                                    "deletePermissions": true
                                }).setEnvironment({
                                    sails: sails
                                }).exec({
                                    "success": function(createOrganizationacl) {
                                        // Create Organizationsubscriptions
                                        sails.machines['_project_3899_0.0.7'].create_organizationsubscriptions({
                                            "organizationID": (createOrganization && createOrganization.id),
                                            "Permissions": inputs.permissions,
                                            "ActiveDate": inputs.dateExpired,
                                            "paymentToken": inputs.paymentToken
                                        }).setEnvironment({
                                            sails: sails
                                        }).exec({
                                            "success": function(createOrganizationsubscriptions) {
                                                return exits.respond({
                                                    data: createOrganizationsubscriptions,
                                                    action: "respond_with_result_and_status",
                                                    status: 200
                                                });

                                            },
                                            "error": function(createOrganizationsubscriptions) {
                                                return exits.respond({
                                                    data: "error creating subscription",
                                                    action: "respond_with_value_and_status",
                                                    status: 500
                                                });

                                            }
                                        });

                                    },
                                    "error": function(createOrganizationacl) {
                                        return exits.respond({
                                            data: "me: " + (req.session.me ? (req.session.me + '') : ''),
                                            action: "respond_with_value_and_status",
                                            status: 500
                                        });

                                    }
                                });

                            },
                            "error": function(createOrganization) {
                                return exits.respond({
                                    data: "error creating org",
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