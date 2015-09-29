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
                                        // Find One Organizationsubscriptions
                                        sails.machines['_project_3899_0.0.7'].findOne_organizationsubscriptions({
                                            "criteria": {
                                                organizationID: (req.session.organizationID ? (req.session.organizationID + '') : '')
                                            }
                                        }).setEnvironment({
                                            sails: sails
                                        }).exec({
                                            "success": function(findOneOrganizationsubscriptions) {
                                                // Update Organizationsubscriptions
                                                sails.machines['_project_3899_0.0.7'].update_organizationsubscriptions({
                                                    "organizationID": (req.session.organizationID ? (req.session.organizationID + '') : ''),
                                                    "Permissions": inputs.permissions,
                                                    "ActiveDate": inputs.dateExpired,
                                                    "paymentToken": inputs.paymentToken,
                                                    "criteria": {
                                                        id: (findOneOrganizationsubscriptions && findOneOrganizationsubscriptions.id)
                                                    }
                                                }).setEnvironment({
                                                    sails: sails
                                                }).exec({
                                                    "success": function(updateOrganizationsubscriptions) {
                                                        // Update Organization
                                                        sails.machines['_project_3899_0.0.7'].update_organization({
                                                            "name": inputs.name,
                                                            "criteria": {
                                                                id: (req.session.organizationID ? (req.session.organizationID + '') : '')
                                                            }
                                                        }).setEnvironment({
                                                            sails: sails
                                                        }).exec({
                                                            "success": function(updateOrganization) {
                                                                return exits.respond({
                                                                    data: "error update",
                                                                    action: "respond_with_value_and_status",
                                                                    status: 200
                                                                });

                                                            },
                                                            "error": function(updateOrganization) {
                                                                return exits.error({
                                                                    data: updateOrganization,
                                                                    status: 500
                                                                });

                                                            }
                                                        });

                                                    },
                                                    "error": function(updateOrganizationsubscriptions) {
                                                        return exits.respond({
                                                            data: "error updating",
                                                            action: "respond_with_value_and_status",
                                                            status: 500
                                                        });

                                                    }
                                                });

                                            },
                                            "error": function(findOneOrganizationsubscriptions) {
                                                return exits.error({
                                                    data: findOneOrganizationsubscriptions,
                                                    status: 500
                                                });

                                            },
                                            "notFound": function(findOneOrganizationsubscriptions) {
                                                return exits.respond({
                                                    data: "not found subscription",
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