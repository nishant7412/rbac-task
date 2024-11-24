// import React from 'react';
// import UserManagement from './components/UserManagement';
// import RoleManagement from './components/RoleManagement';
// import PermissionManagement from './components/PermissionManagement';
// import { Container, Grid2 } from '@mui/material';

// function App() {
//   return (
//     <Container>
//       <Grid2 container spacing={3}>
//         <Grid2 item xs={12} md={4}>
//           <UserManagement />
//         </Grid2>
//         <Grid2 item xs={12} md={4}>
//           <RoleManagement />
//         </Grid2>
//         <Grid2 item xs={12} md={4}>
//           <PermissionManagement />
//         </Grid2>
//       </Grid2>
//     </Container>
//   );
// }

// export default App;
// import React from 'react';
// import UserManagement from './components/UserManagement';
// import RoleManagement from './components/RoleManagement';
// import PermissionManagement from './components/PermissionManagement';
// import { Container, Grid, Typography, Card, CardContent, Grid2 } from '@mui/material';

// function App() {
//   return (
//     <Container sx={{ padding: '20px' }}>
//       <Typography variant="h4" gutterBottom align="center">
//         Admin Dashboard
//       </Typography>
//       <Grid2 container spacing={4}>
//         <Grid2 item xs={12} md={4}>
//           <Card elevation={3}>
//             <CardContent>
//               <UserManagement />
//             </CardContent>
//           </Card>
//         </Grid2>
//         <Grid2 item xs={12} md={4}>
//           <Card elevation={3}>
//             <CardContent>
//               <RoleManagement />
//             </CardContent>
//           </Card>
//         </Grid2>
//         <Grid2 item xs={12} md={4}>
//           <Card elevation={3}>
//             <CardContent>
//               <PermissionManagement />
//             </CardContent>
//           </Card>
//         </Grid2>
//       </Grid2>
//     </Container>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import PermissionManagement from './components/PermissionManagement';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserManagement />} />
        <Route path="/roles" element={<RoleManagement />} />
        <Route path="/permissions" element={<PermissionManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
