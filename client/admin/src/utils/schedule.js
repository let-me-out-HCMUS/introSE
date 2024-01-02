function generateDoubleRoundRobin(clubs){
    const numberOfClubs = clubs.length
    const numberOfMatchesPerRound = numberOfClubs / 2
    const numberOfRounds = numberOfClubs - 1
    const matches = []
    const returnMatches = []

    for (let round = 0; round < numberOfRounds; round++) {
        const roundMatches = []
        const returnRoundMatches = []

        for (let match = 0; match < numberOfMatchesPerRound; match++) {
            const home = (round + match) % (numberOfClubs - 1)
            let away = (numberOfClubs - 1 - match + round) % (numberOfClubs - 1)

            // Last team stays in the same place while the others
            // rotate around it.
            if (match === 0) {
                away = numberOfClubs - 1
            }

            roundMatches.push({
                firstClub: clubs[home].name,
                firstClubLogo: clubs[home].logo,
                secondClub: clubs[away].name,
                secondClubLogo: clubs[away].logo,
                stadium: clubs[home].stadium,
                time: '20:00',
                matchId: match + 1,
            })

            returnRoundMatches.push({
                firstClub: clubs[away].name,
                firstClubLogo: clubs[away].logo,
                secondClub: clubs[home].name,
                secondClubLogo: clubs[home].logo,
                stadium: clubs[away].stadium,
                time: '20:00',
                matchId: match + 1,
            })
        }

        matches.push(roundMatches)
        returnMatches.push(returnRoundMatches)
    }

    return matches.concat(returnMatches)
}

function Shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const temp = array[i]

        array[i] = array[randomIndex]
        array[randomIndex] = temp
    }

    return array
}

export default function generateSchedule(clubs) {
    return generateDoubleRoundRobin(Shuffle(clubs))
}