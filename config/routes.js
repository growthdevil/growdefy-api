module.exports.routes = {
  "post /signUp": {
    "target": "SignUpController.create"
  },
  "post /addbox": {
    "target": "AddboxController.create"
  },
  "put /updateOrganization": {
    "target": "UpdateOrganizationController.update"
  },
  "put /updateBox": {
    "target": "UpdateBoxController.update"
  },
  "post /createOrganization": {
    "target": "CreateOrganizationController.create"
  },
  "get /getOrgDetails": {
    "target": "GetOrgDetailsController.find"
  },
  "delete /deleteOrganization": {
    "target": "DeleteOrganizationController.destroy"
  },
  "post /addUserToOrganization": {
    "target": "AddUserToOrganizationController.create"
  },
  "get /getBoxes": {
    "target": "GetBoxesController.find"
  },
  "get /getOrganizations": {
    "target": "GetOrganizationsController.find"
  },
  "get /sessionme": {
    "target": "SessionmeController.find"
  },
  "post /organizationtosession": {
    "target": "OrganizationtosessionController.create"
  },
  "get /logout": {
    "target": "LogoutController.find"
  },
  "put /login": {
    "target": "LoginController.update"
  },
  "delete /bootUser": {
    "target": "BootUserController.destroy"
  }
};