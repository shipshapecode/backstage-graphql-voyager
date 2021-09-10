export interface Config {
  graphql?: {
    /**
     * The endpoint URL of the graphql server.
     * @visibility frontend
     */
    baseUrl: string;
  };
}