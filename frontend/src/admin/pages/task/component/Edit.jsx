import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    SimpleGrid,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import { updateTask } from "../../../../API/task";

const EditTask = ({ handleAddUpdateDeleteItem, onClose, selectedItem }) => {
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
    const [taskData, setTaskData] = useState(selectedItem);

    const handleInputChange = (field, value) => {
        setTaskData({ ...taskData, [field]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            taskData.estimatedTime = parseInt(taskData.estimatedTime);
            setBtnLoading(true)
            const response = await updateTask(taskData);
            handleAddUpdateDeleteItem();
            console.log('Task added successfully:', response);
            toast({
                title: 'Task Updated',
                description: 'Task has been updated successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
            setBtnLoading(false)
        } catch (error) {
            console.error('Error adding Task', error);
            toast({
                title: 'Error updating Task',
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
                            value={taskData.name}
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
                            value={taskData.description}
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
                            value={taskData.estimatedTime}

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
                            value={taskData.deadline}
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
                    Edit Task
                </Button>
            </FormControl>
        </Box>
    );
};

export default EditTask;
