import { useBrowserForm } from 'react-browser-form'
import TEXT from '@/constants/TEXT'
import { Form, TextInput, Select, SelectItem, Button, FormGroup } from '@carbon/react'
import {
  Grid as GridIcon,
  List as ListIcon,
  Delete as DeleteIcon,
} from '@carbon/icons-react'
import { CarbonIconType } from '@carbon/icons-react/lib/CarbonIcon'
import { debounce } from '@/utils/debounce'
import { useQuery } from '@apollo/client'
import { cx } from '@/utils/cx'
import { FilterForm, POKEMON_TYPE_UNSET } from '../PokemonLIstView/forms'
import { PokemonFilterType, PokemonViewOptions } from '../PokemonLIstView/types'
import { GET_POKEMON_TYPES_QUERY } from '../PokemonLIstView/query'
import styles from './styles.module.scss'

// CONSTANTS
// --------------------------------------------------

export const FILTER_TYPE_OPTIONS = Object.values(PokemonFilterType)
export const VIEW_TYPE_OPTIONS: {
  icon: CarbonIconType
  label: string
  value: PokemonViewOptions
}[] = [
  {
    icon: GridIcon,
    label: TEXT.filters.pokemon.viewTypeOptions[PokemonViewOptions.GRID],
    value: PokemonViewOptions.GRID,
  },
  {
    icon: ListIcon,
    label: TEXT.filters.pokemon.viewTypeOptions[PokemonViewOptions.LIST],
    value: PokemonViewOptions.LIST,
  },
]

// COMPONENT
// --------------------------------------------------

export type PokemonFilterProps = {
  filter: FilterForm
  setFilter: (filter: FilterForm) => void
}

export const PokemonFilter = ({ filter, setFilter }: PokemonFilterProps) => {
  // Ignoring loading & error in this component, explained it in other places :]
  const { data } = useQuery(GET_POKEMON_TYPES_QUERY)
  const pokemonTypes = data?.pokemonTypes

  const { formProps, names, setValues, reset, isDirty } = useBrowserForm<FilterForm>({
    defaultValues: filter,
    mode: 'onChange',
    name: 'pokemon-filter',
    // Debounce by default
    // TODO: in production, handle UX state displaying (user needs a loading spinner and feedback for when data is loading)
    onChange: debounce(setFilter, 200), // 150ms = is considered the lowest threshold for human perception
  })

  return (
    <div className={styles.PokemonFilter}>
      <Form aria-label={TEXT.filters.pokemon.aria.label} {...formProps} role="form">
        <div className={styles.Form}>
          <div className={cx(styles.Input, styles.view)}>
            <FormGroup legendText={TEXT.filters.pokemon.viewTypeOptions.title}>
              <div className={styles.ButtonGroup}>
                {VIEW_TYPE_OPTIONS.map((view) => (
                  <Button
                    size="md"
                    kind={view.value === filter.viewType ? 'primary' : 'tertiary'}
                    key={view.value}
                    onClick={() => setValues({ viewType: view.value })}
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
