// Not working default in node
// import { emailTemplate } from './js-foundation/01-template';


// const templateExports = require('./js-foundation/01-template');
// console.log(templateExports.emailTemplate);

// const { emailTemplate } = require('./js-foundation/01-template');
// console.log(emailTemplate);

// require('./js-foundation/02-destructuring');
// const { getUserById } = require('./js-foundation/03-callbacks');
// const { getUserById, getUserByIdArrow } = require('./js-foundation/04-arrow');
require('./js-foundation/05-factory');

// const id = 1;

// getUserById(id, function (error, user) {
//     if (error) {
//         throw new Error(error);
//     }

//     // getUserById(2, function (error, user2) {
//     //     if (error) {
//     //         throw new Error(error);
//     //     }

//     //     console.log({ user, user2 });
//     // });

//     console.log({ user });
// });

// getUserByIdArrow(id, (error, user) => {
//     if (error) {
//         throw new Error(error);
//     }

//     console.log({ user });
// });