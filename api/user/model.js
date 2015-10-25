import config from "../../config";
import thinky from "../thinky";

const r = thinky.r;
const type = thinky.type;

const User = thinky.createModel('User', {
  id: type.string(),
  firstName: type.string(),
  lastName: type.string(),
  displayName: type.string().default(function() {
    return this.firstName + ' ' + this.lastName;
  }),
  email: type.string(),
  website: type.string(),
  createdAt: type.date().default(function() { return Date.now(); }),
  updatedAt: type.date().default(function() { return Date.now(); })
});

User.ensureIndex("firstName");
User.on("saved", function() {
  this.updatedAt = Date.now();
});

export default User;
