const sequenceRegExp = /^Game (\d+): (.+)$/

export class CubeGame {
    constructor(private readonly maxCubes: { [key: string]: number }) {}

    public calculatePossibleGameIds(games: string[]): number {
        return games.reduce((sumIds, game) => {
            const [, gameId, sequences] = sequenceRegExp.exec(game.trim()) || [];
            if (gameId && this.isGameAllowed(sequences)) {
                return sumIds + +gameId;
            }
            return sumIds;
        }, 0);
    }

    public calculateTotalPower(games: string[]): number {
        return games.reduce((sumPowerOfGames, game) => {
            const parsedGames = sequenceRegExp.exec(game.trim());

            if (!parsedGames) {
                return sumPowerOfGames;
            }

            const [, , sequences] = parsedGames;
            const gameSets = sequences.split('; ');

            if (gameSets.some(set => set.trim() === '')) {
                return sumPowerOfGames;
            }
            const minCubesRequired = this.calculateMinCubesRequired(gameSets);
            const gamePower = Object.values(minCubesRequired).reduce((acc, val) => acc * val, 1);

            return sumPowerOfGames + gamePower;
        }, 0);
    }


    private calculateMinCubesRequired(gameSets: string[]): CubeColorCounts {
        return gameSets.reduce((cubes, set)=> {
            set.split(', ').map((str) => {
                const [count, color] = str.split(' ');
                cubes[color] = Math.max(+count, cubes[color]);
            });
            return cubes;
        },  {
            red: 0,
            green: 0,
            blue: 0,
        });
    }


    private isGameAllowed(gameSequence: string): boolean {
        const sequences = gameSequence.split(';');
        return sequences.every((sequence) => this.isSequenceAllowed(sequence.trim()));
    }

    private isSequenceAllowed(sequence: string): boolean {
        const cubes = sequence.split(', ');
        return cubes.every((cube) => {
            const [count, color] = cube.trim().split(' ');
            return +count <= this.maxCubes?.[color];
        });
    }
}

export type CubeColorCounts =  { [key: string]: number; }