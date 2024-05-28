// const getAgePlugin = require('get-age');
// import { getAge as getAgePlugin } from 'get-age';


export const getAge = (birthdate: string) => {
    // if (!birthdate) return new Error('birthdate is required');

    // return getAgePlugin(birthdate);
    // console.log({ currentYear: new Date().getFullYear() });
    return new Date().getFullYear() - new Date(birthdate).getFullYear();
}