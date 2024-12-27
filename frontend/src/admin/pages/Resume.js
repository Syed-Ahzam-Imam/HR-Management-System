import React, { useEffect, useState } from "react";
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    Text,
    useColorModeValue,
    InputGroup,
    InputLeftElement,
    Select,
    Flex,
    Input,
    Container,
    Heading,
    Progress,
    Tooltip, // Add this import
    Icon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useToast,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import {
    BiSearch,
    BiChevronLeft,
    BiChevronRight,
    BiInfoCircle,
} from "react-icons/bi";
import { deleteResumeById, getAllResumes } from "../../API/resume";
import Loading from "../../components/Loading/Loading";
import { BASE_URL } from "../../API/constants";
import { Link } from "react-router-dom";
import DeleteAlert from "../../components/DeleteAlert";
import { HiDotsVertical } from "react-icons/hi";
import { FiTrash2 } from "react-icons/fi";


const customers = [
    {
        firstName: 'Syed Ahzam',
        lastName: 'Imam',
        address: 'Deluxe Bungalows,Scheme-33',
        phoneNumber: '03032485722',
        city: 'Karachi',
        experience: 90,
        branchName: 'Gulshan Head Office',
        position: '.Net Developer'
    },
    {
        firstName: 'Muhammad Uzair',
        lastName: 'Javed',
        address: 'Block-1,Gulshan-e-Iqbal',
        phoneNumber: '03042892094',
        city: 'Karachi',
        experience: 85,
        branchName: 'Gulshan Head Office',
        position: 'DevOps Engineer'

    },
    {
        firstName: 'Ahmed Raza',
        lastName: 'Siddiqui',
        address: 'Block-7,Gulshan-e-Iqbal',
        phoneNumber: '03341756754',
        city: 'Karachi',
        experience: 70,
        branchName: 'PECHS Office',
        position: 'Cloud Security Officer'


    },
    {
        firstName: 'Ali Haider',
        lastName: 'Kazmi',
        address: 'F-11 Markaz',
        phoneNumber: '03212348768',
        city: 'Islamabad',
        experience: 40,
        branchName: 'F7 Office',
        position: 'React Developer'

    },
    {
        firstName: 'Muhammad Ali',
        address: 'F-9 Street',
        lastName: 'Sheikh',
        phoneNumber: '03042788765',
        city: 'Islamabad',
        experience: 45,
        branchName: 'Islamabad Head Office',
        position: 'AI Engineer'
    },
];


