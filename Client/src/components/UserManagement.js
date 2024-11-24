import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Modal,
  IconButton,
  Box,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', status: 'Active', roleId: 1 });
  const [editingUser, setEditingUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get('http://localhost:8080/api/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  };

  // const handleAddUser = () => {
  //   axios
  //     .post('http://localhost:8080/api/users', newUser)
  //     .then((response) => {
  //       setUsers([...users, response.data]);
  //       setNewUser({ name: '', email: '', status: 'Active', roleId: 1 });
  //     })
  //     .catch((error) => console.error(error));
  // };
  const handleAddUser = () => {
    // Validation to check if fields are empty
    if (!newUser.name || !newUser.email || !newUser.status || !newUser.roleId) {
      alert('Please fill in all fields before adding a user.');
      return;
    }
  
    axios
      .post('http://localhost:8080/api/users', newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setNewUser({ name: '', email: '', status: 'Active', roleId: 1 }); // Reset the form
      })
      .catch((error) => console.error(error));
  };
  
  const handleEditUser = (user) => {
    setEditingUser(user);
    setOpenModal(true);
  };

  const handleSaveUser = () => {
    axios
      .put(`http://localhost:8080/api/users/${editingUser.id}`, editingUser)
      .then((response) => {
        setUsers(users.map((user) => (user.id === editingUser.id ? response.data : user)));
        setOpenModal(false);
      })
      .catch((error) => console.error(error));
  };

  // const handleDeleteUser = (id) => {
  //   axios
  //     .delete(`http://localhost:8080/api/users/${id}`)
  //     .then(() => fetchUsers())
  //     .catch((error) => console.error(error));
  // };
  const handleDeleteUser = (id) => {
    // Confirmation alert
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) {
      return; // Exit if the user cancels the action
    }
  
    // Proceed with deletion if confirmed
    axios
      .delete(`http://localhost:8080/api/users/${id}`)
      .then(() => fetchUsers())
      .catch((error) => console.error(error));
  };
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '15px',
    p: 4,
    width: '400px',
  };

  return (
    <div style={{ background: '#f4f6f9', minHeight: '100vh', padding: '20px' }}>
      {/* Banner Section */}
      <div
        style={{
          backgroundImage: 'url(https://source.unsplash.com/random/1600x400/?technology)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          textAlign: 'center',
          borderRadius: '8px',
          marginBottom: '20px',
          padding: '40px 0',
        }}
      >
      <Typography
  variant="h4"
  component="h1"
  gutterBottom
  sx={{
    fontWeight: 'bold',
    color: '#1976d2', // Bright color to match the theme
    fontSize: '2.5rem', // Larger font size for prominence
    letterSpacing: '1px', // Slight letter spacing for a polished look
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)', // Soft shadow for depth
    marginBottom: '20px',
  }}
>
  User Management
</Typography>

<Typography
  variant="subtitle1"
  sx={{
    fontWeight: '300', // Lighter weight for contrast
    color: '#5f6368', // Soft dark gray for readability
    fontSize: '1.2rem',
    letterSpacing: '0.5px', // Light letter spacing for clarity
    lineHeight: '1.6', // Increased line height for better readability
    textTransform: 'capitalize', // For a polished and clean look
    marginBottom: '40px', // More spacing to separate from other sections
  }}
>
  Manage your team effectively by adding, editing, and organizing users.
</Typography>

      </div>

      {/* Add User Form */}
      <Card
        variant="outlined"
        sx={{
          margin: '0 auto', // Center the card
          marginBottom: '20px',
          padding: '20px',
          borderRadius: '15px',
          maxWidth: '500px', // Restrict the width
          textAlign: 'center',
          background: 'linear-gradient(to right, #e0eafc, #f8f9fa)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: '15px',
            color: '#1976d2',
            fontWeight: 'bold',
          }}
        >
          Add New User
        </Typography>
        <div>
          <TextField
            label="Name"
            variant="outlined"
            size="small"
            sx={{ marginRight: '10px', marginBottom: '15px', width: '45%' }}
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            sx={{ marginBottom: '15px', width: '45%' }}
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            label="Status"
            variant="outlined"
            size="small"
            sx={{ marginRight: '10px', marginBottom: '15px', width: '45%' }}
            value={newUser.status}
            onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
          />
          <TextField
            label="Role ID"
            variant="outlined"
            size="small"
            sx={{ marginBottom: '15px', width: '45%' }}
            value={newUser.roleId}
            onChange={(e) => setNewUser({ ...newUser, roleId: Number(e.target.value) })}
          />
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleAddUser}
            sx={{
              textTransform: 'none',
              padding: '10px 20px',
              borderRadius: '10px',
              backgroundColor: '#1976d2',
              ':hover': { backgroundColor: '#1565c0' },
              fontWeight: 'bold',
            }}
          >
            Add User
          </Button>
        </div>
      </Card>

      {/* User List */}
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
              <CardContent>
                <Avatar
                  sx={{ width: 60, height: 60, margin: 'auto', marginBottom: '10px' }}
                  alt={user.name}
                  src={`https://ui-avatars.com/api/?name=${user.name}`}
                />
                <Typography variant="h6" textAlign="center">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Status: {user.status}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <IconButton color="primary" onClick={() => handleEditUser(user)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteUser(user.id)}
                  title="Delete"
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit User Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Edit User
          </Typography>
          <TextField
            fullWidth
            label="Name"
            value={editingUser?.name}
            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            value={editingUser?.email}
            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
            margin="normal"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: '10px' }}
            onClick={handleSaveUser}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UserManagement;
