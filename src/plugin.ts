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
    component: () =>
      import('./components/GraphQLVoyagerComponent').then(
        (m) => m.GraphQLVoyagerComponent
      ),
    mountPoint: rootRouteRef
  })
);
