import "@types/jest";
import { getPokemonById } from '../../src/js-foundation/06-promises';

describe('js-foundation/06-promises.ts', () => {

    test('getPokemonById should return a pokemon', async () => {

        const pokemonId = 1;
        const pokemonName = await getPokemonById(pokemonId);
        expect(pokemonName).toBe('bulbasaur');
    });

    // way 1
    test('getPokemonById should return an error if pokemon not exist', async () => {

        const pokemonId = 1000000000;

        try {

            await getPokemonById(pokemonId);
            expect(true).toBeFalsy();
        }
        catch (error) {

            expect(error).toBe(`Pokemon not found with id ${pokemonId}`);
        }
    });

    // way 2
    // test("getPokemonById should return an error if pokemon not exist 2", async () => {

    //     const pokemonId = 1000000000;

    //     await expect(getPokemonById(pokemonId)).rejects.toThrow(        
    //         `Pokemon not found with id ${pokemonId}`
    //     );
    // });
});