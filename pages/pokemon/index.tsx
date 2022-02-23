import { useQuery } from "@apollo/client";
import {
  Box,
  Stack,
  Text,
  Image,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";
import { GET_POKEMONS_LIST } from "../../api-config/pokemon";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import { css } from "@emotion/css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Pokemons() {
  var pokemons = ["pokemon"];

  const [myPokemons, setMyPokemons] = useState<any>([]);

  useEffect(() => {
    setMyPokemons(JSON.parse(localStorage.getItem("myPokemons") + ""));
  }, []);

  const GetPokemons = () => {
    const { loading, error, data } = useQuery(GET_POKEMONS_LIST, {
      variables: { limit: 100, offset: 1 },
    });

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    pokemons = data["pokemons"]["results"];
    return "Success!";
  };
  console.log(GetPokemons());

  return (
    <>
      <Layout title="Pokemon List">
        <Navbar></Navbar>

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
              bg: "red.400",
              zIndex: -1,
            }}
          >
            Pokemon
          </Text>
          <br />
          <Text as={"span"} color={"red.400"}>
            catch em all!
          </Text>
        </Heading>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }}>
          {pokemons.length == 1
            ? [...Array(4)].map(() => {
                return (
                  <>
                    <Skeleton
                      height="300px"
                      className={css`
                        margin: 10px;
                      `}
                    />
                  </>
                );
              })
            : pokemons.map((item: any, index: number) => {
                return (
                  <>
                    <Link href={"/pokemon/" + item["name"]} passHref>
                      <Flex
                        className={css`
                          margin: 10px;
                        `}
                      >
                        <Box
                          role={"group"}
                          p={6}
                          maxW={"330px"}
                          w={"full"}
                          boxShadow={"2xl"}
                          rounded={"lg"}
                          pos={"relative"}
                          zIndex={1}
                        >
                          <Stack pt={10} align={"center"}>
                            <Flex>
                              <Image
                                rounded={"md"}
                                alt={"product image"}
                                src={item["dreamworld"]}
                                align={"center"}
                                h={"130px"}
                              />
                            </Flex>
                            <Text
                              color={"gray.500"}
                              fontSize={"sm"}
                              textTransform={"uppercase"}
                            >
                              #{index + 1}
                            </Text>
                            <Heading
                              fontSize={20}
                              fontFamily={"body"}
                              fontWeight={500}
                            >
                              {item["name"].charAt(0).toUpperCase() +
                                item["name"].slice(1)}
                            </Heading>
                            <Text
                              textTransform="uppercase"
                              bg={"red.700"}
                              px={3}
                              py={1}
                              color={"white"}
                              fontSize="sm"
                              fontWeight="600"
                              rounded="xl"
                            >
                              Owned:{" "}
                              {myPokemons != null &&
                                myPokemons.filter(
                                  (x: any) => x.name === item["name"]
                                ).length}
                            </Text>
                          </Stack>
                        </Box>
                      </Flex>
                    </Link>
                  </>
                );
              })}
        </SimpleGrid>
      </Layout>
    </>
  );
}
