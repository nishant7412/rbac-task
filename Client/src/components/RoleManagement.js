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
  Box,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [editingRole, setEditingRole] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = () => {
    axios
      .get('http://localhost:8080/api/roles')
      .then((response) => setRoles(response.data))
      .catch((error) => console.error(error));
  };

  // const handleAddRole = () => {
  //   axios
  //     .post('http://localhost:8080/api/roles', newRole)
  //     .then((response) => {
  //       setRoles([...roles, response.data]);
  //       setNewRole({ name: '', permissions: [] });
  //     })
  //     .catch((error) => console.error(error));
  // };
  const handleAddRole = () => {
    // Validation to ensure all fields are filled
    if (!newRole.name || newRole.permissions.length === 0) {
      alert('Please fill in all fields before adding a role.');
      return;
    }
  
    axios
      .post('http://localhost:8080/api/roles', newRole)
      .then((response) => {
        setRoles([...roles, response.data]);
        setNewRole({ name: '', permissions: [] }); // Reset the form
      })
      .catch((error) => console.error(error));
  };
  
  const handleEditRole = (role) => {
    setEditingRole(role);
    setOpenModal(true);
  };

  const handleSaveRole = () => {
    axios
      .put(`http://localhost:8080/api/roles/${editingRole.id}`, editingRole)
      .then((response) => {
        setRoles(
          roles.map((role) => (role.id === editingRole.id ? response.data : role))
        );
        setOpenModal(false);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteRole = (id) => {
    axios
      .delete(`http://localhost:8080/api/roles/${id}`)
      .then(() => fetchRoles())
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
            color: '#1976d2',
            fontSize: '2.5rem',
            letterSpacing: '1px',
            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)',
            marginBottom: '20px',
          }}
        >
          Role Management
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: '300',
            color: '#5f6368',
            fontSize: '1.2rem',
            letterSpacing: '0.5px',
            lineHeight: '1.6',
            textTransform: 'capitalize',
            marginBottom: '40px',
          }}
        >
          Manage your roles by adding, editing, and organizing permissions.
        </Typography>
      </div>

      {/* Add Role Form */}
      <Card
        variant="outlined"
        sx={{
          margin: '0 auto',
          marginBottom: '20px',
          padding: '20px',
          borderRadius: '15px',
          maxWidth: '500px',
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
          Add New Role
        </Typography>
        <div>
          <TextField
            label="Role Name"
            variant="outlined"
            size="small"
            sx={{ marginBottom: '15px', width: '100%' }}
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
          />
          <TextField
            label="Permissions (comma separated)"
            variant="outlined"
            size="small"
            sx={{ marginBottom: '15px', width: '100%' }}
            value={newRole.permissions.join(', ')}
            onChange={(e) =>
              setNewRole({
                ...newRole,
                permissions: e.target.value.split(',').map((p) => p.trim()),
              })
            }
          />
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleAddRole}
            sx={{
              textTransform: 'none',
              padding: '10px 20px',
              borderRadius: '10px',
              backgroundColor: '#1976d2',
              ':hover': { backgroundColor: '#1565c0' },
              fontWeight: 'bold',
            }}
          >
            Add Role
          </Button>
        </div>
      </Card>

      {/* Role List */}
      <Grid container spacing={2}>
        {roles.map((role) => (
          <Grid item xs={12} sm={6} md={4} key={role.id}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
              }}
            >
              <CardContent>
                <Typography variant="h6" textAlign="center">
                  {role.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Permissions: {role.permissions.join(', ')}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <IconButton color="primary" onClick={() => handleEditRole(role)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteRole(role.id)}
                  title="Delete"
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Role Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Edit Role
          </Typography>
          <TextField
            fullWidth
            label="Role Name"
            value={editingRole?.name}
            onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Permissions"
            value={editingRole?.permissions.join(', ')}
            onChange={(e) =>
              setEditingRole({
                ...editingRole,
                permissions: e.target.value.split(',').map((p) => p.trim()),
              })
            }
            margin="normal"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: '10px' }}
            onClick={handleSaveRole}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default RoleManagement;
