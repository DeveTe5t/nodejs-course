import "@types/jest";
import { getUUID } from "../../src/plugins";


describe('plugins/get-id.plugins.ts', () => {

    test('getUUID should return an UUID', () => {

        const uuid = getUUID();
        expect(uuid.id1.length).toBe(36);
        expect(uuid.id2.length).toBe(36);
        expect(uuid.id1.match(/-/g)).toHaveLength(4);
        expect(uuid.id2.match(/-/g)).toHaveLength(4);
        expect(uuid.id1).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[14][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
        expect(uuid.id2).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[14][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    });
});