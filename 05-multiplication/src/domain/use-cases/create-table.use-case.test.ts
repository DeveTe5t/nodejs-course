import { describe, test, expect } from '@jest/globals';
import { CreateTable } from './create-table.use-case';

describe('CreateTable', () => {

    test('should create table with default values', () => {

        // Arrange
        const createTable = new CreateTable();

        // Act
        const table = createTable.execute({ base: 2 });
        const rows = table.split('\n').length;

        // console.log(table);

        // Assert
        expect(createTable).toBeInstanceOf(CreateTable);
        // expect(table).toContain('2 x 1  = 2');
        expect(table).toContain('2 x 1 = 2');
        expect(table).toContain('2 x 10 = 20');
        expect(rows).toBe(10);
    });

    test('should create table with custom values', () => {

        // Arrange
        const createTable = new CreateTable();

        const options = {
            base: 3,
            limit: 20
        }

        // Act
        const table = createTable.execute(options);
        const rows = table.split('\n').length;

        // Assert
        expect(table).toContain(`3 x 1 = 3`);
        expect(table).toContain(`3 x 20 = ${options.base * options.limit}`);
        expect(rows).toBe(options.limit);
    });
});