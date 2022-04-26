import React from "react";
import { Header, Page } from "@backstage/core-components";
import { Config } from "@backstage/config";
import { configApiRef, useApi } from "@backstage/core-plugin-api";
import { GraphQLVoyagerComponent } from "../GraphQLVoyagerComponent/GraphQLVoyagerComponent";

export const GraphQLVoyagerPageComponent = () => {
  const config: Config = useApi(configApiRef);
  const graphqlEndpoint = config.get<{ baseUrl: string }>("graphql").baseUrl;

  return (
    <Page themeId="tool">
      <Header
        title="Graphql Voyager"
        subtitle="A visual representation of the schema."
      />
      <GraphQLVoyagerComponent endpoint={graphqlEndpoint} />
    </Page>
  );
};
