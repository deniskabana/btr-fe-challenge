import { Dispatch, SetStateAction } from 'react'
import { useBrowserForm } from 'react-browser-form'
import { Form, TextInput, Select, SelectItem, Button, FormGroup } from '@carbon/react'
import {
  Grid as GridIcon,
  List as ListIcon,
  Delete as DeleteIcon,
} from '@carbon/icons-react'
import { CarbonIconType } from '@carbon/icons-react/lib/CarbonIcon'
import { useQuery } from '@apollo/client'
import TEXT from '@/config/TEXT'
import { cx } from '@/utils/cx'
import { FilterForm, POKEMON_TYPE_UNSET } from '../../forms'
import { PokemonFavoritesDisplayOptions, PokemonDisplayOptions } from '../../types'
import { GET_POKEMON_TYPES_QUERY } from '../../query'
import styles from './styles.module.scss'

// CONSTANTS
// --------------------------------------------------

export const FILTER_TYPE_OPTIONS = Object.values(PokemonFavoritesDisplayOptions)
export const VIEW_TYPE_OPTIONS: {
  icon: CarbonIconType
  label: string
  value: PokemonDisplayOptions
}[] = [
  {
    icon: GridIcon,
    label: TEXT.filters.pokemon.viewTypeOptions[PokemonDisplayOptions.GRID],
    value: PokemonDisplayOptions.GRID,
  },
  {
    icon: ListIcon,
    label: TEXT.filters.pokemon.viewTypeOptions[PokemonDisplayOptions.LIST],
    value: PokemonDisplayOptions.LIST,
  },
]

// COMPONENT
// --------------------------------------------------

export type PokemonFilterProps = {
  filter: FilterForm
  setFilter: Dispatch<SetStateAction<FilterForm>>
}

export const PokemonFilter = ({ filter, setFilter }: PokemonFilterProps) => {
  // Ignoring loading & error in this component, explained it in other places :]
  const { data } = useQuery(GET_POKEMON_TYPES_QUERY)
  const pokemonTypes = data?.pokemonTypes

  const { formProps, names, setValues, reset, isDirty } = useBrowserForm<FilterForm>({
    defaultValues: filter,
    mode: 'onChange',
    name: 'pokemon-filter',
    // TODO: in production, handle UX state displaying (user needs a loading spinner and feedback for when data is loading)
    // Debounce by default
    onChange: setFilter,
  })

  return (
    <div className={styles.PokemonFilter}>
      <Form aria-label={TEXT.filters.pokemon.aria.label} {...formProps} role="form">
        <div className={styles.Form}>
          <div className={cx(styles.Input, styles.view)}>
            <FormGroup legendText={TEXT.filters.pokemon.viewTypeOptions.title}>
              <div className={styles.ButtonGroup}>
                {/* FIXME: I know this is overkill for a UI option that has no potential to change,
                    I just included it to show how I would've handled this in e.g. a multi-tenant app with dynamic UI prefs */}
                {VIEW_TYPE_OPTIONS.map((view) => (
                  <Button
                    size="md"
                    kind={view.value === filter.viewType ? 'primary' : 'tertiary'}
                    key={view.value}
                    // FIXME: This seems to be a problem in my own library, `react-browser-form`. Sorry for that, incl. in the roadmap now.
                    onClick={() => setValues({ ...filter, viewType: view.value })}
                    hasIconOnly
                    iconDescription={view.label}
                    aria-label={view.label}
                    className={styles.Button}
                  >
                    <view.icon />
                  </Button>
                ))}
              </div>
            </FormGroup>
          </div>

          <div className={cx(styles.Input, styles.search)}>
            <TextInput
              id={names.search}
              name={names.search}
              labelText={TEXT.filters.pokemon.filter.search}
              placeholder={TEXT.filters.pokemon.filter.searchPlaceholder}
            />
          </div>

          <div className={cx(styles.Input, styles.type)}>
            <Select
              id={names.pokemonType}
              name={names.pokemonType}
              value={filter.pokemonType}
              onChange={(e) => setValues({ ...filter, pokemonType: e.target.value })}
              labelText={TEXT.filters.pokemon.filter.type}
              placeholder={TEXT.filters.pokemon.filter.typeAll}
            >
              <SelectItem
                value={POKEMON_TYPE_UNSET}
                text={TEXT.filters.pokemon.filter.typeAll}
              />
              {pokemonTypes?.map((type) => (
                <SelectItem key={type} value={type} text={type} />
              ))}
            </Select>
          </div>

          <div className={cx(styles.Input, styles.reset)}>
            <FormGroup legendText={TEXT.filters.pokemon.filter.clear}>
              <div>
                <Button
                  hasIconOnly
                  iconDescription={TEXT.filters.pokemon.filter.clear}
                  aria-label={TEXT.filters.pokemon.filter.clear}
                  size="md"
                  disabled={!isDirty}
                  onClick={() => reset()}
                >
                  <DeleteIcon />
                </Button>
              </div>
            </FormGroup>
          </div>
        </div>
      </Form>
    </div>
  )
}
