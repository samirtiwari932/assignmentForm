import { Spinner, Flex } from '@chakra-ui/react';

const Loader = () => {
    return (
        <Flex
            width="100vw"
            height="100vh"
            align="center"
            justify="center"
            backgroundColor="rgba(0,0,0,0.1)" /* Optional: adds a semi-transparent background */
            position="fixed"
            top="0"
            left="0"
            zIndex="999"
        >
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </Flex>
    );
}

export default Loader;
