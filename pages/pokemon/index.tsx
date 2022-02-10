import { useQuery } from "@apollo/client";
import {
  Box,
  Stack,
  Text,
  Image,
  Flex,
  Heading,
  useColorModeValue,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";
import { GET_POKEMONS_LIST } from "../../api-config/pokemon";
import Layout from "../../components/Layout";
import { css } from "@emotion/css";
import Link from "next/link";

export default function Simple() {
  var pokemons = ["pokemon"];

  const GetPokemons = () => {
    const { loading, error, data } = useQuery(GET_POKEMONS_LIST, {
      variables: { limit: 24, offset: 1 },
    });

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    pokemons = data["pokemons"]["results"];
    return "Success!";
  };
  console.log(GetPokemons());
  console.log("Pokemons: " + JSON.stringify(pokemons));

  return (
    <Layout title="Pokemon List">
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
                        <Flex>
                          <Image
                            rounded={"md"}
                            alt={"product image"}
                            src={item["dreamworld"]}
                            align={"center"}
                            h={"130px"}
                          />
                        </Flex>
                        <Stack pt={10} align={"center"}>
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
                            bg={useColorModeValue("red.300", "red.700")}
                            px={3}
                            py={1}
                            color={useColorModeValue("gray.900", "gray.300")}
                            fontSize="sm"
                            fontWeight="600"
                            rounded="xl"
                          >
                            Owned:
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
  );
}
