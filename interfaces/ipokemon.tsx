export interface IPokemonList {
  id: string;
  count: string;
  next: string;
  previous: string;
  results: string;
}

export interface IPokemonItem {
  id: string;
  url: string;
  name: string;
  image: string;
  //   artwork: string;
  //   dreamworld: string;
}

export interface IPokemonDetail {
  id: string;
  url: string;
  name: string;
  image: string;
}
