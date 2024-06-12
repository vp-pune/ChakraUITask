import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, FormControl, FormLabel, Input, Button, Heading, Text, Link } from '@chakra-ui/react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

  const handleLogin = () => {
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/saleOrder');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg">
      <Heading mb={6}>Login</Heading>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <FormControl mt={4} textAlign={'center'}>
        <Button width={"100%"} className='text-right' colorScheme="teal" onClick={handleLogin}>Login</Button>
      </FormControl>
      <Text mt={2}>
        Not Registered? {' '}
        <Link onClick={() => navigate('/registerPage')} color='teal.500'>
          Register here...
        </Link>
      </Text>
    </Box>
  );
};

export default LoginPage;
