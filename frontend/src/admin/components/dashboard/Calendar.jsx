import React, { useState } from 'react';
import { Flex, Text, Box, useColorModeValue, SimpleGrid, GridItem, Button, Divider } from '@chakra-ui/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DashboardCalendar = () => {
    const [date, setDate] = useState(new Date());

    const calendarBorderColor = useColorModeValue('gray.200', 'gray.700');

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
            <Text fontSize="xl" fontWeight="semibold" mb={2} align={"left"}>
                Important Dates Calendar
            </Text>
            <Divider borderColor="gray.300" my={4} />
            <Box border={'none'} mx={5}>
                <Calendar
                    onChange={(newDate) => setDate(newDate)}
                    value={date}
                    tileClassName={({ date }) => {
                        // Customize the styling of specific dates if needed
                        // Example: Highlight dates in the past
                        return date < new Date() ? 'past-date' : '';
                    }}
                    
                />
            </Box>
        </Box>
    );
};

export default DashboardCalendar;
