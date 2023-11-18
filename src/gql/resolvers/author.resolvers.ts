const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    }, {
        title: 'Paradoxical Sajid - 2',
        author: 'Arif Azad',
    },
];
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhZGlAZ21haWwuY29tIiwiaWF0IjoxNjg0MTUwOTk2fQ.67DnRIX_aURcQFC0ua0rqpsdY0lO2xreVfyQOY1pi3M
const authorResolver = {
    Query: {
        books: (_: any, args: any) => {

            return books
        },
        booksByName: (_: any, { author }: any) => {
            let book = books.filter((book) => book.author == author)
            return book[0]
        },
    },
};

export default authorResolver;