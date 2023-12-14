import { Container, Flex, Heading, flexbox } from "@chakra-ui/react";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Navbar() {
    return (
        <Container width={'100%'} maxW={"100vw"} py={2} padding={'10px 120px'} backgroundColor={'rgba(0,0,0,0.8)'}>
            <Flex display={'flex'} direction={"row"} height={'7vh'} justifyContent={"space-between"} alignContent={'center'} alignItems={'center'}>
                <Heading color={'#fff'}>Token Staking App</Heading>
                <ConnectWallet />
            </Flex>
        </Container>
    )
}