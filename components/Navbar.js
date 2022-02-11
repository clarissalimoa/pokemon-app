import { Box, Stack, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Navbar(props) {
  return (
    <div>
      <Box>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Link href="/pokemon" passHref>
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              href={"#"}
            >
              All Pokemons
            </Button>
          </Link>
          <Link href="/pokemon/my" passHref>
            <Button
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              href={"#"}
              _hover={{
                bg: "pink.300",
              }}
            >
              My Pokemon
            </Button>
          </Link>
        </Stack>
      </Box>
    </div>
  );
}
