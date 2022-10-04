const allRoles = {
  user: ['user'],
  superUser: ['user', 'superUser'],
  admin: ['user', 'superUser', 'admin'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
