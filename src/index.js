import { GraphQLServer } from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
		resolvers: {
				Query,
				Mutation,
				User,
				Post,
				Comment
		},
		context: {
			db
		}
})

server.start( () => {
	// server.start defaults to port 4000
	console.log('The server is up')
	
	// In the case of EADDRINUSE error use to clear the port
	// sudo lsof -t -i tcp:4000 | xargs kill -9
})