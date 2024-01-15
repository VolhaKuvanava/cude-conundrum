import {CubeColorCounts, CubeGame} from '../src/cube-game';

describe('CubeGame', () => {
    const maxCubes: CubeColorCounts = {red: 12, green: 13, blue: 14};
    const cubeGame = new CubeGame(maxCubes);

    const exampleGames: string[] = [
        'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
        'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
        'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
        'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
        'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
    ];

    describe('calculatePossibleGameIds', () => {
        it('should calculate the sum of allowed game IDs correctly', () => {
            const result = cubeGame.calculatePossibleGameIds(exampleGames);
            expect(result).toEqual(8);
        });

        it('should return 0 when no games are provided', () => {
            const result = cubeGame.calculatePossibleGameIds([]);
            expect(result).toEqual(0);
        });

        it('should handle games with invalid format and return 0', () => {
            const invalidGames = ['Invalid Game 1: invalid sequence'];
            const result = cubeGame.calculatePossibleGameIds(invalidGames);
            expect(result).toEqual(0);
        });

        it('should handle games with empty sequences and return 0', () => {
            const emptySequenceGames = ['Game 1: '];
            const result = cubeGame.calculatePossibleGameIds(emptySequenceGames);
            expect(result).toEqual(0);
        });
    });

    describe('calculateTotalPower', () => {
        it('should calculate the total power of games correctly', () => {
            const result = cubeGame.calculateTotalPower(exampleGames);
            expect(result).toEqual(2286);
        });

        it('should return 0 when no games are provided', () => {
            const result = cubeGame.calculateTotalPower([]);
            expect(result).toEqual(0);
        });

        it('should handle games with invalid format and return 0', () => {
            const invalidGames = ['Invalid Game 1: invalid sequence'];
            const result = cubeGame.calculateTotalPower(invalidGames);
            expect(result).toEqual(0);
        });

        it('should handle games with empty sequences and return 0', () => {
            const emptySequenceGames = ['Game 1: '];
            const result = cubeGame.calculateTotalPower(emptySequenceGames);
            expect(result).toEqual(0);
        });
    });
});
