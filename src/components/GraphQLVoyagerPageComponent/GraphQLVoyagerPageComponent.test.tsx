import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { configApiRef } from '@backstage/core-plugin-api';
import {
  setupRequestMockHandlers,
  MockConfigApi,
  renderInTestApp,
  TestApiProvider
} from '@backstage/test-utils';
import { GraphQLVoyagerPageComponent } from './GraphQLVoyagerPageComponent';

describe("GraphQLVoyagerPageComponent", () => {
  const server = setupServer();
  // Enable sane handlers for network requests
  setupRequestMockHandlers(server);

  // setup mock response
  beforeEach(() => {
    server.use(
      rest.get("/*", (_, res, ctx) => res(ctx.status(200), ctx.json({})))
    );
  });

  it("should render", async () => {
    const mockConfig = new MockConfigApi({
      graphql: { baseUrl: "https://example.com" },
    });
    const rendered = await renderInTestApp(
      <TestApiProvider apis={[[configApiRef, mockConfig]]}>
        <GraphQLVoyagerPageComponent />
      </TestApiProvider>
    );
    expect(
      rendered.getByText("A visual representation of the schema.")
    ).toBeInTheDocument();
  });
});
