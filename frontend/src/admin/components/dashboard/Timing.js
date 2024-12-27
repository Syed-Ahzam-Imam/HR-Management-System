// Chakra imports
import {
    Box,
    Button,
    Flex,
    HStack,
    Icon,
    List,
    ListItem,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import Card from "../../../components/card/Card.js";
// Custom components
import BarChart from "../../../components/charts/BarChart.js";
import React from "react";
import {
    barChartDataConsumption,
    barChartOptionsConsumption,
} from "../../../variables/charts.js";
import { MdBarChart } from "react-icons/md";

export default function Timing(props) {
    const { ...rest } = props;

    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const iconColor = useColorModeValue("brand.500", "white");
    const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const bgHover = useColorModeValue(
        { bg: "secondaryGray.400" },
        { bg: "whiteAlpha.50" }
    );
    const bgFocus = useColorModeValue(
        { bg: "secondaryGray.300" },
        { bg: "whiteAlpha.100" }
    );
    return (
        <Card align='center' direction='column' w='100%' {...rest}>
            <Flex align='center' w='100%' px='15px' py='10px'>
                <Text
                    me='auto'
                    color={textColor}
                    fontSize='xl'
                    fontWeight='700'
                    lineHeight='100%'
                    mt={3}>
                    Month's Timing
                </Text>
                <Flex gap={7} mt={3}>
                    <Box>
                        <Flex align="center">
                            <Box
                                w="4px"
                                h="4px"
                                bg="green.500"
                                borderRadius="50%"
                                mr={2}
                            />
                            <Text
                                fontSize="sm"
                                fontWeight="500"
                                textColor="green"
                                lineHeight="100%"
                            >
                                Present
                            </Text>
                        </Flex>
                    </Box>
                    <Box>
                        <Flex align="center">
                            <Box
                                w="4px"
                                h="4px"
                                bg="orange.500"
                                borderRadius="50%"
                                mr={2}
                            />
                            <Text
                                fontSize="sm"
                                fontWeight="500"
                                textColor="orange"
                                lineHeight="100%"
                            >
                                Break
                            </Text>
                        </Flex>
                    </Box>
                    <Box>
                        <Flex align="center">
                            <Box
                                w="4px"
                                h="4px"
                                bg="red.500"
                                borderRadius="50%"
                                mr={2}
                            />
                            <Text
                                fontSize="sm"
                                fontWeight="500"
                                textColor="red"
                                lineHeight="100%"
                            >
                                Absent
                            </Text>
                        </Flex>
                    </Box>
                </Flex>
               
            </Flex>

            <Box h='240px' mt='auto'>
                <BarChart
                    chartData={barChartDataConsumption}
                    chartOptions={barChartOptionsConsumption}
                />
            </Box>
        </Card>
    );
}
