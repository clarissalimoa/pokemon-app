export const pokemonReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CATCH_POKEMON": {
      return [
        ...state,
        { name: action.name, nickname: action.nickname, image: action.image },
      ];
    }
    case "RELEASE_POKEMON":
      return state.filter((x: any) => x.nickname !== action.nickname);
    default:
      return state;
  }
};
