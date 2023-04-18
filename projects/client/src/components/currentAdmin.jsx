import {
    Flex, Text, Heading
} from '@chakra-ui/react';

export default function CurrentAdmin() {
    return (
        <Flex w='100%' h='80px' pl={5}>
            <Flex direction='column' justify='center' w={['40%','30%','25%','20%','15%']}>
                <Heading size={['xs','sm','md']}>
                    Hello Erwin
                </Heading>
                <Text fontSize={['xs','sm','md']}>
                    Batam
                </Text>
            </Flex>
        </Flex>
    )
}