import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  Box,
  Modal,
} from '@mui/material';

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([]);
  const [newPermission, setNewPermission] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [editingPermission, setEditingPermission] = useState(null);

  // Fetch permissions from the backend
  useEffect(() => {
    fetchPermissions();
  }, []);

  // Fetch Permissions
  const fetchPermissions = () => {
    axios
      .get('http://localhost:8080/api/permissions')
      .then((response) => setPermissions(response.data))
      .catch((error) => console.error(error));
  };

  // Add a new permission
  const handleAddPermission = () => {
    if (newPermission) {
      axios
        .post('http://localhost:8080/api/permissions', { name: newPermission })
        .then(() => {
          setNewPermission(''); // Clear the input field
          fetchPermissions(); // Re-fetch the permissions after adding
        })
        .catch((error) => console.error(error));
    }
  };

  // Edit a permission
  const handleEditPermission = (permission) => {
    setEditingPermission(permission);
    setOpenModal(true);
  };

  // Save edited permission
  const handleSavePermission = () => {
    if (editingPermission.name) {
      axios
        .put(`http://localhost:8080/api/permissions/${editingPermission.id}`, editingPermission)
        .then(() => {
          fetchPermissions(); // Re-fetch permissions
          setOpenModal(false);
        })
        .catch((error) => console.error(error));
    }
  };

  // Modal Style
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
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#1976d2',
          fontSize: '2.5rem',
          letterSpacing: '1px',
          marginBottom: '30px',
        }}
      >
        Permission Management
      </Typography>

      {/* Add Permission Form */}
      <Card
        sx={{
          margin: '0 auto',
          marginBottom: '30px',
          padding: '20px',
          borderRadius: '15px',
          width: '400px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(to right, #e0eafc, #f8f9fa)',
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{ marginBottom: '20px', color: '#1976d2', fontWeight: 'bold' }}
          >
            Add New Permission
          </Typography>
          <Box sx={{ marginBottom: '15px' }}>
            <TextField
              label="Permission"
              value={newPermission}
              onChange={(e) => setNewPermission(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPermission}
            fullWidth
            sx={{
              textTransform: 'none',
              padding: '10px 20px',
              borderRadius: '10px',
              backgroundColor: '#1976d2',
              ':hover': { backgroundColor: '#1565c0' },
              fontWeight: 'bold',
            }}
          >
            Add Permission
          </Button>
        </CardContent>
      </Card>

      {/* Permissions Table */}
      <TableContainer component={Paper} sx={{ maxWidth: '800px', margin: '0 auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '150px' }}>Permission Name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell>{permission.name}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ marginRight: '10px' }}
                    onClick={() => handleEditPermission(permission)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Permission Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Edit Permission
          </Typography>
          <TextField
            fullWidth
            label="Permission Name"
            value={editingPermission?.name}
            onChange={(e) =>
              setEditingPermission({
                ...editingPermission,
                name: e.target.value,
              })
            }
            margin="normal"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: '10px' }}
            onClick={handleSavePermission}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default PermissionManagement;
