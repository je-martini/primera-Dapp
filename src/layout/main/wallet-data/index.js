import {
    Flex,
    Button,
    Tag,
    TagLabel,
    Badge,
    TagCloseButton,
  } from "@chakra-ui/react";
  import { AddIcon } from "@chakra-ui/icons";
  import { Link } from "react-router-dom";
  import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
  import { connector } from "../../../config/web3";
  import { useCallback, useEffect, useState } from "react";
  import useTruncatedAddress from "../../../hooks/useTruncatedAddress";
  
  const WalletData = () => {
    const { active ,activate, deactivate, account, error } = useWeb3React();

    const isUnsupportedChain = error instanceof UnsupportedChainIdError;

    const connect = useCallback(() => {
        activate(connector);
        localStorage.setItem('previouslyConnected', "true");
    }, [activate]);

    const disconnect = () => {
      deactivate();
    };

    useEffect(() => {
      if(localStorage)
      connect();
    }, [connect]);

    return (
      <Flex alignItems={"center"}>
        {active ? (
          <Tag colorScheme="green" borderRadius="full">
            <TagLabel>
              <Link to="/punks">{account}</Link>
            </TagLabel>
            <Badge
              d={{
                base: "none",
                md: "block",
              }}
              variant="solid"
              fontSize="0.8rem"
              ml={1}
            >
              ~{balance} Ξ
            </Badge>
            <TagCloseButton 
            onClick= {disconnect}/>
          </Tag>
        ) : (
          <Button
            variant={"solid"}
            colorScheme={"green"}
            size={"sm"}
            leftIcon={<AddIcon />}
            onClick={connect}
            disabled={isUnsupportedChain}
            >
              {isUnsupportedChain ? "red no soportada" : "Conectar wallet"}
            </Button>
        )}
      </Flex>
    );
  };
  
  export default WalletData;    