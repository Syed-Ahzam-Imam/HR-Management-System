// Form.js
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Spinner,
    VStack,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { uploadResume } from '../../API/resume';

const Form = ({ sideBarWidth }) => {
    const bgColor = useColorModeValue("white", "gray.700");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const { missingFields, resumeData, file } = location.state;
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Append the missing fields to resumeData
        const updatedResumeData = { ...resumeData, ...formData };

        try {
            // Call the uploadResume function to save the resume data and PDF file
            const response = await uploadResume({ resumeDetails: updatedResumeData, pdf: file });

            setIsSubmitting(false);
            toast({
                title: "Form Submitted",
                description: "The form has been submitted successfully.",
                status: "success",
                duration: 3000,
                position: "top-right",
                isClosable: true,
            });
            navigate('/dashboard');
        } catch (error) {
            setIsSubmitting(false);
            console.error("Error uploading resume:", error);
            // Handle the error appropriately
        }
    };

    return (
        <Box bg={bgColor} py={8} w="auto" minH="100vh">
            <Container maxW="container.xxl" justifySelf="center">
                <Box
                    ml={{ base: 0, lg: sideBarWidth === "small" ? 14 : 60 }}
                    transition="margin 0.3s ease-in-out"
                >
                    <Heading as="h1" size="xl" mb={4}>
                        Form
                    </Heading>
                    <Heading as="h2" size="md" mb={10}>
                        Please enter the following details as we did not find them in your resume.
                    </Heading>
                    <Box p={4}>
                        <VStack align="start" spacing={4}>
                            {missingFields.includes('name') && (
                                <FormControl>
                                    <FormLabel htmlFor="name">Name</FormLabel>
                                    <Input type="text" id="name" placeholder="Enter your name" onChange={handleChange} />
                                </FormControl>
                            )}
                            {missingFields.includes('email') && (
                                <FormControl>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input type="email" id="email" placeholder="Enter your email" onChange={handleChange} />
                                </FormControl>
                            )}
                            {missingFields.includes('phone') && (
                                <FormControl>
                                    <FormLabel htmlFor="phone">Phone</FormLabel>
                                    <Input type="tel" id="phone" placeholder="Enter your phone number" onChange={handleChange} />
                                </FormControl>
                            )}
                            {missingFields.includes('address') && (
                                <FormControl>
                                    <FormLabel htmlFor="phone">Address</FormLabel>
                                    <Input type="text" id="address" placeholder="Enter your address" onChange={handleChange} />
                                </FormControl>
                            )}
                            <FormControl>
                                <FormLabel htmlFor="phone">Applying Position</FormLabel>
                                <Input type='text' id="applyingPosition" placeholder="Enter the position you are appyling for" onChange={handleChange} />
                            </FormControl>
                            <Button
                                onClick={handleSubmit}
                                minW="140px"
                                variant="solid"
                                colorScheme="cyan"
                                color={'white'}
                                fontWeight="500"
                                isSubmitting={isSubmitting}
                                loadingText="Submitting"
                                isDisabled={isSubmitting}
                                mt={5}
                            >
                                {isSubmitting ? <Spinner size="sm" color="white" mr={2} /> : null}
                                Submit
                            </Button>
                        </VStack>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Form;
