import React from 'react';
import { Content, Progress } from '@backstage/core-components';
import Alert from '@material-ui/lab/Alert';
import { useAsync } from 'react-use';
import {
  getIntrospectionQuery,
  introspectionFromSchema,
  buildSchema,
} from "graphql/utilities";
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

export const GraphQLVoyagerComponent = ({
  endpoint,
  sdl,
}: {
  endpoint?: string;
  sdl?: string;
}) => {
  const {
    value: result,
    loading,
    error,
  } = useAsync(async () => {
    if (sdl) {
      const data = introspectionFromSchema(buildSchema(sdl));
      return { data };
    }
    if (endpoint) {
      return await introspectionProvider(endpoint);
    }
    throw new Error("Must specify endpoint or schema SDL");
  }, [endpoint, sdl]);

  if (loading) {
    return (
      <Content>
        <Progress />
      </Content>
    );
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <Voyager
      displayOptions={displayOptions}
      hideSettings
      introspection={result}
    />
  );
};
