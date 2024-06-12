import { Box, FormControl, FormLabel, Input, Button, Heading, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '', 
        contact: '',
        email: '',
        username: '', 
        password: ''
    });
    const navigate = useNavigate();
    const toast = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        localStorage.setItem('registeredUsers', JSON.stringify([...existingUsers, formData]));
        setFormData({ firstName: '',
            lastName: '', 
            contact: '', 
            email: '',
            username: '', 
            password: '' });

        toast({
            title: "Registration Successful",
            description: "You have been registered successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });

        setTimeout(() => navigate('/'), 2000);
    };

    return (
        <Box maxW="md" mx="auto" mt={2} p={5} borderWidth={1} borderRadius="lg" boxShadow="md">
            <Heading mb={5} textAlign="center">Register</Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    {['First Name', 'Last Name', 'Contact', 'Email', 'Username', 'Password'].map((field) => (
                        <FormControl key={field} isRequired>
                            <FormLabel>{field}</FormLabel>
                            <Input
                                name={field.toLowerCase().replace(' ', '')}
                                value={formData[field.toLowerCase().replace(' ', '')]}
                                onChange={handleChange}
                                type={field === 'Email' ? 'email' 
                                    : field === 'Contact' ? 'tel'
                                    : field === 'Password' ? 'password'
                                    : 'text'}
                                placeholder={field}
                            />
                        </FormControl>
                    ))}
                    <Button type="submit" width="100%" colorScheme="teal">Submit</Button>
                </VStack>
            </form>
        </Box>
    );
}

export default RegisterPage;
