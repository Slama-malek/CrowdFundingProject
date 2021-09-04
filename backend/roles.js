const AccessControl = require("accesscontrol");
const ac = new AccessControl();
exports.roles = (function() {
    ac.grant("user")
     .readOwn("project")
     
     
    ac.grant("manager")
     .extend("user")
     .readAny("project")
     .createOwn('project')
     
    
     
    return ac;
    })();