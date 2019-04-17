const users = [{
    id: '1',
    name: 'Chris',
    email: 'chris@pronova.com',
    age: 30
}, {
    id: '2',
    name: 'Giselle',
    email: 'giselle@pronova.com',
    age: 30
}, {
    id: '3',
    name: 'Al',
    email: 'al@pronova.com'
}]

const posts = [{
    id: '1',
    title: 'Hello World',
    body: 'A simple Hello World post.',
    published: true,
    author: '1'
}, {
    id: '2',
    title: 'The Weather Today',
    body: 'It has been cloudy and rainy and trending.',
    published: true,
    author: '1'
}, {
    id: '3',
    title: 'The Trending Topics and Posts',
    body: 'Check here for a quick look at topics that are trending.',
    published: false,
    author: '2'
}]

const comments = [{
    id: '1',
    text: 'This is the first comment.',
    author: '1',
    post: '2'
}, {
    id: '2',
    text: 'This is the second comment.',
    author: '2',
    post: '3'
}, {
    id: '3',
    text: 'This is the third comment.',
    author: '3',
    post: '1'
}, {
    id: '4',
    text: 'This is the fourth comment.',
    author: '1',
    post: '1'
}]

const db = {
    users,
    posts,
    comments
}

export { db as default }