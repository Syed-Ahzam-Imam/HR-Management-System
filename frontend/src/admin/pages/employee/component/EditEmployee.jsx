import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { updateEmployee } from "../../../../API/employee";
import { user } from "../../../../API/constants";


let userRole = '';
let userId = 0;

const currentUser = JSON.parse(localStorage.getItem("user"));


if (currentUser) {
  userRole = currentUser.role;
  userId = currentUser.userId
}

const EditEmployee = ({ handleAddUpdateDeleteItem, onClose, selectedItem }) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textStyles = {
    border: "1px solid grey",
    backgroundColor: "transparent",
    width: "100%",
    padding: "0.5rem",
    borderRadius: "0.5rem",
  };
  const toast = useToast();
  const [btnLoading, setBtnLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState(selectedItem);

  const handleInputChange = (field, value) => {
    setEmployeeData({ ...employeeData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      employeeData.phoneNumber = parseInt(employeeData.phoneNumber);
      employeeData.fname = employeeData.name;
      employeeData.userRole = userRole;
      setBtnLoading(true)
      const response = await updateEmployee(employeeData.userId, employeeData);
      handleAddUpdateDeleteItem();
      console.log('Employee added successfully:', response);

      toast({
        title: 'Employee Updated',
        description: 'Employee has been updated successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });

      if (user.userId == response.user.userId) {
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(response.user));
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }



      setBtnLoading(false)
    } catch (error) {
      console.error('Error adding Employee', error);
      toast({
        title: 'Error updating Employee',
        description: 'There is an error adding the Employee, please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
      setBtnLoading(false)
    } finally {

      onClose();
    }
  };


  return (
    <Box
      spacing={10}
      borderWidth="1px"
      bg={bgColor}
      borderColor={borderColor}
      borderRadius="md"
      p={4}
      shadow="md"
      width="100%"
    >
      <FormControl>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          <Box mb={2}>
            <FormLabel fontWeight="semibold">Username</FormLabel>
            <Input
              style={textStyles}
              onChange={(e) => handleInputChange("userName", e.target.value)}
              value={employeeData.userName}
              type="text"
            />
          </Box>
          <Box mb={2}>
            <FormLabel fontWeight="semibold">Name</FormLabel>
            <Input
              style={textStyles}
              onChange={(e) => handleInputChange("name", e.target.value)}
              value={employeeData.name}
              type="text"
            />
          </Box>
          <Box mb={2}>
            <FormLabel fontWeight="semibold">Address</FormLabel>
            <Input
              style={textStyles}
              onChange={(e) =>
                handleInputChange("address", e.target.value)
              } // Handle address change
              value={employeeData.address}
              type="text"
            />
          </Box>
          <Box mb={2}>
            <FormLabel fontWeight="semibold">Email</FormLabel>
            <Input
              style={textStyles}
              onChange={(e) =>
                handleInputChange("email", e.target.value)
              } // Handle address change
              value={employeeData.email}
              type="text"
            />
          </Box>
          <Box mb={2}>
            <FormLabel fontWeight="semibold">Password</FormLabel>
            <Input
              style={textStyles}
              onChange={(e) => handleInputChange("password", e.target.value)}
              type="text"
              value={employeeData.password}
            />
          </Box>
          <Box mb={2}>
            <FormLabel fontWeight="semibold">Contact</FormLabel>
            <Input
              style={textStyles}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              type="number"
              value={employeeData.phoneNumber}
            />
          </Box>
          <Box mb={2}>
            <FormLabel fontWeight="semibold">Role</FormLabel>
            <Select
              style={textStyles}
              onChange={(e) => handleInputChange("role", e.target.value)}
              placeholder="Select role"
              defaultValue={employeeData.role}
            >
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </Select>
          </Box>
          <Box mb={2}>
            <FormLabel fontWeight="semibold">Designation</FormLabel>
            <Input
              style={textStyles}
              onChange={(e) => handleInputChange("designation", e.target.value)}
              type="text"
              value={employeeData.designation}
            />
          </Box>
          <Box mb={2}>
            <FormLabel fontWeight="semibold">Department</FormLabel>
            <Select
              style={textStyles}
              onChange={(e) => handleInputChange("department", e.target.value)}
              placeholder="Select department"
              defaultValue={employeeData.department}
            >
              <option value="management">Management</option>
              <option value="sales">Sales</option>
              <option value="development">Development</option>
              <option value="hr">HR</option>
            </Select>
          </Box>
        </SimpleGrid>
        <Button
          variant="outline"
          colorScheme="red"
          mt={2}
          mr={2}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="solid"
          colorScheme="blue"
          mt={2}
          onClick={handleSubmit}
          isLoading={btnLoading}
        >
          Edit Employee
        </Button>
      </FormControl>
    </Box>
  );
};

export default EditEmployee;
