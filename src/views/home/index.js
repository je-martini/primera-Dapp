import {
    Stack,
    Flex,
    Heading,
    Text,
    Button,
    Image,
    Badge,
    useToast
  } from "@chakra-ui/react";
  import { Link } from "react-router-dom";
  import { useWeb3React } from "@web3-react/core";
  import useJesuspunks from "../../hooks/useJesuspunks";
  import { useCallback, useEffect, useState } from "react";

  
const Home = () => {

    const [isMinting, setIsMinting] = useState(false);
    const [imageSrc, setImageSrc] = useState("");
    const { active, account } = useWeb3React();
    const jesuspunks = useJesuspunks();
    const toast = useToast();

    const getJesuspunksData = useCallback(async() => {
      if (jesuspunks){
        const totalSupply = await jesuspunks.methods.totalSupply().call();
        const dnaPreview = await jesuspunks.methods.deterministicPseudoRandomDNA(
          totalSupply,
          account)
          .call(); 
          const image = await jesuspunks.methods.imageByDNA(dnaPreview).call() ;
          setImageSrc(image);
        }
    }, [jesuspunks, account]);

    useEffect(() =>{
      getJesuspunksData();
    }, [getJesuspunksData]);

    const mint = () => {
      setIsMinting (true);

      jesuspunks.methods.mint().send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        toast({
          title: 'transaccion enviada',
          description: txHash,
          status: 'info'
        })
      })
      .on("receipt", () => {
        setIsMinting(false);
        toast({
          title: 'transaccion confirmada',
          description: 'nunca pares de aprender',
          status: 'success'
        })
      })
      .on("error", (error) => {
        setIsMinting(false);
        toast({
          title: 'transaccion fallida',
          description: error.message,
          status: 'error'
        })
      })

      

    };

    return (
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "#efb710",
                zIndex: -1,
              }}
            >
              Un Super Punk
            </Text>
            <br />
            <Text as={"span"} color={"green.400"}>
              Siempre a la Moda
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Estos Punks son una colección de Avatares randomizados cuya metadata
            es almacenada on-chain. Poseen características Unicas ademas de Super Poderosas 
            y sólo hay 10000 en existencia.
          </Text>
          <Text color={"gray.500"}>
            Cada Punk se genera de forma secuencial basado en tu address,
            usa el previsualizador para averiguar cuál sería tu Punk si
            minteas en este momento
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"#efb710"}
              bg={"#efb710"}
              _hover={{ bg: "#c79912" }}
              disabled={!jesuspunks}
              onClick={mint}
              isLoading={isMinting}
            >
              <Text color={"black"}>Obtén tu punk</Text>
            </Button>
            <Link to="/punks">
              <Button bg={"green.400"} rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
              <Text color={"black"}>Galería</Text>
              </Button>
            </Link>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          direction="column"
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Image src={active ? imageSrc : "https://avataaars.io/"} />
          {active ? (
            <>
              <Flex mt={2}>
                <Badge>
                  Next ID:
                  <Badge ml={1} colorScheme="green">
                    1
                  </Badge>
                </Badge>
                <Badge ml={2}>
                  Address:
                  <Badge ml={1} colorScheme="green">
                    0x0000...0000
                  </Badge>
                </Badge>
              </Flex>
              <Button
                onClick={getJesuspunksData}
                mt={4}
                size="xs"
                colorScheme={"#efb710"}
              bg={"#efb710"}
              >
                <Text color="black">Actualizar</Text>
              </Button>
            </>
          ) : (
            <Badge mt={2}>Wallet desconectado</Badge>
          )}
        </Flex>
      </Stack>
    );
  };
  
  export default Home;