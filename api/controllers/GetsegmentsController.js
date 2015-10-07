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
                        // List Segments
                        sails.machines['_project_3899_0.0.7'].find_segments({
                            "criteria": {
                                organizationID: (req.session.organizationID ? (req.session.organizationID + '') : '')
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(listSegments) {
                                return exits.respond({
                                    data: listSegments,
                                    action: "respond_with_result_and_status",
                                    status: 200
                                });

                            },
                            "error": function(listSegments) {
                                return exits.error({
                                    data: listSegments,
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