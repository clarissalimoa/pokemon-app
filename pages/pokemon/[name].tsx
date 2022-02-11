import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  SkeletonCircle,
  SkeletonText,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  Tag,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { GET_POKEMON_DETAIL } from "../../api-config/pokemon";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { pokemonReducer } from "../../utils/reducer";

export default function DetailPokemon() {
  const router = useRouter();
  const { name } = router.query;
  var pokemon: any = {};

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<HTMLInputElement>(null);

  const GetPokemonDetail = () => {
    const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
      variables: { name: name },
    });

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    console.log("Response from server", data);
    pokemon = data["pokemon"];
    return "Success!";
  };
  console.log(GetPokemonDetail());

  const [myPokemons, dispatch] = useReducer(pokemonReducer, [], () => {
    const localData = localStorage.getItem("myPokemons");
    return localData ? JSON.parse(localData) : [];
  });
  useEffect(() => {
    localStorage.setItem("myPokemons", JSON.stringify(myPokemons));
  }, [myPokemons]);

  const [nickname, setNickname] = useState("Eci");
  const [errorNickname, setErrorNickname] = useState(false);

  const openModal = () => {
    setIsOpen(false);
    onOpenModal();
  };

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onCatchPokemon = () => {
    const name = pokemon["name"];
    const image = pokemon["sprites"]["front_default"];
    if (myPokemons.filter((x: any) => x.nickname === nickname).length > 0) {
      console.log(myPokemons.filter((x: any) => x.nickname === nickname));
      setErrorNickname(true);
    } else {
      dispatch({
        type: "CATCH_POKEMON",
        name: name,
        nickname: nickname,
        image: image,
      });
      onCloseModal();
    }
  };

  return (
    <Layout title={name}>
      <Navbar></Navbar>
      <Container maxW={"7xl"}>
        {!pokemon["abilities"] ? (
          <>
            <SkeletonCircle size="250" width={"100%"} />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </>
        ) : (
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Flex>
              <Image
                rounded={"md"}
                alt={"product image"}
                src={pokemon["sprites"]["front_default"]}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {pokemon["name"].toUpperCase()}
                </Heading>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={<StackDivider borderColor={"gray.600"} />}
              >
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={"yellow.300"}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Abilities
                  </Text>
                  {pokemon["abilities"].map((item: any) => {
                    return (
                      <>
                        <Tag margin={"2px"}>{item["ability"]["name"]}</Tag>
                      </>
                    );
                  })}
                </Box>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={"yellow.300"}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Moves
                  </Text>

                  {pokemon["moves"].map((item: any) => {
                    return (
                      <>
                        <Tag margin={"2px"}>{item["move"]["name"]}</Tag>
                      </>
                    );
                  })}
                </Box>
              </Stack>

              <Button colorScheme="red" onClick={() => setIsOpen(true)}>
                Catch Pokemon
              </Button>

              <AlertDialog
                isOpen={isOpen}
                onClose={onClose}
                leastDestructiveRef={cancelRef}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Catch Pokemon
                    </AlertDialogHeader>

                    <AlertDialogBody>Are you sure?</AlertDialogBody>

                    <AlertDialogFooter>
                      <Button onClick={onClose}>Cancel</Button>
                      {/* <Button colorScheme="red" onClick={onCatchPokemon} ml={3}> */}
                      <Button colorScheme="red" onClick={openModal} ml={3}>
                        Catch
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>

              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpenModal}
                onClose={onCloseModal}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Pokemon caught!</ModalHeader>
                  <ModalBody pb={6}>
                    <Stack align={"center"}>
                      <Image
                        rounded={"md"}
                        alt={"product image"}
                        src={pokemon["sprites"]["front_default"]}
                        align={"center"}
                        w={"50%"}
                      />
                    </Stack>
                    <Text>
                      Congratulation! You got new pokemon. Please name your new
                      pokemon.
                    </Text>
                    <FormControl>
                      <FormLabel>Nickname</FormLabel>
                      <Input
                        ref={initialRef}
                        placeholder="Nickname"
                        onChange={handleChangeNickname}
                      />
                    </FormControl>
                    {errorNickname && (
                      <Text
                        fontSize={{ base: "10px", lg: "12px" }}
                        color={"red.300"}
                        mb={"4"}
                      >
                        Pokemon with this nickname has existed! Pick another
                        name
                      </Text>
                    )}
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" onClick={onCatchPokemon} mr={3}>
                      Catch
                    </Button>
                    <Button onClick={onCloseModal}>Release</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Stack>
          </SimpleGrid>
        )}
      </Container>
    </Layout>
  );
}
