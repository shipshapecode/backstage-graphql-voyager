import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { graphqlVoyagerPlugin, GraphqlVoyagerPage } from '../src/plugin';

createDevApp()
  .registerPlugin(graphqlVoyagerPlugin)
  .addPage({
    element: <GraphqlVoyagerPage />,
    title: 'Voyager'
  })
  .render();
