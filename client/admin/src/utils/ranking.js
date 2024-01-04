export default function ranking(clubs, rule){
    console.log('ruleranking',rule);
    // console.log(rule.point)

    clubs.forEach(club => {
        club.points = rule.point.win * club.won + rule.point.draw * club.draw + rule.point.lose * club.lost;
    });    
    // console.log('clubs',clubs);
    
    for (let i = 0; i < clubs.length-1; i++) {
        for (let j = i+1; j < clubs.length; j++) {
            var res = compare(clubs[i], clubs[j], rule,0);
            if (res === 0 ){
                
                res = compare(clubs[i], clubs[j], rule,1);
                if (res === 0 ){
                    res = compare(clubs[i], clubs[j], rule,2);
                    // if (res === 0 ){
                    //     res = compare(clubs[i], clubs[j], rule,3);
                    // }
                }
            }
            if (res > 0) {
                let temp = clubs[i];
                clubs[i] = clubs[j];
                clubs[j] = temp;
            }
        }
    }
    console.log('clubs',clubs);
    return clubs;
}

function compare(a, b, rule, time) {
    var res = 0;
    switch (rule.point.priority[time]) {
        case 'points':
            res = b.points - a.points;
            break;
        case 'goalDifference':
            res = b.gd - a.gd;
            break;
        case 'totalGoals':
            res = b.gf - a.gf;
            break;
        // case 'headToHead':
        //     clubs.sort((a, b) => {
        //         let headToHead = 0;
        //         if (a.headToHead[b.id]) {
        //             headToHead = a.headToHead[b.id].win - a.headToHead[b.id].lose;
        //         }
        //         return headToHead;
        //     });
        //     break;
        default:
            break;
    }
    return res;
}