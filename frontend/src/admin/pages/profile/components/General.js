// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import { Card } from "./Card"
import React from "react";
import { Information } from "./Information"
import { user } from "../../../../API/constants";

// Assets
export function GeneralInformation(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'>
        General Information
      </Text>
      <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
        Welcome to your profile! Here, you'll find a snapshot of your essential information and key details. From personal insights to professional achievements, this space is designed to keep you informed and empowered.
      </Text>
      <SimpleGrid columns='2' gap='20px'>
        <Information
          boxShadow={cardShadow}
          title='Email'
          value={user.email}
        />
        <Information
          boxShadow={cardShadow}
          title='Password'
          value='*******'
        />
        <Information
          boxShadow={cardShadow}
          title='Role'
          value={user.role}
        />
        <Information
          boxShadow={cardShadow}
          title='Contact No.'
          value={user.phoneNumber}
        />
      </SimpleGrid>
    </Card>
  );
}
