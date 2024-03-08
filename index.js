const { ApolloServer } = require("apollo-server"); // Import ApolloServer
const { importSchema } = require("graphql-import"); // Import graphql schema
const EtherDataSource = require("./datasource/ethDatasource"); // Import EtherDataSource
const typeDefs = importSchema("./schema.graphql");// Import schema

require("dotenv").config(); // Load.env file

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // Query to get balance of an address
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) => // Query to get total supply of ether
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // Query to get latest ethereum price
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // Query to get block confirmation time
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({ // Create Apollo Server
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // Create EtherDataSource
  }),
});

server.timeout = 0;
server.listen("9000").then(({ url }) => { // Start Apollo Server
  console.log(`🚀 Server ready at ${url}`);
});
