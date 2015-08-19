var Machine = require("machine");
module.exports = {
    'find': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Delete me
                sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.4.0'].del({
                    "key": "me"
                }).setEnvironment({
                    req: req
                }).exec({
                    "error": function(deleteMe) {
                        return exits.error({
                            data: deleteMe,
                            status: 500
                        });

                    },
                    "success": function(deleteMe) {
                        // Delete organizationID
                        sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.4.0'].del({
                            "key": "organizationID"
                        }).setEnvironment({
                            req: req
                        }).exec({
                            "error": function(deleteOrganizationID) {
                                return exits.error({
                                    data: deleteOrganizationID,
                                    status: 500
                                });

                            },
                            "success": function(deleteOrganizationID) {
                                // Delete writePermissions
                                sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.4.0'].del({
                                    "key": "writePermissions"
                                }).setEnvironment({
                                    req: req
                                }).exec({
                                    "error": function(deleteWritePermissions) {
                                        return exits.error({
                                            data: deleteWritePermissions,
                                            status: 500
                                        });

                                    },
                                    "success": function(deleteWritePermissions) {
                                        // Delete deletePermissions
                                        sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.4.0'].del({
                                            "key": "deletePermissions"
                                        }).setEnvironment({
                                            req: req
                                        }).exec({
                                            "error": function(deleteDeletePermissions) {
                                                return exits.error({
                                                    data: deleteDeletePermissions,
                                                    status: 500
                                                });

                                            },
                                            "success": function(deleteDeletePermissions) {
                                                return exits.respond({
                                                    data: "User Logged Out",
                                                    action: "respond_with_value_and_status",
                                                    status: 200
                                                });

                                            }
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