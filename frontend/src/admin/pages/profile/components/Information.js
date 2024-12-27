// Chakra imports
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "./Card";
import React from "react";

export function Information(props) {
  const { title, value, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const bg = useColorModeValue("gray.100", "navy.700");
  return (
    <Box
      borderRadius={10}
      p={4} // Adjust the padding as needed
      bg={bg}
    >
      <Text fontWeight='500' color={textColorSecondary} fontSize='sm'>
        {title}
      </Text>
      <Text color={textColorPrimary} fontWeight='500' fontSize='md'>
        {value}
      </Text>
    </Box>
  );
}
