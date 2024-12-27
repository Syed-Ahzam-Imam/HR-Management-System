import { Box, Text, HStack, Grid, useColorModeValue, VStack, Flex, Divider, GridItem, SimpleGrid, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AttendanceCard = ({ title, value1, value2, value3,text1,text2,text3 }) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Flex
    direction="column"
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      p={6}
      shadow="md"
    >
      <SimpleGrid columns={2} justifyContent="space-between" mb={4}>
          <Text fontSize="xl" fontWeight="semibold" mb={2} align={"left"}>
            {title}
          </Text>
        <GridItem colSpan={1 / 3} style={{ justifySelf: "end" }}>
          <Link to='/attendance'>
            <Button variant="solid"  colorScheme="cyan" color={'white'} size={{ base: "sm" }}>
              View
            </Button>
          </Link>
        </GridItem>
      </SimpleGrid>
      <hr />
      <Flex width={"100%"} gap={14} mt={3} justify="center">
        {/* Column 1 */}
        <VStack>
          <Text fontWeight={100} fontSize="md" align="center">
            {text1}
          </Text>
          <Text
            fontSize="l"
            fontWeight="bold"
            textColor="green"
            align="center"
            padding="0 4px"
          >
            {value1}
          </Text>
        </VStack>
        <Divider orientation="vertical"/>
        <VStack>
          <Text fontWeight={100} fontSize="md" align="center">
            {text2}
          </Text>
          <Text
            fontSize="l"
            fontWeight="bold"
            textColor="red"
            align="center"
            padding="0 4px"
          >
            {value2}
          </Text>
        </VStack>
        <Divider orientation="vertical" />
        <VStack>
          <Text fontWeight={100} fontSize="md" align="center">
            {text3}
          </Text>
          <Text
            fontSize="l"
            fontWeight="bold"
            textColor="orange"
            align="center"
            padding="0 4px"
          >
            {value3}
          </Text>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default AttendanceCard;
