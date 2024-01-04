function generateDoubleRoundRobin(clubs, startDate){
    const numberOfClubs = clubs.length
    const numberOfMatchesPerRound = numberOfClubs / 2
    const numberOfRounds = numberOfClubs - 1
    const matches = []
    const returnMatches = []
    let date = new Date(startDate)
    let dateForReturnMatches = new Date(startDate)
    dateForReturnMatches.setDate(dateForReturnMatches.getDate() + numberOfRounds * 7)

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
                firstClub: clubs[home].clubName,
                firstClubLogo: clubs[home].image,
                secondClub: clubs[away].clubName,
                secondClubLogo: clubs[away].image,
                stadium: clubs[home].stadium,
                time: date.toLocaleDateString("vi-VN"),
            })

            returnRoundMatches.push({
                firstClub: clubs[away].clubName,
                firstClubLogo: clubs[away].image,
                secondClub: clubs[home].clubName,
                secondClubLogo: clubs[home].image,
                stadium: clubs[away].stadium,
                time: dateForReturnMatches.toLocaleDateString("vi-VN"),
            })
        }

        date.setDate(date.getDate() + 7)
        dateForReturnMatches.setDate(dateForReturnMatches.getDate() + 7)
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

export default function generateSchedule(clubs, startDate) {
    return generateDoubleRoundRobin(Shuffle(clubs), startDate)
}