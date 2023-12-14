import { Box, Card, Flex, Heading, Input, SimpleGrid, Skeleton, Stack, Text, useToast } from "@chakra-ui/react";
import { Web3Button, useAddress, useContract, useContractRead, useTokenBalance } from "@thirdweb-dev/react";
import { REWARD_TOKEN_ADDRESSES, STAKE_CONTRACT_ADDRESSES, STAKE_TOKEN_ADDRESSES } from "../constants/addresses";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function Stake() {
    const address = useAddress();
  
    const { contract: stakeTokenContract } = useContract(
      STAKE_TOKEN_ADDRESSES, "token");
    const { contract: rewardTokenContract } = useContract(
      REWARD_TOKEN_ADDRESSES, "token");
    const { contract: stakeContract } = useContract(
      STAKE_CONTRACT_ADDRESSES, "custom");
  
    const {
      data: stakeInfo,
      refetch: refetchStakeInfo,
      isLoading: loadingStakeInfo,
    } = useContractRead(stakeContract, "getStakeInfo", [address]);
  
    const { data: stakeTokenBalance, isLoading: loadingStakeTokenBalance } =
      useTokenBalance(stakeTokenContract, address);
  
    const { data: rewardTokenBalance, isLoading: loadingRewardTokenBalance } =
      useTokenBalance(rewardTokenContract, address);
  
    useEffect(() => {
      setInterval(() => {
        refetchStakeInfo();
      }, 10000);
    }, []);
  
    const [stakeAmount, setStakeAmount] = useState<string>("0");
    const [unstakeAmount, setUnstakeAmount] = useState<string>("0");
  
    function resetValue() {
      setStakeAmount("0");
      setUnstakeAmount("0");
    }
  
    const toast = useToast();
  
    return (
      <Card p={5} mt={10} backgroundColor={'none'} color={'white'}>
        <Heading>Earn Reward Token</Heading>
        <SimpleGrid columns={2}>
          <Card p={5} m={5} backgroundColor={'rgba(223, 21, 255, 0.1)'}>
            <Box textAlign={"center"} mb={5} color={'white'}>
              <Text fontSize={"xl"} fontWeight={"bold"} color={'white'}>
                Stake Token:
              </Text>
              <Skeleton isLoaded={!loadingStakeInfo && !loadingStakeTokenBalance}>
                {stakeInfo && stakeInfo[0] ? (
                  <Text color={'white'}>
                    {ethers.utils.formatEther(stakeInfo[0])}
                    {" $" + stakeTokenBalance?.symbol}
                  </Text>
                ) : (
                  <Text>0</Text>
                )}
              </Skeleton>
            </Box>
            <SimpleGrid columns={2} spacing={4}>
              <Stack spacing={4}>
                <Input color={'white'}
                  type="number"
                  max={stakeTokenBalance?.displayValue}
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                />
                <Web3Button
                  contractAddress={STAKE_CONTRACT_ADDRESSES}
                  action={async (contract) => {
                    await stakeTokenContract?.erc20.setAllowance(
                      STAKE_CONTRACT_ADDRESSES,
                      stakeAmount
                    );
  
                    await contract.call("stake", [
                      ethers.utils.parseEther(stakeAmount),
                    ]);
                    resetValue();
                  }}
                  onSuccess={() =>
                    toast({
                      title: "Stake Successful",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    })
                  }
                >
                  Stake
                </Web3Button>
              </Stack>
              <Stack spacing={4}>
                <Input color={'white'}
                  type="number"
                  value={unstakeAmount}
                  onChange={(e) => setUnstakeAmount(e.target.value)}
                />
                <Web3Button
                  contractAddress={STAKE_CONTRACT_ADDRESSES}
                  action={async (contract) => {
                    await contract.call("withdraw", [
                      ethers.utils.parseEther(unstakeAmount),
                    ]);
                  }}
                  onSuccess={() =>
                    toast({
                      title: "Unstake Successful",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    })
                  }
                >
                  Unstake
                </Web3Button>
              </Stack>
            </SimpleGrid>
          </Card>
          <Card p={5} m={5} backgroundColor={'rgba(223, 21, 255, 0.1)'} color={'white'}>
            <Flex
              h={"100%"}
              justifyContent={"space-between"}
              direction={"column"}
              textAlign={"center"}
            >
              <Text fontSize={"xl"} fontWeight={"bold"}>
                Reward Token:
              </Text>
              <Skeleton
                isLoaded={!loadingStakeInfo && !loadingRewardTokenBalance}
              >
                {stakeInfo && stakeInfo[0] ? (
                  <Box>
                    <Text fontSize={"xl"} fontWeight={"bold"} color={'white'}>
                      {ethers.utils.formatEther(stakeInfo[1])}
                    </Text>
                    <Text color={'white'}>{" $" + rewardTokenBalance?.symbol}</Text>
                  </Box>
                ) : (
                  <Text>0</Text>
                )}
              </Skeleton>
              <Web3Button
                contractAddress={STAKE_CONTRACT_ADDRESSES}
                action={async (contract) => {
                  await contract.call("claimRewards");
                  resetValue();
                }}
                onSuccess={() =>
                  toast({
                    title: "Rewards Claimed",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  })
                }
              >
                Claim
              </Web3Button>
            </Flex>
          </Card>
        </SimpleGrid>
      </Card>
    );
  }