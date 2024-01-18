// The reason for using TEXT.ts constant file is I have no interest
// in using i18n for this project.

const TEXT = {
  filters: {
    pokemon: {
      aria: {
        label: 'Pokemon Filter',
        search: 'Search Pokemons',
        tabList: 'Pokemon Filter List',
      },
      filter: {
        search: 'Search',
        searchPlaceholder: 'Enter Pokemon name...',
        type: 'Type',
        typeAll: 'All Types',
      },
      tabs: {
        all: 'All Pokemons',
        favorites: 'My Favorites',
      },
      title: 'Browse Pokemons',
      viewTypeOptions: {
        grid: 'Grid',
        list: 'List',
        title: 'View Type',
      },
    },
  },
  meta: {
    appTitle: 'Pokedex',
  },
  pokemonList: {
    overlay: {
      viewDetail: 'View detail',
    },
  },
  ui: {
    setDarkMode: 'Dark Mode',
    setLightMode: 'Light Mode',
  },
}

export default TEXT
