import * as fs from 'fs';
import * as path from 'path';
import {CubeGame} from "./cube-game";


function main(): void {
    const games = fs.readFileSync(path.resolve(__dirname, "../input.txt"), 'utf8').split('\n');

    const game = new CubeGame({red: 12, green: 13, blue: 14});
    console.log('Sum of Possible Game Ids: ', game.calculatePossibleGameIds(games));
    console.log('Sum of Power of Games', game.calculateTotalPower(games))
}

main();