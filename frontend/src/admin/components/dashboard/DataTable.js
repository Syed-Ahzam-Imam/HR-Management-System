import React, { useState } from "react";
import {
  Text,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Button,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const DataTable = ({ title, buttonLabel, tasks }) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [serialNumber] = useState(1);

  return (
    <TableContainer
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      pt={6}
      pb={10}
      shadow="md"
      textAlign="center"
      minH={'100%'}
      overflowX="auto" // Add horizontal overflow handling
    >
      <SimpleGrid columns={2} justifyContent="space-between" mb={4} px={4}>
        <Text fontSize="xl" fontWeight="semibold" mb={2} align={"left"}>
          {title}
        </Text>
        <GridItem colSpan={1 / 3} style={{ justifySelf: "end" }}>
          <Link to='/task'>
            <Button variant="solid" colorScheme="cyan" color={'white'} size={{ base: "sm" }}>
              {buttonLabel}
            </Button>
          </Link>
        </GridItem>
      </SimpleGrid>
      <Table variant="simple" size={'md'}>
        <Thead>
          <Tr bg="gray.100" color="white">
            <Th>Task #</Th>
            <Th>Task</Th>
            <Th>Time</Th>
            <Th>Deadline</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks && tasks.length > 0 ? (
            tasks.map((item, index) => (
              <Tr key={index}>
                <Td>{item.taskId}</Td>
                <Td>{item.name}</Td>
                <Td>{item.estimatedTime}</Td>
                <Td>{item.deadline}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="4" style={{ textAlign: 'center' }}>No tasks available</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
