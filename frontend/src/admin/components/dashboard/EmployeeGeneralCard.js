import { Box, Text, Divider, Avatar, VStack, HStack, SimpleGrid, Button, GridItem, Spacer } from "@chakra-ui/react";
import React from "react";
import { BASE_URL } from "../../../API/constants";
import { Link } from "react-router-dom";

const EmployeeGeneralCard = ({ employeeData, heading }) => {
  return (
    <Box
      direction="column"
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="lg"
      p={6}
      shadow="md"
      align="left"
    >
      <SimpleGrid columns={2} justifyContent="space-between" mb={4}>
        <Text fontSize="xl" fontWeight="semibold" mb={2} align={"left"}>
          {heading}
        </Text>
        <GridItem colSpan={1 / 3} style={{ justifySelf: "end" }}>
          <Link to={'/employees'}>
          <Button variant="solid" colorScheme="cyan" color={'white'} size={{ base: "sm" }}>
            View
          </Button>
          </Link>
        </GridItem>
      </SimpleGrid>
      <Divider borderColor="gray.300" mb={4} />
      {employeeData.slice(0, 5).map((employee, index) => (
        <HStack key={index} mb={2}>
          <Avatar size="md" name="Avatar" src={`${BASE_URL}/uploads/profile/${employee.profile}`} mb={2} />
          <VStack align="left" spacing={1} ml={5}>
            <Text fontSize="md" fontWeight="bold" color={"green"}>
              {employee.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {employee.designation}
            </Text>
          </VStack>
          <Spacer />
          <Text fontSize="sm" color="gray.500">
            {employee.rightext}
          </Text>
        </HStack>
      ))}

    </Box>
  );
};

export default EmployeeGeneralCard;
