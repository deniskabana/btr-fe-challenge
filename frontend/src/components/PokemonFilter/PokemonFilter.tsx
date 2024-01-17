import { useCallback, useState } from 'react'
import TEXT from '@/constants/TEXT'
import {
  Tabs,
  TabList,
  Tab,
  Form,
  Stack,
  TextInput,
  Select,
  SelectItem,
  Button,
  FormGroup,
} from '@carbon/react'
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

const FILTER_TYPE_OPTIONS = Object.values(PokemonFilterType)
const VIEW_TYPE_OPTIONS: {
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
  const [filterType, setFilterType] = useState<PokemonFilterType>(PokemonFilterType.ALL)
  const [viewType, setViewType] = useState<PokemonViewOptions>(PokemonViewOptions.GRID)

  const handleFilterTypeChange = useCallback((state: { selectedIndex: number }) => {
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
      <h5 aria-label={TEXT.filters.pokemon.aria.label}>{TEXT.filters.pokemon.title}</h5>

      <div>
        <Tabs onChange={handleFilterTypeChange}>
          <TabList aria-label={TEXT.filters.pokemon.aria.tabList}>
            {FILTER_TYPE_OPTIONS.map((value) => (
              <Tab key={value}>{TEXT.filters.pokemon.tabs[value]}</Tab>
            ))}
          </TabList>
        </Tabs>
      </div>

      <Form aria-label={TEXT.filters.pokemon.aria.search}>
        <Stack gap={4} orientation="horizontal">
          <div>
            <TextInput
              id=""
              labelText={TEXT.filters.pokemon.filter.search}
              placeholder=""
            />
          </div>
          <div>
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
                text={TEXT.filters.pokemon.filter.type}
              />
              <SelectItem value="option-1" text="Option 1" />
            </Select>
          </div>

          <div>
            <FormGroup legendText={TEXT.filters.pokemon.viewTypeOptions.title}>
              <div>
                {VIEW_TYPE_OPTIONS.map((view) => (
                  <Button
                    size="md"
                    kind={view.value === viewType ? 'primary' : 'tertiary'}
                    key={view.value}
                    onClick={viewTypeChangeFactory(view.value)}
                    hasIconOnly
                    iconDescription={view.label}
                    aria-label={view.label}
                  >
                    <view.icon />
                  </Button>
                ))}
              </div>
            </FormGroup>
          </div>
        </Stack>
      </Form>
    </div>
  )
}
