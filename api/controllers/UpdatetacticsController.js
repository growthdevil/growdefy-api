var Machine = require("machine");
module.exports = {
    'update': function(req, res) {
        Machine.build({
            inputs: {
                "ranking": {
                    "example": 2
                },
                "priorityArray": {
                    "example": "[3,2,5}"
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
                },
                "id": {
                    "example": "abc123"
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
                                        // Update Tactics
                                        sails.machines['_project_3899_0.0.7'].update_tactics({
                                            "ranking": inputs.ranking,
                                            "organizationID": (req.session.organizationID ? (req.session.organizationID + '') : ''),
                                            "details": inputs.details,
                                            "segment": inputs.segment,
                                            "type": inputs.type,
                                            "priorityArray": inputs.priorityArray,
                                            "name": inputs.name,
                                            "criteria": {
                                                id: inputs.id
                                            }
                                        }).setEnvironment({
                                            sails: sails
                                        }).exec({
                                            "success": function(updateTactics) {
                                                return exits.respond({
                                                    data: updateTactics,
                                                    action: "respond_with_result_and_status",
                                                    status: 200
                                                });

                                            },
                                            "error": function(updateTactics) {
                                                return exits.error({
                                                    data: updateTactics,
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