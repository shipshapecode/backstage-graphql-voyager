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
    name: 'GraphqlVoyagerPage',
    component: () =>
      import('./components/GraphQLVoyagerComponent').then(
        (m) => m.GraphQLVoyagerComponent
      ),
    mountPoint: rootRouteRef
  })
);
