var Machine = require("machine");
module.exports = {
    'create': function(req, res) {
        Machine.build({
            inputs: {
                "organizationID": {
                    "example": "abc123",
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
                        return exits.error({
                            data: ifDefined,
                            status: 500
                        });

                    },
                    "otherwise": function(ifDefined) {
                        return exits.error({
                            data: ifDefined,
                            status: 500
                        });

                    },
                    "success": function(ifDefined) {
                        // Find One Organizationacl
                        sails.machines['_project_3899_0.0.7'].findOne_organizationacl({
                            "criteria": {
                                userID: (req.session.me ? (req.session.me + '') : ''),
                                organizationID: inputs.organizationID
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(findOneOrganizationacl) {
                                // Save organizationID to session
                                sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.4.0'].save({
                                    "key": "organizationID",
                                    "value": inputs.organizationID
                                }).setEnvironment({
                                    req: req
                                }).exec({
                                    "error": function(saveOrganizationIDToSession) {
                                        return exits.error({
                                            data: saveOrganizationIDToSession,
                                            status: 500
                                        });

                                    },
                                    "success": function(saveOrganizationIDToSession) {
                                        // Save writePermissions session
                                        sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.4.0'].save({
                                            "key": "writePermissions",
                                            "value": (findOneOrganizationacl && findOneOrganizationacl.writePermissions)
                                        }).setEnvironment({
                                            req: req
                                        }).exec({
                                            "error": function(saveWritePermissionsSession) {
                                                return exits.error({
                                                    data: saveWritePermissionsSession,
                                                    status: 500
                                                });

                                            },
                                            "success": function(saveWritePermissionsSession) {
                                                // Save deletePermissions to session
                                                sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.4.0'].save({
                                                    "key": "deletePermissions",
                                                    "value": (findOneOrganizationacl && findOneOrganizationacl.deletePermissions)
                                                }).setEnvironment({
                                                    req: req
                                                }).exec({
                                                    "error": function(saveDeletePermissionsToSession) {
                                                        return exits.error({
                                                            data: saveDeletePermissionsToSession,
                                                            status: 500
                                                        });

                                                    },
                                                    "success": function(saveDeletePermissionsToSession) {
                                                        return exits.respond({
                                                            data: "success",
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
                            "error": function(findOneOrganizationacl) {
                                return exits.error({
                                    data: findOneOrganizationacl,
                                    status: 500
                                });

                            },
                            "notFound": function(findOneOrganizationacl) {
                                return exits.error({
                                    data: findOneOrganizationacl,
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