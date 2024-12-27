import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    SimpleGrid,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import { createTask } from "../../../../API/task";

const AddTask = ({ onClose, handleAddUpdateDeleteItem }) => {
    const bgColor = useColorModeValue("gray.100", "gray.700");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const textStyles = {
        border: "1px solid grey",
        backgroundColor: "transparent",
        width: "100%",
        padding: "0.5rem",
        borderRadius: "0.5rem",
    };
    const toast = useToast();
    const [btnLoading, setBtnLoading] = useState(false);
    const [taskData, setTaskData] = useState({
        name: "",
        description: "",
        estimatedTime: 0,
        deadline: new Date(), // Initialize with today's date
    });


    // Handler to update editable values
    const handleInputChange = (field, value) => {
        setTaskData({ ...taskData, [field]: value });
    };


    const handleSubmit = async (e) => {
        // e.preventDefault();
        try {
            taskData.estimatedTime = parseInt(taskData.estimatedTime);
            console.log('Task Data', taskData)
            setBtnLoading(true)
            const response = await createTask(taskData);
            handleAddUpdateDeleteItem();
            console.log('Task added successfully:', response);
            // Show a success toast
            toast({
                title: 'Task Added',
                description: 'Task has been added successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
            setBtnLoading(false)
        } catch (error) {
            console.error('Error adding Task', error);
            toast({
                title: 'Error adding Task',
                description: 'There is an error adding the Task, please try again later.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
            setBtnLoading(false)
        } finally {
            onClose();
        }
    };


    return (
        <Box
            spacing={10}
            borderWidth="1px"
            bg={bgColor}
            borderColor={borderColor}
            borderRadius="md"
            p={4}
            shadow="md"
            width="100%"
        >
            <FormControl>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    <Box mb={2}>
                        <FormLabel fontWeight="semibold">Name</FormLabel>
                        <Input
                            style={textStyles}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            type="text"
                        />
                    </Box>
                    <Box mb={2}>
                        <FormLabel fontWeight="semibold">Description</FormLabel>
                        <Input
                            style={textStyles}
                            onChange={(e) =>
                                handleInputChange("description", e.target.value)
                            } // Handle address change
                            type="text"
                        />
                    </Box>
                    <Box mb={2}>
                        <FormLabel fontWeight="semibold">Estimated Time</FormLabel>
                        <Input
                            style={textStyles}
                            onChange={(e) =>
                                handleInputChange("estimatedTime", e.target.value)
                            } // Handle address change
                            type='number'
                        />
                    </Box>
                    <Box mb={2}>
                        <FormLabel fontWeight="semibold">Deadline</FormLabel>
                        <Input
                            style={textStyles}
                            onChange={(e) =>
                                handleInputChange("deadline", e.target.value)
                            }
                            type="date"
                        />
                    </Box>
                </SimpleGrid>
                <Button
                    variant="outline"
                    colorScheme="red"
                    mt={2}
                    mr={2}
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    variant="solid"
                    colorScheme="blue"
                    mt={2}
                    onClick={handleSubmit}
                    isLoading={btnLoading}
                >
                    Add Task
                </Button>
            </FormControl>
        </Box>
    );
};

export default AddTask;
