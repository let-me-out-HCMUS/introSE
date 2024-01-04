// import { getClubs } from "../services/apiClubs";
import { getMatchUp } from "../services/apiMatch";
import { getClubById } from "../services/apiClubs";
export default async function ranking(clubs, rule) {
    // console.log('ruleranking',rule);
    // console.log(rule.point)
    // clubs.forEach(club =>{ club["points"] = 0});

    clubs.forEach((club) => {
        club.points = rule.point.win * club.won + rule.point.draw * club.drawn + rule.point.lose * club.lost;
        
    });
    // console.log('rank', clubs);
    for (let i = 0; i < clubs.length - 1; i++) {
        for (let j = i + 1; j < clubs.length; j++) {
            var res = await compare(clubs[i], clubs[j], rule, 0);
            if (res === 0) {
                res = await compare(clubs[i], clubs[j], rule, 1);
                if (res === 0) {
                    res = await compare(clubs[i], clubs[j], rule, 2);
                    if (res === 0) {
                        res = await compare(clubs[i], clubs[j], rule, 3);
                    }
                }
            }
            if (res > 0) {
                let temp = clubs[i];
                clubs[i] = clubs[j];
                clubs[j] = temp;
            }
        }
    }
    // console.log('rank', clubs);
    return clubs;
}

async function compare(a, b, rule, time) {
    var res = 0;
    switch (rule.point.priority[time]) {
        case 'points':
            res = b.points - a.points;
            break;
        case 'goalDifference':
            res = b.gd - a.gd;
            break;
        case 'totalGoals':
            // res = b.gf - a.gf;
            res = await compareTotalGoal(a, b);
            break;
        case 'headToHead':
            res = await compareMatchUp(a, b);
            break;
        default:
            break;
    }
    return res;
}

async function compareMatchUp(a, b) {

    const firstMatch = await getMatchUp(a.id, b.id);
    const secondMatch = await getMatchUp(b.id, a.id);
    var res = 0

    const fMatch = firstMatch.result.split('-');
    if (fMatch[1] > fMatch[0]) {
        res = +1;
    }
    else res -= 1;

    const sMatch = secondMatch.result.split('-');
    if (sMatch[0] < sMatch[1]) {
        res = -1;
    }
    else res += 1;
    return res;
}

async function compareTotalGoal(a, b) {
    const goalA = await getClubById(a.id).totalGoal;
    const goalB = await getClubById(b.id).totalGoal;
    // console.log('goal', goalA, goalB);
    return goalB - goalA;
}