const Post = {
    // This function is called after the Query resolver function runs to handle requesting complex data operations. (If a type property is not a scalar type)
    author(parent, args, { db }, info) {
        // The Post object is the parent argument -- each post returned from the related query function is run through this function.

        // The built-in JS function find is like filter, but matches individual object.
        return db.users.find((user) => {
            return user.id === parent.author
        })
    },

    comments(parent, args, { db }, info) {
        return db.comments.filter((comment) => {
            return comment.post === parent.id
        })
    }
}

export { Post as default }