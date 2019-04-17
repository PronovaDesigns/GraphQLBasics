import uuidv4 from 'uuid/v4'
import { deflateRawSync } from 'zlib';

const Mutation = {
    createUser(parent, args, { db }, info) {
        // ".some" ES6 function returns true as long as one of the users have a matching variable value.
        const emailTaken = db.users.some((user) => user.email === args.data.email)

        if (emailTaken) {
            throw new Error('Email taken.')
        }

        const user = {
            id: uuidv4(),
            ...args.data
        }

        db.users.push(user)

        return user
    },

    deleteUser(parent, args, { db }, info) {
        const userIndex = db.users.findIndex((user) => user.id === args.id)

        if (userIndex === -1) {
            throw new Error('User not found')
        }

        // Removes a section of users from an array based on array index number
        const deletedUsers = db.users.splice(userIndex, 1)

        // Filter runs through the posts array object and finds related posts to deleted user.
        // Only the non-matches are returned to the post array object.
        db.posts = db.posts.filter((post) => {
            const match = post.author === args.id

            // If the post is a match, this if statement finds the related comments to the post and does not return them to the comment array object.
            if (match) {
                db.comments = db.comments.filter((comment) => {
                    return comment.post !== post.id
                })
            }

            return !match
        })

        // This comments filter removes all comments from the user being deleted on all posts.
        db.comments = db.comments.filter((comment) => comment.author !== args.id)

        return deletedUsers[0]
    },

    updateUser(parent, args, { db }, info) {
        const { id, data } = args
        const user = db.users.find((user) => user.id === id)

        if (!user) {
            throw new Error('User not found')
        }

        if (typeof data.email === 'string') {
            const emailTaken = db.users.some((user) => user.email === data.email)

            if (emailTaken) {
                throw new Error('Email in use')
            }

            user.email = data.email
        }

        if (typeof data.name === 'string') {
            user.name = data.name
        }

        if (typeof data.age !== 'undefined') {
            user.age = data.age
        }

        return user
    },

    createPost(parent, args, { db }, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)

        if (!userExists) {
            throw new Error('User not found.')
        }

        const post = {
            id: uuidv4(),
            ...args.data
        }

        db.posts.push(post)

        return post
    },

    deletePost(parent, args, { db }, info) {
        const postIndex = db.posts.findIndex((post) => post.id === args.id)

        if (postIndex === -1) {
            throw new Error('Post not found')
        }

        const deletedPosts = db.posts.splice(postIndex, 1)

        db.comments = db.comments.filter((comment) => comment.post !== args.id)

        return deletedPosts[0]
    },

    updatePost(parent, args, { db }, info) {
        const { id, data } = args
        const post = db.posts.find((post) => post.id === id)

        if (!post) {
            throw new Error('Post not found')
        }

        if (typeof data.title === 'string') {
            post.title = data.title
        }

        if (typeof data.body === 'string') {
            post.body = data.body
        }

        if (typeof data.published === 'boolean') {
            post.published = data.published
        }

        return post
    },

    createComment(parent, args, { db }, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)
        const postExists = db.posts.some((post) => post.id === args.data.post && post.published === true)

        if (!userExists) {
            throw new Error('User not found.')
        }

        if (!postExists) {
            throw new Error('Post not found.')
        }

        const comment = {
            id: uuidv4(),
            ...args.data
        }

        db.comments.push(comment)

        return comment
    },

    deleteComment(parent, args, { db }, info) {
        const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)

        if (commentIndex === -1) {
            throw new Error('Comment not found')
        }

        const deletedComments = db.comments.splice(commentIndex, 1)

        return deletedComments[0]
    },

    updateComment(parent, args, { db }, info) {
        const { id, data } = args
        const comment = db.comments.find((comment) => comment.id === id)

        if (!comment) {
            throw new Error('Comment not found')
        }

        if (typeof data.text === 'string') {
            comment.text = data.text
        }

        return comment
    }
}

export { Mutation as default }