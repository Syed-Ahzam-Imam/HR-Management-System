import { Box, Text, Divider, Avatar, VStack, HStack, SimpleGrid, Button, GridItem } from "@chakra-ui/react";
import React from "react";
import { FcAdvertising } from "react-icons/fc";

const AnnouncementCard = ({ text, subText, avatarUrl }) => {
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
            Announcements
          </Text>
        <GridItem colSpan={1 / 3} style={{ justifySelf: "end" }}>
          {/* <Link to={to}> */}
            <Button variant="solid" colorScheme="cyan" color={'white'} size={{ base: "sm" }}>
              View
            </Button>
          {/* </Link> */}
        </GridItem>
      </SimpleGrid>
      <Divider borderColor="gray.300" mb={4} />
      <HStack mb={4}>
      <FcAdvertising size={"40px"} />
        <VStack align="left" spacing={1} ml={5}>
          <Text fontSize="md" fontWeight="bold" color={"green"}>
            Office Management Meeting
          </Text>
          <Text fontSize="sm" color="gray.500">
            Mar 21, 2:00 PM
          </Text>
        </VStack>
      </HStack>
      <HStack mb={4}>
      <FcAdvertising size={"40px"}  />
      <VStack align="left" spacing={1} ml={5}>
        <Text fontSize="md" fontWeight="bold" color={"red"}>
            Team Leader Meeting
          </Text>
          <Text fontSize="sm" color="gray.500">
            April 22, 8:00 PM
          </Text>
        </VStack>
      </HStack>
      <HStack mb={4}>
      <FcAdvertising size={"40px"} />
        <VStack align="left" spacing={1} ml={5}>
          <Text fontSize="md" fontWeight="bold" color={"green"}>
            Staff Meeting
          </Text>
          <Text fontSize="sm" color="gray.500">
            Mar 21, 2:00 PM
          </Text>
        </VStack>
      </HStack>
      <HStack >
      <FcAdvertising size={"40px"} />
        <VStack align="left" spacing={1} ml={5}>
          <Text fontSize="md" fontWeight="bold" color={"orange"}>
            Client Meeting
          </Text>
          <Text fontSize="sm" color="gray.500">
            Mar 21, 2:00 PM
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default AnnouncementCard;
