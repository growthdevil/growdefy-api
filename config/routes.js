module.exports.routes = {
  "post /organizationtosession": {
    "target": "OrganizationtosessionController.create"
  },
  "post /createOrganization": {
    "target": "CreateOrganizationController.create"
  },
  "delete /deletegtpm": {
    "target": "DeletegtpmController.destroy"
  },
  "get /gettactics": {
    "target": "GettacticsController.find"
  },
  "put /updategtpm": {
    "target": "UpdategtpmController.update"
  },
  "put /updateBox": {
    "target": "UpdateBoxController.update"
  },
  "put /login": {
    "target": "LoginController.update"
  },
  "post /addbox": {
    "target": "AddboxController.create"
  },
  "get /getOrgDetails": {
    "target": "GetOrgDetailsController.find"
  },
  "get /logout": {
    "target": "LogoutController.find"
  },
  "get /sessionme": {
    "target": "SessionmeController.find"
  },
  "put /updatetactics": {
    "target": "UpdatetacticsController.update"
  },
  "get /getBoxes": {
    "target": "GetBoxesController.find"
  },
  "put /updateOrganization": {
    "target": "UpdateOrganizationController.update"
  },
  "get /": {
    "target": "Home$Controller.find"
  },
  "post /signUp": {
    "target": "SignUpController.create"
  },
  "delete /bootUser": {
    "target": "BootUserController.destroy"
  },
  "post /creategtpm": {
    "target": "CreategtpmController.create"
  },
  "delete /deleteOrganization": {
    "target": "DeleteOrganizationController.destroy"
  },
  "delete /deletetactic": {
    "target": "DeletetacticController.destroy"
  },
  "post /addUserToOrganization": {
    "target": "AddUserToOrganizationController.create"
  },
  "post /addtactic": {
    "target": "AddtacticController.create"
  },
  "get /getOrganizations": {
    "target": "GetOrganizationsController.find"
  },
  "get /getgtpm": {
    "target": "GetgtpmController.find"
  }
};