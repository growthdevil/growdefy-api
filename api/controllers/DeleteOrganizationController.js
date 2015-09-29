var Machine = require("machine");
module.exports = {
    'destroy': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // true as string
                sails.machines['03558d7e-53ad-4e20-b03f-ddd54c34ce3c_4.2.0'].construct({
                    "value": true
                }).exec({
                    "error": function(trueAsString) {
                        return exits.error({
                            data: trueAsString,
                            status: 500
                        });

                    },
                    "success": function(trueAsString) {
                        // check if super user
                        sails.machines['4bf9c923-efd3-4077-b3e1-6b8d84d740c0_1.2.0'].ifEqual({
                            "a": (req.session['super'] ? (req.session['super'] + '') : ''),
                            "b": trueAsString
                        }).exec({
                            "error": function(checkIfSuperUser) {
                                return exits.error({
                                    data: checkIfSuperUser,
                                    status: 500
                                });

                            },
                            "otherwise": function(checkIfSuperUser) {
                                // if permissions string equals true string
                                sails.machines['4bf9c923-efd3-4077-b3e1-6b8d84d740c0_1.2.0'].ifEqual({
                                    "a": (req.session.deletePermissions ? (req.session.deletePermissions + '') : ''),
                                    "b": trueAsString
                                }).exec({
                                    "error": function(ifPermissionsStringEqualsTrueString) {
                                        return exits.error({
                                            data: ifPermissionsStringEqualsTrueString,
                                            status: 500
                                        });

                                    },
                                    "otherwise": function(ifPermissionsStringEqualsTrueString) {
                                        return exits.error({
                                            data: ifPermissionsStringEqualsTrueString,
                                            status: 500
                                        });

                                    },
                                    "success": function(ifPermissionsStringEqualsTrueString) {
                                        // Find One Organizationacl
                                        sails.machines['_project_3899_0.0.7'].findOne_organizationacl({
                                            "criteria": {
                                                organizationID: (req.session.organizationID ? (req.session.organizationID + '') : ''),
                                                userID: (req.session.me ? (req.session.me + '') : '')
                                            }
                                        }).setEnvironment({
                                            sails: sails
                                        }).exec({
                                            "success": function(findOneOrganizationacl) {
                                                // Destroy Organizationacl
                                                sails.machines['_project_3899_0.0.7'].destroy_organizationacl({
                                                    "criteria": {
                                                        organizationID: (req.session.organizationID ? (req.session.organizationID + '') : '')
                                                    }
                                                }).setEnvironment({
                                                    sails: sails
                                                }).exec({
                                                    "success": function(destroyOrganizationacl) {
                                                        // Destroy all associated boxes
                                                        sails.machines['_project_3899_0.0.7'].destroy_box({
                                                            "criteria": {
                                                                organizationID: (req.session.organizationID ? (req.session.organizationID + '') : '')
                                                            }
                                                        }).setEnvironment({
                                                            sails: sails
                                                        }).exec({
                                                            "success": function(destroyAllAssociatedBoxes) {
                                                                // Destroy Organization
                                                                sails.machines['_project_3899_0.0.7'].destroy_organization({
                                                                    "criteria": {
                                                                        organizationID: (req.session.organizationID ? (req.session.organizationID + '') : '')
                                                                    }
                                                                }).setEnvironment({
                                                                    sails: sails
                                                                }).exec({
                                                                    "success": function(destroyOrganization) {
                                                                        // Destroy Organizationsubscriptions
                                                                        sails.machines['_project_3899_0.0.7'].destroy_organizationsubscriptions({
                                                                            "criteria": {
                                                                                organizationID: (findOneOrganizationacl && findOneOrganizationacl.organizationID)
                                                                            }
                                                                        }).setEnvironment({
                                                                            sails: sails
                                                                        }).exec({
                                                                            "success": function(destroyOrganizationsubscriptions) {
                                                                                return exits.respond({
                                                                                    data: "success! all organizations deleted",
                                                                                    action: "respond_with_value_and_status",
                                                                                    status: 200
                                                                                });

                                                                            },
                                                                            "error": function(destroyOrganizationsubscriptions) {
                                                                                return exits.error({
                                                                                    data: destroyOrganizationsubscriptions,
                                                                                    status: 500
                                                                                });

                                                                            }
                                                                        });

                                                                    },
                                                                    "error": function(destroyOrganization) {
                                                                        return exits.error({
                                                                            data: destroyOrganization,
                                                                            status: 500
                                                                        });

                                                                    }
                                                                });

                                                            },
                                                            "error": function(destroyAllAssociatedBoxes) {
                                                                return exits.respond({
                                                                    data: "failure destroying boxes",
                                                                    action: "respond_with_value_and_status",
                                                                    status: 500
                                                                });

                                                            }
                                                        });

                                                    },
                                                    "error": function(destroyOrganizationacl) {
                                                        return exits.respond({
                                                            data: "failure destroying organizationacl",
                                                            action: "respond_with_value_and_status",
                                                            status: 500
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
                                                return exits.respond({
                                                    data: "resource not found",
                                                    action: "respond_with_value_and_status",
                                                    status: 500
                                                });

                                            }
                                        });

                                    }
                                });

                            },
                            "success": function(checkIfSuperUser) {
                                return exits.error({
                                    data: checkIfSuperUser,
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