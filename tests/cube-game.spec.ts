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

        it('should handle games with some empty set and return 0', () => {
            const gamesWithEmptySequences = ['Game 1: 3 blue, 4 red; ; 2 green'];
            const result = cubeGame.calculateTotalPower(gamesWithEmptySequences);
            expect(result).toEqual(0);
        });
    });

    describe('calculateMinCubesRequired', () => {
        it('should calculate the minimum cubes required correctly', () => {
            const calculateMinCubesRequiredSpy = jest.spyOn(cubeGame as any, 'calculateMinCubesRequired');

            const gameSets = ['3 blue, 4 red', '1 red, 2 green, 6 blue', '2 green'];
            cubeGame.calculateTotalPower(['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green']);

            expect(calculateMinCubesRequiredSpy).toHaveBeenCalledWith(gameSets);
            expect(calculateMinCubesRequiredSpy).toReturnWith({ red: 4, green: 2, blue: 6 })
        });

        it('should not call calculateMinCubesRequired if no games provided', () => {
            const calculateMinCubesRequiredSpy = jest.spyOn(cubeGame as any, 'calculateMinCubesRequired');

            cubeGame.calculateTotalPower([]);

            expect(calculateMinCubesRequiredSpy).not.toHaveBeenCalled();
        });
    });

    describe('isGameAllowed', () => {
        it('should return false for invalid game sequence format', () => {
            const isGameAllowedSpy = jest.spyOn(cubeGame as any, 'isGameAllowed');

            cubeGame.calculatePossibleGameIds(['Invalid Game: invalid sequence']);

            expect(isGameAllowedSpy).not.toHaveBeenCalled();
        });

        it('should call isGameAllowed for valid game sequences', () => {
            const isGameAllowedSpy = jest.spyOn(cubeGame as any, 'isGameAllowed');

            cubeGame.calculatePossibleGameIds(['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green']);

            expect(isGameAllowedSpy).toHaveBeenCalledWith('3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green');
            expect(isGameAllowedSpy).toReturnWith(true);
        });
    });

    describe('isSequenceAllowed', () => {
        it('should return false for invalid cube sequence format', () => {
            const isSequenceAllowedSpy = jest.spyOn(cubeGame as any, 'isSequenceAllowed');
            cubeGame.calculatePossibleGameIds(['Invalid Game: invalid sequence']);

            expect(isSequenceAllowedSpy).not.toHaveBeenCalled();
        });

        it('should call isSequenceAllowed for valid cube sequences', () => {
            const isSequenceAllowedSpy = jest.spyOn(cubeGame as any, 'isSequenceAllowed');
            cubeGame.calculatePossibleGameIds(['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green']);

            expect(isSequenceAllowedSpy).toHaveBeenNthCalledWith(1, '3 blue, 4 red');
            expect(isSequenceAllowedSpy).toHaveNthReturnedWith(1, true);
            expect(isSequenceAllowedSpy).toHaveBeenNthCalledWith(2, '1 red, 2 green, 6 blue');
            expect(isSequenceAllowedSpy).toHaveNthReturnedWith(2, true);
            expect(isSequenceAllowedSpy).toHaveBeenNthCalledWith(3, '2 green');
            expect(isSequenceAllowedSpy).toHaveNthReturnedWith(3, true);
        });
    });
});
