import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import { pokemonReducer } from "../../utils/reducer";
import {
  Box,
  Stack,
  Text,
  Image,
  Flex,
  Heading,
  SimpleGrid,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
} from "@chakra-ui/react";
import { css } from "@emotion/css";

import Link from "next/link";

export default function MyPokemons() {
  const [myPokemons, setMyPokemons] = useState<any>([]);

  useEffect(() => {
    setMyPokemons(JSON.parse(localStorage.getItem("myPokemons") + ""));
  }, []);

  // const [myPokemons, dispatch] = useReducer(pokemonReducer, [], () => {
  //   const localData = localStorage.getItem("myPokemons");
  //   return localData ? JSON.parse(localData) : [];
  // });

  useEffect(() => {
    localStorage.setItem("myPokemons", JSON.stringify(myPokemons));
  }, [myPokemons]);

  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const onReleasePokemon = () => {
    console.log("Release Pokemon");
    // dispatch({ type: "RELEASE_POKEMON", nickname: nickname });
    setMyPokemons(myPokemons.filter((x: any) => x.nickname !== nickname));
    onClose();
    toast({
      description: "Pokemon released",
      status: "success",
      duration: 2000,
    });
  };

  const openModal = (nick: string) => {
    setIsOpen(true);
    setNickname(nick);
  };

  const toast = useToast();

  return (
    <>
      <Layout title="My Pokemons">
        <Navbar></Navbar>
        {myPokemons == null || myPokemons.length < 1 ? (
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text as={"span"} color={"red.400"}>
              You have no
            </Text>
            <br />
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
                bg: "red.400",
                zIndex: -1,
              }}
            >
              Pokemon
            </Text>
            <br />
            <Text as={"span"} color={"red.400"}>
              Go catch em all!
            </Text>
          </Heading>
        ) : (
          <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }}>
            {myPokemons.map((item: any, index: number) => {
              return (
                <>
                  <Flex
                    className={css`
                      margin: 10px;
                    `}
                  >
                    <Box
                      role={"group"}
                      p={2}
                      maxW={"330px"}
                      w={"full"}
                      boxShadow={"2xl"}
                      rounded={"lg"}
                      pos={"relative"}
                      zIndex={1}
                    >
                      <Link href={"/pokemon/" + item["name"]} passHref>
                        <Stack pt={10} align={"center"}>
                          <Image
                            rounded={"md"}
                            alt={"product image"}
                            src={item["image"]}
                            align={"center"}
                            h={"130px"}
                          />
                          <Text
                            color={"gray.500"}
                            fontSize={"sm"}
                            textTransform={"uppercase"}
                          >
                            {item["name"].charAt(0).toUpperCase() +
                              item["name"].slice(1)}
                          </Text>
                          <Heading
                            fontSize={20}
                            fontFamily={"body"}
                            fontWeight={500}
                          >
                            {item["nickname"]}
                          </Heading>
                        </Stack>
                      </Link>
                      <Stack pt={10} align={"center"}>
                        <Button
                          colorScheme="red"
                          onClick={() => openModal(item["nickname"])}
                          ml={3}
                        >
                          Release
                        </Button>
                      </Stack>
                    </Box>
                  </Flex>
                </>
              );
            })}
          </SimpleGrid>
        )}
      </Layout>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Release Pokemon
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure?</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="red" onClick={onReleasePokemon} ml={3}>
                Release
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
