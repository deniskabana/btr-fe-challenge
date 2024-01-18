import { useCallback, useState } from 'react'
import TEXT from '@/constants/TEXT'
import { Form, TextInput, Select, SelectItem, Button, FormGroup } from '@carbon/react'
import { Grid as GridIcon, List as ListIcon } from '@carbon/icons-react'
import { CarbonIconType } from '@carbon/icons-react/lib/CarbonIcon'
import styles from './styles.module.scss'

// TYPES
// --------------------------------------------------

export enum PokemonFilterType {
  ALL = 'all',
  FAVORITES = 'favorites',
}

export enum PokemonViewOptions {
  GRID = 'grid',
  LIST = 'list',
}

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

export const PokemonFilter = () => {
  const [_filterType, setFilterType] = useState<PokemonFilterType>(PokemonFilterType.ALL)
  const [viewType, setViewType] = useState<PokemonViewOptions>(PokemonViewOptions.GRID)

  const _handleFilterTypeChange = useCallback((state: { selectedIndex: number }) => {
    setFilterType(FILTER_TYPE_OPTIONS[state.selectedIndex])
  }, [])

  const viewTypeChangeFactory = useCallback(
    (view: PokemonViewOptions) => () => {
      setViewType(view)
    },
    [],
  )

  return (
    <div className={styles.PokemonFilter}>
      <Form aria-label={TEXT.filters.pokemon.aria.search}>
        <div className={styles.Form}>
          <div className={styles['Input--view']}>
            <FormGroup legendText={TEXT.filters.pokemon.viewTypeOptions.title}>
              <div className={styles.ButtonGroup}>
                {VIEW_TYPE_OPTIONS.map((view) => (
                  <Button
                    size="md"
                    kind={view.value === viewType ? 'primary' : 'tertiary'}
                    key={view.value}
                    onClick={viewTypeChangeFactory(view.value)}
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

          <div className={styles['Input--search']}>
            <TextInput
              id=""
              labelText={TEXT.filters.pokemon.filter.search}
              placeholder={TEXT.filters.pokemon.filter.searchPlaceholder}
            />
          </div>

          <div className={styles['Input--type']}>
            <Select
              id=""
              labelText={TEXT.filters.pokemon.filter.type}
              defaultValue="-1"
              placeholder=""
            >
              <SelectItem
                disabled
                hidden
                value="-1"
                text={TEXT.filters.pokemon.filter.typeAll}
              />
              <SelectItem value="option-1" text="Option 1" />
            </Select>
          </div>
        </div>
      </Form>
    </div>
  )
}
