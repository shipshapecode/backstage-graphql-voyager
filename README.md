# Backstage graphql-voyager plugin

## Setup

1. If you have a standalone app (you didn't clone this repo), then do

```bash
# From your Backstage root directory
cd packages/app
yarn add @shipshapecode/backstage-plugin-graphql-voyager
```


2. Add the `GraphqlVoyagerPage` page to the routes in your app:

```tsx
import { GraphqlVoyagerPage } from '@shipshapecode/backstage-plugin-graphql-voyager';
// down in the sidebar
    <Route path="/graphql-voyager" element={<GraphqlVoyagerPage />}/>
  </FlatRoutes>
</SidebarPage>
```

3. Add app config:

```
  graphql:
    baseUrl: 'https://www.myapi.com/graphql'
```
