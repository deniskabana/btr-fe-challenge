import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ['src/**/*.{ts,tsx}'],

  generates: {
    './src/__generated__/': {
      // plugins: [],
      preset: 'client',
      // presetConfig: {
      //   gqlTagName: 'gql',
      // },
    },
  },
  ignoreNoDocuments: true,
  schema: '../backend/src/schema.graphql',
}

export default config
