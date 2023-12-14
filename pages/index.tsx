import type { NextPage } from "next";
import { Center, Container, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import StakeToken from "../components/StakeToken";
import RewardToken from "../components/RewardToken";
import Stake from "../components/Stake";
import Styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();

/*
    if(!address) {
    return (
      <Container display={'flex'}  justifyContent={'center'} alignContent={'center'} alignItems={'center'} maxW={("100vw")} h={'100vh'} backgroundRepeat={'false'} backgroundSize={'cover'} backgroundImage={'url(https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'} color={'white'}>
        <Flex h={"50vh"} justifyContent={"center"} alignItems={"center"}>
          <Heading>Please Connect a Wallet</Heading>
        </Flex>
      </Container>
    )
  }
*/

  return ( 
    <main className={Styles.main}>
      <div className={Styles.landing_page}>
      <Container display={'flex'}  justifyContent={'center'} alignContent={'center'} alignItems={'end'} maxW={("100vw")} h={'75vh'}>
        <SimpleGrid columns={1} spacing={4} w={'1200px'} py={'10px'}>
          <StakeToken />
          <RewardToken />
        </SimpleGrid>
      </Container>
      </div>
      <Container maxW={("1200px")}>
      <Stake />
      </Container>
    </main>
  );
};
  
export default Home;