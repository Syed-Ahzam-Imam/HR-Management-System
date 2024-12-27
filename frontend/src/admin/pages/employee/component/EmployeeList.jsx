import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useColorModeValue,
  Button,
  InputGroup,
  InputLeftElement,
  Flex,
  Input,
  useToast,
  ButtonGroup,
  Select,
} from "@chakra-ui/react";
import Drawers from "./Drawers";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import {
  BiSearch,
  BiChevronLeft,
  BiChevronRight,
  BiShow,
} from "react-icons/bi";
import { getAllEmployees, deleteEmployeeById } from "../../../../API/employee";
import Loading from '../../../../components/Loading/Loading'
import DeleteAlert from '../../../../components/DeleteAlert'

const EmployeeList = () => {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDrawerType, setSelectedDrawerType] = useState("");
  const [selectedItemData, setSelectedItemData] = useState(null);
  const bgColor = useColorModeValue("white", "gray.700");
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [employeeName, setEmployeeName] = useState("");

  const [selectedDepartment, setSelectedDepartment] = useState("");



  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event) => {
    const searchText = event.target.value?.toLowerCase();
    setSearchTerm(searchText);
  };



  const toast = useToast(); // Initialize useToast
  const filteredItems = employees.filter(
    (item) =>
      (String(item.userId)?.toLowerCase().includes(searchTerm) ||
        String(item.name)?.toLowerCase().includes(searchTerm) ||
        String(item.address)?.toLowerCase().includes(searchTerm) ||
        String(item.phoneNumber)?.toLowerCase().includes(searchTerm) ||
        String(item.email)?.toLowerCase().includes(searchTerm)) &&
      (selectedDepartment === "" || item.department === selectedDepartment)
  );




  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem);

  const openDrawer = (drawerType, itemData) => {
    setSelectedDrawerType(drawerType);
    setSelectedItemData(itemData);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedDrawerType("");
    setSelectedItemData(null);
  };

  const handleDeleteClick = (item) => {
    setSelectedItemId(item.userId);
    setEmployeeName(item.name);
    setIsDeleteAlertOpen(true);
  };


  // Handler for department filter change
  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);

  };

  // Handle confirmation of item deletion
  const handleConfirmDelete = async () => {
    try {
      await deleteEmployeeById(selectedItemId);
      fetchEmployees();
      toast({
        title: "Employee Deleted",
        description: `All data for ${employeeName} has been deleted.`,
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
      setIsDeleteAlertOpen(false);
    } catch (error) {
      // Handle any errors that may occur during deletion
      console.error("Error deleting Employee:", error);

      // Display an error message using useToast
      toast({
        title: "Error",
        description: "Error deleting Employee",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };
  // Fetch employees when the component mounts
  const fetchEmployees = async () => {
    try {
      const employeeData = await getAllEmployees();
      console.log("employeeData", employeeData)
      setEmployees(employeeData.employees);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (isLoading) {
    return (<Loading />)
  }
  return (

    <Box
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="md"
      p={4}
      shadow="md"
      mx="auto"
    >
      <Flex align="center" mb={4} justify="space-between">
        <Flex align="center" w="50%">
          <InputGroup w="100%" size={"sm"}>
            <InputLeftElement
              pointerEvents="none"
              color="gray.400"
              fontSize="1.2em"
              ml={2}
            >
              <BiSearch />
            </InputLeftElement>
            <Input
              placeholder="Search by name, designation, or email"
              value={searchTerm}
              onChange={handleSearchChange}
              borderRadius="0.3rem"
              py={2}
              pl={10}
              pr={3}
              fontSize="md"
              mr={4}
              _placeholder={{ color: "gray.400" }}
            />
          </InputGroup>
        </Flex>
        <Flex align="center">
          <Select
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            placeholder="All Departments"
          >
            <option value="management">Management</option>
            <option value="sales">Sales</option>
            <option value="development">Development</option>
            <option value="hr">HR</option>
          </Select>
        </Flex>
        <Flex align="center">
          <ButtonGroup>
            <Button
              variant="solid"
              colorScheme="cyan"
              onClick={() => openDrawer("addNew")}
              size="md"
              color={'white'}
            >
              New Employee
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>

      <Box overflowX="auto">
        <Table variant="simple" size={"md"}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Address</Th>
              <Th>Contact</Th>
              <Th>Email</Th>
              <Th>Designation</Th>
              <Th>Department</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((item) => (
              <Tr key={item.userId}>
                <Td>
                  {item.name}
                </Td>
                <Td>{item.address}</Td>
                <Td>{item.phoneNumber}</Td>
                <Td>{item.email}</Td>
                <Td>{item.designation}</Td>
                <Td>{item.department.toUpperCase()}</Td>
                <Td>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<HiDotsVertical />}
                      variant="ghost"
                      size="sm"
                    />
                    <MenuList>
                      <MenuItem
                        icon={<FiEdit />}
                        onClick={() => openDrawer("edit", item)}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        icon={<FiTrash2 />}
                        onClick={() => handleDeleteClick(item)}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Flex justify="space-between" mt={4} align="center">
        <Box>
          <IconButton
            icon={<BiChevronLeft />}
            isDisabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            aria-label="Previous Page"
          />
          <IconButton
            icon={<BiChevronRight />}
            isDisabled={indexOfLastItem >= filteredItems.length}
            onClick={() => handlePageChange(currentPage + 1)}
            ml={2}
            aria-label="Next Page"
          />
        </Box>
        <Text fontSize="smaller">
          Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}
        </Text>
      </Flex>
      <Drawers
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        drawerType={selectedDrawerType}
        data={selectedItemData}
        handleAddUpdateDeleteItem={fetchEmployees}
      />
      <DeleteAlert
        isOpen={isDeleteAlertOpen}
        onClose={() => setIsDeleteAlertOpen(false)}
        onConfirmDelete={handleConfirmDelete}
        HeaderText={"Delete Employee"}
        BodyText={`Are you sure you want to delete this ${employeeName}?`}
      />
    </Box >
  );
};

export default EmployeeList;
