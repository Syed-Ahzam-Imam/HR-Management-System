import React, { useState } from 'react';
import { Document } from 'react-pdf';
import { Box, Container, Heading, Button, Text, Flex, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Center } from '@chakra-ui/react';
import { MdUpload } from "react-icons/md";

import ResumeTable from '../components/resume/resumetable';
import { useNavigate } from 'react-router-dom';
import { getImageText, getPDFText, sendToOpenAI, uploadResume } from '../../API/resume';

export function ResumeUpload({ sideBarWidth }) {
    const [resumeData, setResumeData] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfText, setPdfText] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);



    const navigate = useNavigate();
    const onFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const convertToText = async () => {
        console.log(1)
        if (file.type === 'application/pdf') {
            const pdfTextArray = [];
            console.log(2)
            for (let i = 1; i <= numPages; i++) {
                const pageText = await getPDFText(file, i);
                pdfTextArray.push(pageText);
            }
            console.log(3)


            const fullText = pdfTextArray.join('\n');
            setPdfText(fullText);

            // Send the converted text to the Azure OpenAI API
            // sendToOpenAI(fullText);
        } else if (file.type.startsWith('image/')) {
            const imageText = await getImageText(file);
            setPdfText(imageText);
            console.log(4)

            // Send the converted text to the Azure OpenAI API
            // sendToOpenAI(imageText);
        }
    };

    const handleSaveClick = async (resumeData, file) => {
        setLoading(true);

        try {
            const missingFields = [];
            if (!resumeData.name && !resumeData.Name  ) missingFields.push('name');
            if (!resumeData.email && !resumeData.Email) missingFields.push('email');
            if (!resumeData.phone && !resumeData.PhoneNumber && !resumeData.phoneNumber) missingFields.push('phone');
            if (!resumeData.address && !resumeData.location) missingFields.push('address');
            if (!resumeData.applyingPosition) missingFields.push('applyingPosition');



            if (missingFields.length > 0) {
                navigate('/form', { state: { missingFields, resumeData, file } });
                setLoading(false);
                return;
            }

            // Call the uploadResume function to save the resume data and PDF file
            const response = await uploadResume({ resumeDetails: resumeData, pdf: file });

            setLoading(false);
            navigate('/dashboard');
        } catch (error) {
            setLoading(false);
            console.error("Error uploading resume:", error);
        }
    };


    return (
        <Box py={8} w="auto" minH="100vh">
            <Container maxW="container.xxl" justifySelf="center">
                <Box
                    ml={{ base: 0, lg: sideBarWidth === "small" ? 14 : 60 }}
                    transition="margin 0.3s ease-in-out"
                    borderRadius="lg"
                    p={6}
                    shadow="md"
                    minH={'80vh'}
                >
                    <Heading as="h1" size="xl" mb={4}>
                        Upload your resume
                    </Heading>
                    <Flex direction="column" align="center" justify="center" mb={4} mt={20}>
                        <Flex h="40vh" justifyContent="center" alignItems="center">
                            <Flex
                                align="center"
                                justify="center"
                                bg="white"
                                borderRadius="16px"
                                w="80vh"
                                minH="100%"
                                cursor="pointer"
                                bgColor='#023e8a'
                                shadow={'lg'}
                            >
                                <label htmlFor="resumeFile" style={{ cursor: 'pointer' }}>
                                    <Flex
                                        direction="column"
                                        align="center"
                                        justify="center"
                                        p={4}
                                        borderRadius="lg"
                                    >
                                        <Icon as={MdUpload} w="80px" h="80px" color="white" mb={4} />
                                        <Text fontSize="xl" fontWeight="700" color="white">
                                            Upload your Resume
                                        </Text>
                                        <Text fontSize="sm" fontWeight="500" color="white">
                                            Only PDF, DOC, and DOCX files are allowed
                                        </Text>
                                    </Flex>
                                </label>
                                <input
                                    id="resumeFile"
                                    type="file"
                                    accept=".pdf, .doc, .docx"
                                    onChange={onFileChange}
                                    style={{ display: 'none' }}
                                />
                            </Flex>
                        </Flex>

                        {file && (
                            <Text mt={2} fontSize="sm" color="gray.500">
                                {file.name}
                            </Text>
                        )}
                        {file && (
                            <>
                                {file.type === 'application/pdf' ? (
                                    <>
                                        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                                            {/* <Page pageNumber={pageNumber} /> */}
                                        </Document>
                                        {/* <Text>
                                        Page {pageNumber} of {numPages}s
                                    </Text> */}
                                    </>
                                ) : file.type.startsWith('image/') && (
                                    <Box mb={4}>
                                        <img src={URL.createObjectURL(file)} alt="Uploaded Image" />
                                    </Box>
                                )}
                                <Button onClick={convertToText} colorScheme="cyan" color={'white'} mb={4} mt={4} isDisabled={!!pdfText}>
                                    Convert to Text
                                </Button>
                                {pdfText &&
                                    <Box>
                                        <Heading as="h3" size="md" mb={2}>
                                            Converted Text:
                                        </Heading>
                                        <Text whiteSpace="pre-wrap">{pdfText}</Text>
                                    </Box>
                                }
                                {pdfText && (
                                    <Button
                                        onClick={() => sendToOpenAI(pdfText, setResumeData, setBtnLoading)}
                                        colorScheme="cyan"
                                        color={'white'}
                                        mb={4}
                                        mt={4}
                                        isDisabled={!!resumeData}
                                        isLoading={btnLoading}
                                    >
                                        Get Resume Details
                                    </Button>
                                )}

                            </>
                        )}
                    </Flex>
                    {resumeData &&
                        <Box>
                            <Heading as="h3" size="md" mb={2}>
                                Resume Table
                            </Heading>
                            <ResumeTable resumeData={resumeData} />
                            <Button
                                onClick={() => handleSaveClick(resumeData, file)}
                                colorScheme="cyan"
                                color={'white'}
                                mb={4}
                                mt={4}
                            >
                                Save
                            </Button>

                        </Box>

                    }
                </Box>
                {loading && (
                    <Modal isOpen={loading} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Processing...</ModalHeader>
                            <ModalBody>
                                <Center>
                                    <Text>Your request is being processed. Please wait...</Text>
                                </Center>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                )}
            </Container>
        </Box>
    );
}
