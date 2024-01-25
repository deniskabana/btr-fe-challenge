// The reason for using TEXT.ts constant file is I have no interest
// in using i18n for this project.

const TEXT = {
  details: {
    pokemon: {
      card: {
        classification: 'Classification',
        cp: 'CP',
        dimensions: 'Dimensions',
        height: 'Height',
        hp: 'HP',
        resistantTo: 'Resistant to',
        types: 'Types',
        weaknesses: 'Weaknesses',
        weight: 'Weight',
      },
      evolutions: {
        noData: 'This pokemon has no evolutions 👀',
        title: 'Evolutions',
      },
      playSound: "Play Pokemon's sound",
      title: 'Pokemon Details',
    },
  },
  favorites: {
    empty: 'You have no favorite Pokemons. Time to add some!',
    favorite: 'Add to Favorites',
    toasts: {
      setError: 'Failed to add to Favorites.',
      setPending: 'Adding to Favorites...',
      setSuccess: 'Added to Favorites!',
      unsetError: 'Failed to remove from Favorites.',
      unsetPending: 'Removing from Favorites...',
      unsetSuccess: 'Removed from Favorites!',
    },
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
      toasts: {
        error: 'Failed to load Pokemons 😱',
        singleError: 'Failed to load Pokemon detail 🥺',
      },
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
  pokemonCard: {
    overlay: {
      viewDetail: 'View detail',
    },
  },
  ui: {
    setDarkMode: 'Dark Mode',
    setLightMode: 'Light Mode',
  },
} as const

export default Object.freeze(TEXT)
