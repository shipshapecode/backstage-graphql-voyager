import React from 'react';
import { Header, Page, Content, Progress } from '@backstage/core-components';
import { Config } from '@backstage/config';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import Alert from '@material-ui/lab/Alert';
import { useAsync } from 'react-use';
import { getIntrospectionQuery } from 'graphql/utilities';
import { Voyager } from 'graphql-voyager';
import fetch from 'isomorphic-fetch';
import 'graphql-voyager/dist/voyager.css';
import './GraphQLVoyagerComponent.css';

async function introspectionProvider(endpoint: string) {
  const introspectionResult = await fetch(endpoint, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: getIntrospectionQuery()
    })
  });

  return introspectionResult.json();
}

const displayOptions = {
  sortByAlphabet: true,
  showLeafFields: false,
  hideRoot: true
};

export const GraphQLVoyagerComponent = () => {
  const config: Config = useApi(configApiRef);
  const graphqlEndpoint = config.get<{ baseUrl: string }>('graphql').baseUrl;
  const {
    value: result,
    loading,
    error
  } = useAsync(async () => await introspectionProvider(graphqlEndpoint), []);

  if (loading) {
    return (
      <Page themeId='tool'>
        <Header
          title='Graphql Voyager'
          subtitle='A visual representation of the schema.'
        />
        <Content>
          <Progress />
        </Content>
      </Page>
    );
  } else if (error) {
    return <Alert severity='error'>{error.message}</Alert>;
  }
  return (
    <Page themeId='tool'>
      <Header
        title='Graphql Voyager'
        subtitle='A visual representation of the schema.'
      />
      <Voyager
        displayOptions={displayOptions}
        hideSettings
        introspection={result}
      />
    </Page>
  );
};
