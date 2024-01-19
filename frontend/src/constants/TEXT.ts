// The reason for using TEXT.ts constant file is I have no interest
// in using i18n for this project.

const TEXT = {
  favorites: {
    empty: 'You have no favorite Pokemons. Time to add some!',
    favorite: 'Add to Favorites',
    unfavorite: 'Remove from Favorites',
  },
  filters: {
    pokemon: {
      aria: {
        label: 'Pokemon Filter',
        search: 'Search Pokemons',
        tabList: 'Pokemon Filter List',
      },
      filter: {
        clear: 'Clear',
        search: 'Search',
        searchPlaceholder: 'Enter Pokemon name...',
        type: 'Type',
        typeAll: 'All Types',
      },
      noFavorites:
        'No Favorite Pokemons were found - try adjusting your criteria. Time to add some now! ❤️',
      noResults: 'No Pokemons were found 🥺 Try adjusting your criteria.',
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
