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
                                    "a": false,
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
                                            "a": (req.session.writePermissions ? (req.session.writePermissions + '') : ''),
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
                                                // Create Tactics
                                                sails.machines['_project_3899_0.0.7'].create_tactics({
                                                    "ranking": inputs.ranking,
                                                    "organizationID": (req.session.organizationID ? (req.session.organizationID + '') : ''),
                                                    "details": inputs.details,
                                                    "segment": inputs.segment,
                                                    "type": inputs.type,
                                                    "priorityArray": inputs.priorityArray,
                                                    "name": inputs.name
                                                }).setEnvironment({
                                                    sails: sails
                                                }).exec({
                                                    "success": function(createTactics) {
                                                        return exits.respond({
                                                            data: createTactics,
                                                            action: "respond_with_result_and_status",
                                                            status: 200
                                                        });

                                                    },
                                                    "error": function(createTactics) {
                                                        return exits.error({
                                                            data: createTactics,
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
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};