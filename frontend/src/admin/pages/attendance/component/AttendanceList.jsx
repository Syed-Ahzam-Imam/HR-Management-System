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
  Text,
  useColorModeValue,
  Flex,
  useToast,
  Image,
  SimpleGrid,
  Divider,
  Icon,
  Progress,
  Tooltip, // Add this import
} from "@chakra-ui/react";
import {
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";

import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaRegCalendarAlt, FaHourglassStart, FaRegClock, FaClock, FaCheck, FaExclamation, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useLocation, useParams } from "react-router-dom";
import { BASE_URL, getAllAttendancebyId } from "../../../../API/attendance";
import Loading from "../../../../components/Loading/Loading";



const AttendanceList = ({ }) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [attendanceData, setAttendanceData] = useState([]);
  const { userId } = useParams();


  useEffect(() => {
    // Call your API function to fetch attendance data by userId
    const fetchAttendanceData = async () => {
      try {
        const response = await getAllAttendancebyId(userId); // Assuming you have this function implemented
        console.log("Response ", response.attendance);
        if (response.success) {
          setAttendanceData(response.attendance);
        } else {
          // Handle error
        }
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        // Handle error
      }
    };

    fetchAttendanceData();
  }, [userId]);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;

  if (!attendanceData) {
    return (< Loading />)
  }


  return (
    <>
      <Box
        bg={bgColor}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="md"
        p={4}
        shadow="md"
        mx="auto"
      >
        <Flex
          direction="row"
          w="80vw" // Take the whole horizontal width of the page
          h="25vh"
          mb={3} // Take a quarter of the vertical height of the page
        >
          <Box h="100%"  > {/* Adjust background color and width as needed */}
            <Image
              src={`${BASE_URL}/uploads/profile/${attendanceData[0]?.User?.profilePicture}`}
              h="100%" // Take the whole vertical height of the left section
              objectFit="cover"
              mt={2} // Cover to maintain aspect ratio
            />
          </Box>
          <Box w="75%" p={4}>
            <Text fontSize="xl" fontWeight="semibold">
              {attendanceData[0]?.User?.fname}
            </Text>
            <SimpleGrid spacing={4} py={4} w="100%" columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}>
              <Flex align="center">
                <FaMapMarkerAlt style={{ marginRight: '8px', color: 'blue' }} />
                <Text color="gray.500">Main Branch</Text>
              </Flex>
              <Flex align="center">
                <FaEnvelope style={{ marginRight: '8px', color: 'green' }} />
                <Text color="gray.500">{attendanceData[0]?.User?.email}</Text>
              </Flex>
              <Flex align="center">
                <FaPhone style={{ marginRight: '8px', color: 'purple' }} />
                <Text color="gray.500">{attendanceData[0]?.User?.phoneNumber}</Text>
              </Flex>
            </SimpleGrid>
            <Divider borderColor="gray.300" my={3} />
            <SimpleGrid columns={{ base: 'none', md: 'none', lg: 4, "2xl": 6 }} spacing={4} mt={4} w="100%" display={{ base: 'none', lg: 'grid' }}>
              <Text fontWeight="semibold" color="gray.600">Employee ID:</Text>
              <Text fontWeight="semibold" color="gray.600">Department</Text>
              <Text fontWeight="semibold" color="gray.600">Designation:</Text>
              <Text fontWeight="semibold" color="gray.600">Working From:</Text>
              <Text color="gray.500">{attendanceData[0]?.User?.userId}</Text>
              <Text color="gray.500">{attendanceData[0]?.User?.department}</Text>
              <Text color="gray.500">{attendanceData[0]?.User?.designation}</Text>
              <Text color="gray.500">5 years</Text>
            </SimpleGrid>

          </Box>
        </Flex>
      </Box>

      <Divider borderColor="gray.300" my={3} />
      <Box
        bg={bgColor}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="md"
        p={4}
        shadow="md"
        mx="auto"
      >
        <SimpleGrid spacing={4} py={4} w="100%" columns={{ base: 1, md: 2, lg: 4, "2xl": 6 }}>
          <Flex align="center">
            <FaRegClock style={{ fontSize: '30px', marginRight: '20px', color: 'blue' }} />
            <Flex direction="column">
              <Text fontWeight="semibold" color="gray.600">Current Status</Text>
              <Text color="gray.500">Active</Text>
            </Flex>
          </Flex>
          <Flex align="center">
            <FaRegCalendarAlt style={{ fontSize: '30px', marginRight: '20px', color: 'green' }} />
            <Flex direction="column">
              <Text fontWeight="semibold" color="gray.600">Login Time</Text>
              <Text color="gray.500">08:00 Hours</Text>
            </Flex>
          </Flex>
          <Flex align="center">
            <FaHourglassStart style={{ fontSize: '30px', marginRight: '20px', color: 'orange' }} />
            <Flex direction="column">
              <Text fontWeight="semibold" color="gray.600">Working Hours</Text>
              <Text color="gray.500">10:00 am - 07:00 pm</Text>
            </Flex>
          </Flex>
          <Flex align="center">
            <FaClock style={{ fontSize: '30px', marginRight: '20px', color: 'purple' }} />
            <Flex direction="column">
              <Text fontWeight="semibold" color="gray.600">Expected/Earned Hours</Text>
              <Text color="gray.500">40 Hours per week </Text>
            </Flex>
          </Flex>
        </SimpleGrid>
      </Box>
      <Divider borderColor="gray.300" my={3} />

      <Box
        bg={bgColor}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="md"
        p={4}
        shadow="md"
        mx="auto"
      >
        <Box overflowX="auto">
          <Table variant="simple" p={4}>
            <Thead bgColor="gray.100">
              <Tr>
                <Th>Date</Th>
                <Th>Attendance Visual</Th>
                <Th>Effective Hrs</Th>
                <Th>Gross Hrs</Th>
                <Th>Arrival</Th>
                <Th>Log</Th>
              </Tr>
            </Thead>
            <Tbody>
              {attendanceData.map((data, index) => (
                <Tr key={index}>
                  <Td>
                    <Text color="gray.500">{data.date}</Text>
                  </Td>
                  <Td>
                    <Tooltip label={`Attendance: ${data.attendanceVisual}`} placement="top" hasArrow>
                      <Progress
                        value={data.attendanceVisual}
                        size="md"
                        colorScheme={data.attendanceVisual > 80 ? 'green' : data.attendanceVisual > 20 ? 'yellow' : 'red'}
                      />
                    </Tooltip>
                  </Td>
                  <Td>
                    <Text color="gray.500">{data.effectiveHrs}</Text>
                  </Td>
                  <Td>
                    <Text color="gray.500">{data.grossHrs}</Text>
                  </Td>
                  <Td>
                    <Flex align="center">
                      <Icon as={data.late ? FaExclamation : FaCheck} color={data.late ? 'yellow.500' : 'green.500'} />
                      <Text ml={2} color="gray.500">{data.arrival}</Text>
                    </Flex>
                  </Td>
                  <Td>
                    {data.log ? (
                      <Icon as={FaCheckCircle} color="green.500" boxSize={6} />
                    ) : (
                      <Icon as={FaExclamationCircle} color="yellow.500" boxSize={6} />
                    )}
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
              isDisabled={indexOfLastItem >= attendanceData.length}
              onClick={() => handlePageChange(currentPage + 1)}
              ml={2}
              aria-label="Next Page"
            />
          </Box>
          <Text fontSize="smaller">
            Page {currentPage} of{" "}
            {Math.ceil(attendanceData.length / itemsPerPage)}
          </Text>
        </Flex>
      </Box>
    </>
  );
};

export default AttendanceList;
