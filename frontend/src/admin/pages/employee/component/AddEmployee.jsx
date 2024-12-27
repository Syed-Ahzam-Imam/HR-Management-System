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
import { createEmployee } from "../../../../API/employee";

const AddEmployee = ({ handleAddUpdateDeleteItem, onClose }) => {
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
  const [employeeData, setEmployeeData] = useState();




  // Handler to update editable values
  const handleInputChange = (field, value) => {
    setEmployeeData({ ...employeeData, [field]: value });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      employeeData.phoneNumber = parseInt(employeeData.phoneNumber);
      console.log("employeeData", employeeData);
      setBtnLoading(true)
      const response = await createEmployee(employeeData);
      handleAddUpdateDeleteItem();
      console.log('Employee added successfully:', response);
      // Show a success toast
      toast({
        title: 'Employee Added',
        description: 'Employee has been added successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
      setBtnLoading(false)
    } catch (error) {
      console.error('Error adding Employee', error);
      toast({
        title: 'Error adding Employee',
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
              type="text"
            />
          </Box>
          <Box mb={2}>
            <FormLabel fontWeight="semibold">Name</FormLabel>
            <Input
              style={textStyles}
              onChange={(e) => handleInputChange("fname", e.target.value)}
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
              type="text"
            />
          </Box>
          <Box mb={2}>
            <FormLabel fontWeight="semibold">Password</FormLabel>
            <Input
              style={textStyles}
              onChange={(e) => handleInputChange("password", e.target.value)}
              type="text"
            />
          </Box>
          <Box mb={2}>
            <FormLabel fontWeight="semibold">Contact</FormLabel>
            <Input
              style={textStyles}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              type="number"
            />
          </Box>
          <Box mb={2}>
            <FormLabel fontWeight="semibold">Role</FormLabel>
            <Select
              style={textStyles}
              onChange={(e) => handleInputChange("role", e.target.value)}
              placeholder="Select role"
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
            />
          </Box>
          <Box mb={2}>
            <FormLabel fontWeight="semibold">Department</FormLabel>
            <Select
              style={textStyles}
              onChange={(e) => handleInputChange("department", e.target.value)}
              placeholder="Select department"
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
          Add Employee
        </Button>
      </FormControl>
    </Box>
  );
};

export default AddEmployee;
