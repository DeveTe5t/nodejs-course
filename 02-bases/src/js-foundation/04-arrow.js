
const users = [
    {
        id: 1,
        name: 'John Doe',
    },
    {
        id: 2,
        name: 'Jane Doe',
    }
];

function getUserById(id, callback) {
    // const user = users.find(user => user.id === id);
    const user = users.find(function (user) {
        return user.id === id;
    });

    if (!user) {
        return callback(`User not found with id ${id}`);
    }

    return callback(null, user);
}

const getUserByIdArrow = (id, callback) => {
    const user = users.find(user => user.id === id);

    // Return is not necessary
    user ? callback(null, user) : callback(`User not found with id ${id}`);
}



module.exports = {
    getUserById,
    getUserByIdArrow,
}