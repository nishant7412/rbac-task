const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const cors=require('cors')
// Middleware
app.use(bodyParser.json());
app.use(cors("*"));
// Helper function to read JSON data from files
const readJsonData = (filePath) => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// Helper function to write JSON data to files
const writeJsonData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// 1. Get Users
app.get('/api/users', (req, res) => {
  const users = readJsonData('./data/users.json');
  res.json(users);
});

// 2. Add User
app.post('/api/users', (req, res) => {
  const users = readJsonData('./data/users.json');
  const newUser = {
    id: users.length + 1,
    ...req.body
  };
  users.push(newUser);
  writeJsonData('./data/users.json', users);
  res.status(201).json(newUser);
});

// 3. Edit User
app.put('/api/users/:id', (req, res) => {
  const users = readJsonData('./data/users.json');
  const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users[userIndex] = { ...users[userIndex], ...req.body };
  writeJsonData('./data/users.json', users);
  res.json(users[userIndex]);
});

// 4. Delete User
app.delete('/api/users/:id', (req, res) => {
  const users = readJsonData('./data/users.json');
  const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  const deletedUser = users.splice(userIndex, 1);
  writeJsonData('./data/users.json', users);
  res.json(deletedUser);
});

// 5. Assign Role to User
app.put('/api/users/:id/role', (req, res) => {
  const users = readJsonData('./data/users.json');
  const roles = readJsonData('./data/roles.json');
  const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const role = roles.find(role => role.id === parseInt(req.body.roleId));
  if (!role) {
    return res.status(400).json({ message: 'Role not found' });
  }

  users[userIndex].roleId = role.id;
  writeJsonData('./data/users.json', users);
  res.json(users[userIndex]);
});

// 6. Get Roles
app.get('/api/roles', (req, res) => {
  const roles = readJsonData('./data/roles.json');
  res.json(roles);
});

// 7. Add Role
app.post('/api/roles', (req, res) => {
  const roles = readJsonData('./data/roles.json');
  const newRole = {
    id: roles.length + 1,
    ...req.body
  };
  roles.push(newRole);
  writeJsonData('./data/roles.json', roles);
  res.status(201).json(newRole);
});


// Delete Role API
app.delete('/api/roles/:id', (req, res) => {
  const roles = readJsonData('./data/roles.json');
  const { id } = req.params; // Get the role ID from the URL params

  // Find the index of the role to delete
  const roleIndex = roles.findIndex(role => role.id === parseInt(id));

  if (roleIndex !== -1) {
    // Remove the role from the array
    const deletedRole = roles.splice(roleIndex, 1);

    // Write the updated roles back to the JSON file
    writeJsonData('./data/roles.json', roles);

    // Send the deleted role as the response
    res.status(200).json({ message: 'Role deleted successfully', deletedRole: deletedRole[0] });
  } else {
    // If the role is not found
    res.status(404).json({ message: 'Role not found' });
  }
});

// 8. Edit Role
app.put('/api/roles/:id', (req, res) => {
  const roles = readJsonData('./data/roles.json');
  const roleIndex = roles.findIndex(role => role.id === parseInt(req.params.id));
  if (roleIndex === -1) {
    return res.status(404).json({ message: 'Role not found' });
  }
  roles[roleIndex] = { ...roles[roleIndex], ...req.body };
  writeJsonData('./data/roles.json', roles);
  res.json(roles[roleIndex]);
});

// 9. Get Permissions
app.get('/api/permissions', (req, res) => {
  const permissions = readJsonData('./data/permissions.json');
  res.json(permissions);
});

// 10. Add Permission to Role
app.put('/api/roles/:roleId/permissions', (req, res) => {
  const roles = readJsonData('./data/roles.json');
  const role = roles.find(role => role.id === parseInt(req.params.roleId));

  if (!role) {
    return res.status(404).json({ message: 'Role not found' });
  }

  const newPermission = req.body.permission;
  if (!role.permissions.includes(newPermission)) {
    role.permissions.push(newPermission);
    writeJsonData('./data/roles.json', roles);
  }

  res.json(role);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
