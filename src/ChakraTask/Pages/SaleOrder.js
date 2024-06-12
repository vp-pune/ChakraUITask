import React, { useEffect, useState } from 'react';
import {
  Box, Button, Tabs, TabPanels, TabPanel, Table, Thead, Tbody, Tr, Th, Td, IconButton, HStack, Avatar, Text,
  useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter
} from '@chakra-ui/react';
import { FaEllipsisH } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { product, saleOrder, customer, customerOrder as initialCustomerOrder } from './mockdata';

const SaleOrders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState(0);
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const [orders, setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);

  const onSubmit = (data) => {
    const newOrder = { 
      id: editingOrderId ? editingOrderId : orders.length + 1, 
      ...data, 
      lastModified: new Date().toLocaleString() 
    };
    const updatedOrders = editingOrderId
      ? orders.map(order => order.id === editingOrderId ? newOrder : order)
      : [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('customerOrder', JSON.stringify(updatedOrders));
    onClose();
    reset();
    setEditingOrderId(null);
  };

  const editOrder = (order) => {
    setEditingOrderId(order.id);
    setValue('customerName', order.customerName);
    setValue('price', order.price);
    setValue('lastModified', new Date(order.lastModified));
    onOpen();
  };

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('customerOrder')) || [];
    setOrders(storedOrders);
  }, []);

  useEffect(() => {
    localStorage.setItem('customerOrder', JSON.stringify(orders));
  }, [orders]);

  return (
    <Box p={5} minHeight="100vh">
      <HStack spacing={4} mb={4}>
        <Button colorScheme="teal" onClick={() => setActiveTab(0)}>Active Sale Orders</Button>
        <Button colorScheme="teal" onClick={() => setActiveTab(1)}>Completed Sale Orders</Button>
        <Button ml="auto" colorScheme="teal" onClick={onOpen}>+ Sale Order</Button>
      </HStack>

      <Tabs index={activeTab} onChange={(index) => setActiveTab(index)}>
        <TabPanels>
          <TabPanel>
            <Table boxShadow={'md'} variant='striped' bg="white" color="black" borderRadius="md" overflow="hidden">
              <Thead bg="green.700">
                <Tr>
                  <Th color="white">ID</Th>
                  <Th color="white">Customer Name</Th>
                  <Th color="white">Price (₹)</Th>
                  <Th color="white">Last Modified</Th>
                  <Th color="white">Edit/View</Th>
                </Tr>
              </Thead>
              <Tbody shadow={'lg'}>
                {orders.filter(order => !order.completed).map((order) => (
                  <Tr key={order.id}>
                    <Td>{order.id}</Td>
                    <Td>
                      <HStack>
                        <Avatar name={order.customerName} src="https://bit.ly/broken-link" />
                        <Text>{order.customerName}</Text>
                        <Text color="gray.500">{order.customerUsername}</Text>
                      </HStack>
                    </Td>
                    <Td>{order.price}</Td>
                    <Td>{order.lastModified}</Td>
                    <Td>
                      <IconButton
                        aria-label="Options"
                        icon={<FaEllipsisH />}
                        variant="ghost"
                        onClick={() => editOrder(order)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Text fontSize="lg" mb={4}>Below are the completed sale orders:</Text>
            <Table boxShadow={'md'} variant='striped' bg="white" color="black" borderRadius="md" overflow="hidden">
              <Thead bg="green.700">
                <Tr>
                  <Th color="white">ID</Th>
                  <Th color="white">Customer Name</Th>
                  <Th color="white">Price (₹)</Th>
                  <Th color="white">Last Modified</Th>
                </Tr>
              </Thead>
              <Tbody shadow={'lg'}>
                {orders.filter(order => order.completed).map((order) => (
                  <Tr key={order.id}>
                    <Td>{order.id}</Td>
                    <Td>
                      <HStack>
                        <Avatar name={order.customerName} src="https://bit.ly/broken-link" />
                        <Text>{order.customerName}</Text>
                        <Text color="gray.500">{order.customerUsername}</Text>
                      </HStack>
                    </Td>
                    <Td>{order.price}</Td>
                    <Td>{order.lastModified}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingOrderId ? 'Edit Sale Order' : 'Create Sale Order'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.customerName}>
                <FormLabel>Customer Name</FormLabel>
                <Input type='text'
                  {...register('customerName', { required: 'Customer Name is required' })} 
                  placeholder='Customer Name' 
                />
                {errors.customerName && <Text color="red.500">{errors.customerName.message}</Text>}
              </FormControl>
              <FormControl mt={4} isInvalid={errors.price}>
                <FormLabel>Price</FormLabel>
                <Input type='number'
                  {...register('price', { required: 'Price is required' })} 
                  placeholder='Price' 
                />
                {errors.price && <Text color="red.500">{errors.price.message}</Text>}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Last Modified</FormLabel>
                <DatePicker 
                  selected={new Date()} 
                  onChange={(date) => setValue('lastModified', date.toLocaleString())} 
                />
              </FormControl>
              <ModalFooter>
                <Button colorScheme="teal" mr={3} type="submit">Save</Button>
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SaleOrders;
