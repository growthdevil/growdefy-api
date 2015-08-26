module.exports.routes = {
  "get /": {
    "target": "Home$Controller.find"
  },
  "post /createOrganization": {
    "target": "CreateOrganizationController.create"
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
  "get /sessionme": {
    "target": "SessionmeController.find"
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
  "get /logout": {
    "target": "LogoutController.find"
  },
  "post /organizationtosession": {
    "target": "OrganizationtosessionController.create"
  },
  "post /signUp": {
    "target": "SignUpController.create"
  },
  "put /login": {
    "target": "LoginController.update"
  },
  "delete /bootUser": {
    "target": "BootUserController.destroy"
  }
};