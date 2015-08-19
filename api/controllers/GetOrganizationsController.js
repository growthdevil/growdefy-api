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
                        return exits.error({
                            data: ifDefined,
                            status: 500
                        });

                    },
                    "success": function(ifDefined) {
                        // List Organizationacl
                        sails.machines['_project_3899_0.0.7'].find_organizationacl({
                            "criteria": {
                                userID: (req.session.me ? (req.session.me + '') : '')
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(listOrganizationacl) {
                                // Pluck
                                sails.machines['c646f5e7-9c6f-49a5-91f6-7e1eabfd1186_4.2.0'].pluck({
                                    "array": listOrganizationacl,
                                    "key": "organizationID"
                                }).exec({
                                    "error": function(pluck) {
                                        return exits.error({
                                            data: pluck,
                                            status: 500
                                        });

                                    },
                                    "success": function(pluck) {
                                        // List Organization
                                        sails.machines['_project_3899_0.0.7'].find_organization({
                                            "criteria": {
                                                id: pluck
                                            }
                                        }).setEnvironment({
                                            sails: sails
                                        }).exec({
                                            "success": function(listOrganization) {
                                                return exits.respond({
                                                    data: listOrganization,
                                                    action: "respond_with_result_and_status",
                                                    status: 200
                                                });

                                            },
                                            "error": function(listOrganization) {
                                                return exits.error({
                                                    data: listOrganization,
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

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};