const Resume = ({ sideBarWidth }) => {

    const borderColor = useColorModeValue("gray.200", "gray.600");
    const [searchTerm, setSearchTerm] = useState("");
    const bgColor = useColorModeValue("white", "gray.700");
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("");
    const [selectedExperience, setSelectedExperience] = useState("");
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);


    const [resumes, setResumes] = useState([]); // State to store fetched resumes
    const [resumePDF, setResumePDF] = useState(''); // State to store fetched resumes

    const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false); // State to control the experience modal
    const [experienceModalData, setExperienceModalData] = useState([]); // State to store the experience data for the modal
    const toast = useToast();
    // Function to handle the click on the experience icon
    const handleExperienceClick = (experience) => {
        try {
            const experienceDetails = Object.entries(experience).map(([key, value]) => {
                // Format the key
                const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
                const stringKey = String(formattedKey);
                console.log(key);
                if (/^\d+:$/.test(stringKey)) return null;

                // Check if the value is an object
                if (typeof value === 'object' && value !== null) {
                    // If it's an object, format its contents with line breaks and bold formatting
                    const formattedValue = Object.entries(value).map(([subKey, subValue]) =>
                        `<b>${subKey.charAt(0).toUpperCase() + subKey.slice(1).replace(/_/g, ' ')}:</b> ${subValue}<br>`
                    ).join('');
                    console.log(`<b>${formattedKey}:</b><br>${formattedValue}`)
                    const stringKey = String(formattedKey);
                    if (/^\d+:$/.test(stringKey)) return null;

                    return `<b>${formattedKey}:</b><br>${formattedValue}`;
                }
                // If it's not an object, return the key-value pair in bold
                return `<b>${formattedKey}:</b> ${value}<br>`;
            });

            setExperienceModalData(experienceDetails); // Set the experience data for the modal
            setIsExperienceModalOpen(true); // Open the experience modal
        } catch (error) {
            console.error("Error handling experience:", error);
            toast({
                title: "Experience not available",
                status: "error",
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
            // Handle error here, such as showing a message to the user
        }
    };


    // Function to close the experience modal
    const handleCloseExperienceModal = () => {
        setIsExperienceModalOpen(false);
    };
    const fetchResumes = async () => {
        try {
            const response = await getAllResumes();
            console.log("response", response.resumes);
            setResumes(response.resumes);

        } catch (error) {
            console.error("Error fetching resumes:", error);
        }
    };

    useEffect(() => {


        fetchResumes();
    }, []);


    const handleRowClick = (pdfUrl) => {

        const newWindow = window.open(`${BASE_URL}/${pdfUrl}`, '_blank');
        if (newWindow) {
            newWindow.opener = null; // Set opener to null to prevent access to the parent window
        } else {
            console.error('Unable to open PDF in a new window.');
        }
    };


    const handleBranchChange = (event) => {
        const branch = event.target.value;
        setSelectedBranch(branch);
    };
    const handlePositionChange = (event) => {
        const position = event.target.value;
        setSelectedPosition(position);
    };
    const handleExperienceChange = (event) => {
        const experience = event.target.value;
        setSelectedExperience(experience);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSearchChange = (event) => {
        const searchText = event.target.value?.toLowerCase();
        setSearchTerm(searchText);
    };

    const handleDeleteClick = (item) => {
        console.log('item', item)
        setSelectedItemId(item.resumeId);
        // setEmployeeName(item.name);
        setIsDeleteAlertOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            console.log("selectedItemId", selectedItemId);
            await deleteResumeById(selectedItemId);
            fetchResumes();
            toast({
                title: "Resume Deleted",
                description: `All data for this resume has been deleted.`,
                status: "success",
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
            setIsDeleteAlertOpen(false);
        } catch (error) {
            console.error("Error deleting Task:", error);

            // Display an error message using useToast
            toast({
                title: "Error",
                description: "Error deleting resume",
                status: "error",
                duration: 3000,
                position: "top-right",
                isClosable: true,
            });
            setIsDeleteAlertOpen(false);

        }
    };



    const filteredItems = resumes?.flatMap(resume => resume.resumeDetails) // Flatten the array of resumeDetails
        .filter(
            (item) =>
                (item.name?.toLowerCase().includes(searchTerm) ||
                    item.location?.toLowerCase().includes(searchTerm)) &&
                (selectedBranch === "" || item.branchName === selectedBranch) &&
                (selectedPosition === "" || item.position === selectedPosition) &&
                (selectedExperience === "" || item.experience === selectedExperience)
        );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    if (!filteredItems) {
        return (<Loading />)
    }

    return (
        <Box bg={bgColor} py={8} w="auto" minH="100vh">
            <Container maxW="container.xxl" justifySelf="center">
                <Box
                    ml={{ base: 0, lg: sideBarWidth === "small" ? 14 : 60 }}
                    transition="margin 0.3s ease-in-out"
                >
                    <Heading as="h1" size="xl" mb={10}>
                        Resume Management
                    </Heading>
                    <Box
                        bg={bgColor}
                        borderWidth="1px"
                        borderColor={borderColor}
                        borderRadius="md"
                        p={4}
                        shadow="md"
                        mx="auto"
                    >
                        <Flex align="center" mb={4} justify="space-between">
                            <Flex align="center" w="50%">
                                <InputGroup w="100%" size={"sm"}>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.400"
                                        fontSize="1.2em"
                                        ml={2}
                                    >
                                        <BiSearch />
                                    </InputLeftElement>
                                    <Input
                                        placeholder="Search by name of the Employee"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        borderRadius="0.3rem"
                                        py={2}
                                        pl={10}
                                        pr={3}
                                        fontSize="md"
                                        mr={4}
                                        _placeholder={{ color: "gray.400" }}
                                    />
                                </InputGroup>
                            </Flex>
                            <Flex >
                                <Select
                                    placeholder="All Positions"
                                    value={selectedPosition}
                                    onChange={handlePositionChange}
                                    borderRadius="0.3rem"
                                    py={2}
                                    fontSize="md"
                                    mr={4}
                                >
                                    {[...new Set(customers.map((branch) => branch.position))].map(
                                        (position) => (
                                            <option key={position} value={position}>
                                                {position}
                                            </option>
                                        )
                                    )}
                                </Select>
                            </Flex>
                            <Flex align="center">
                                <Link to="/resumechat">
                                    <Button
                                        variant="solid"
                                        colorScheme="cyan"
                                        size="md"
                                        color={'white'}
                                    >
                                        Find Candidate
                                    </Button>
                                </Link>
                            </Flex>
                        </Flex>
                        <Table variant="simple" size={"md"} >
                            <Thead>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Address</Th>
                                    <Th>Contact</Th>
                                    <Th>Email</Th>
                                    <Th>Applied For</Th>
                                    <Th>Experience</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {currentItems?.map((item) => (
                                    <Tr key={item.resumeId}>
                                        <Td
                                            onClick={() => handleRowClick(item.pdf)}
                                            cursor="pointer"
                                            _hover={{ fontWeight: "bold" }}
                                            color="gray.600"  // Set the font color to gray.600
                                        >
                                            {item.name || item.Name}
                                        </Td>
                                        <Td color="gray.600">{item.location}</Td>
                                        <Td color="gray.600">{item.phone}</Td>
                                        <Td color="gray.600">{item.email}</Td>
                                        <Td color="gray.600">{item.applyingPosition}</Td>
                                        <Td>
                                            <Button
                                                _hover={{ color: "gray.600" }}
                                                onClick={() => handleExperienceClick(item.experience)}
                                                bg={'cyan.400'}
                                                size={'sm'}
                                                color={'white'}
                                                ml={4}
                                                disabled={!item.experience} // Disable the button if experience is not defined or null
                                            >
                                                View
                                            </Button>
                                        </Td>
                                        <Td>
                                            <Menu>
                                                <MenuButton
                                                    as={IconButton}
                                                    icon={<HiDotsVertical />}
                                                    variant="ghost"
                                                    size="sm"
                                                />
                                                <MenuList>
                                                    <MenuItem
                                                        icon={<FiTrash2 />}
                                                        onClick={() => handleDeleteClick(item)}
                                                    >
                                                        Delete
                                                    </MenuItem>
                                                </MenuList>

                                            </Menu>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                        <Flex justify="space-between" mt={4} align="center">
                            <Box>
                                <IconButton
                                    icon={<BiChevronLeft />}
                                    isDisabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    aria-label="Previous Page"
                                />
                                <IconButton
                                    icon={<BiChevronRight />}
                                    isDisabled={indexOfLastItem >= filteredItems.length}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    ml={2}
                                    aria-label="Next Page"
                                />
                            </Box>
                            <Text fontSize="smaller">
                                Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}
                            </Text>
                        </Flex>
                    </Box>
                </Box>
                <DeleteAlert
                    isOpen={isDeleteAlertOpen}
                    onClose={() => setIsDeleteAlertOpen(false)}
                    onConfirmDelete={handleConfirmDelete}
                    HeaderText={"Delete resume"}
                    BodyText={`Are you sure you want to delete this resume ?`}
                />
            </Container>
            <Modal isOpen={isExperienceModalOpen} onClose={handleCloseExperienceModal}>
                <ModalOverlay />
                <ModalContent maxW="5xl">
                    <ModalHeader>Experience Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight="bold" fontSize={'xl'}>Experiences:</Text>
                        {/* Render the experience data */}
                        {experienceModalData.map((experience, index) => (
                            <div key={index}>
                                <Text fontSize={'md'} fontWeight={'bold'}>Experience Number {index + 1}:</Text>
                                <div dangerouslySetInnerHTML={{ __html: experience }} />
                            </div>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="cyan" color={'white'} onClick={handleCloseExperienceModal}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>



        </Box>
    );
};

export default Resume;
