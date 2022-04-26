import {
  createPlugin,
  createRoutableExtension
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const graphqlVoyagerPlugin = createPlugin({
  id: 'graphql-voyager',
  routes: {
    root: rootRouteRef
  }
});

export const GraphqlVoyagerPage = graphqlVoyagerPlugin.provide(
  createRoutableExtension({
    name: "graphql-voyager",
    component: () =>
      import(
        "./components/GraphQLVoyagerPageComponent/GraphQLVoyagerPageComponent"
      ).then((m) => m.GraphQLVoyagerPageComponent),
    mountPoint: rootRouteRef,
  })
);
