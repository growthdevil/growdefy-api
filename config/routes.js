module.exports.routes = {
  "post /addsegment": {
    "target": "AddsegmentController.create"
  },
  "post /organizationtosession": {
    "target": "OrganizationtosessionController.create"
  },
  "get /getBoxes": {
    "target": "GetBoxesController.find"
  },
  "post /addtactic": {
    "target": "AddtacticController.create"
  },
  "put /updateBox": {
    "target": "UpdateBoxController.update"
  },
  "put /updategtpm": {
    "target": "UpdategtpmController.update"
  },
  "post /creategtpm": {
    "target": "CreategtpmController.create"
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
  "get /getgtpm": {
    "target": "GetgtpmController.find"
  },
  "put /login": {
    "target": "LoginController.update"
  },
  "get /getOrgDetails": {
    "target": "GetOrgDetailsController.find"
  },
  "post /addbox": {
    "target": "AddboxController.create"
  },
  "delete /deleteOrganization": {
    "target": "DeleteOrganizationController.destroy"
  },
  "get /logout": {
    "target": "LogoutController.find"
  },
  "put /updatetactics": {
    "target": "UpdatetacticsController.update"
  },
  "get /sessionme": {
    "target": "SessionmeController.find"
  },
  "get /getsegments": {
    "target": "GetsegmentsController.find"
  },
  "get /": {
    "target": "Home$Controller.find"
  },
  "put /archivesegment": {
    "target": "ArchivesegmentController.update"
  },
  "delete /bootUser": {
    "target": "BootUserController.destroy"
  },
  "post /signUp": {
    "target": "SignUpController.create"
  },
  "post /addUserToOrganization": {
    "target": "AddUserToOrganizationController.create"
  },
  "put /updateOrganization": {
    "target": "UpdateOrganizationController.update"
  },
  "get /getOrganizations": {
    "target": "GetOrganizationsController.find"
  },
  "delete /deletetactic": {
    "target": "DeletetacticController.destroy"
  }
};