import { gql } from "@apollo/client";

export const GET_POKEMONS_LIST = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
        artwork
        dreamworld
      }
    }
  }
`;

export const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      abilities {
        ability {
          name
        }
        slot
      }
      base_experience
      forms {
        name
      }
      game_indices {
        game_index
      }
      height
      held_items {
        item {
          name
        }
      }
      is_default
      location_area_encounters
      moves {
        move {
          name
        }
      }
      name
      order
      species {
        name
      }
      sprites {
        front_default
        front_female
        front_shiny
        front_shiny_female
        back_default
        back_female
        back_shiny
        back_shiny_female
      }
      stats {
        effort
        base_stat
      }
      types {
        type {
          name
        }
      }
      weight
      status
      message
    }
  }
`;

export const gqlVariables = {
  limit: 2,
  offset: 1,
};
