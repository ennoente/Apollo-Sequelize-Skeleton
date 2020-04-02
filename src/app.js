import {ApolloServer, gql} from 'apollo-server';
import {Resolvers, TypeDefs} from '../resources';
import connection from "../config/database";

const server = new ApolloServer({
  typeDefs: TypeDefs,
  resolvers: Resolvers,
  context: ({ req }) => {

    return {}
  }
});

connection.authenticate()
  .then(() => {
    console.log("Connection established successfully.");
    server.listen()
      .then(({url}) => {
        console.log(`Started ApolloServer instance at ${url}.`);
      });
  })
  .catch(err => {
    console.error(err);
  });
