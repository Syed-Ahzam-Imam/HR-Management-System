import React, { useState } from 'react'
import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react'
import Loading from '../../components/Loading/Loading';

const Chatbot = ({ sideBarWidth }) => {
    const bgColor = useColorModeValue('white', 'white');

    // const [isLoading, setIsLoading] = useState(true);

    // const handleLoad = () => {
    //     setIsLoading(false);
    // };

    // if (isLoading) {
    //     return (<Loading />)
    // }

    return (
        <Box bg={bgColor} py={8} w="auto" minH="100vh">
            <Container maxW="container.xxl" justifySelf="center">
                <Box
                    ml={{ base: 0, lg: sideBarWidth === "small" ? 14 : 60 }}
                    transition="margin 0.3s ease-in-out"
                >
                    <Heading pb={2}>Resume Finder</Heading>
                    <iframe
                        src="http://localhost:8501/"
                        title="ChatBot"
                        width="100%"
                        height="575px"
                        frameBorder="0"
                        allowFullScreen
                        className="rounded-xl"
                    // onLoad={handleLoad}
                    ></iframe>
                </Box>
            </Container>
        </Box>
    )
}

export default Chatbot