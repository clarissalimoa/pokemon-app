import React from "react";
import { NextPage } from "next";
import Layout from "../../components/Layout";

const MyPokemonPage: NextPage = () => {
  return (
    <>
      <Layout title="My Pokemons">
        <p>My Pokemon List</p>
      </Layout>
    </>
  );
};

export default MyPokemonPage;
