export default async function handler(req, res) {
    // Check for API password and correct request syntax
    if (!(req.method === "GET")){
        res.status(405).json({ message: `expected method: GET, received: ${req.method}` })
    } else if (!req.body.password) {
        res.status(400).json({ message: 'no password provided, bozo' })
    } else if (!(req.body.password === process.env.API_PASSWORD)) {
        res.status(401).json({ message: 'wrong password, bozo' })
    } else if (!req.body.dataType) {
        res.status(400).json({ message: 'need dataType in body' })
    } else if (!req.body.date){
        res.status(400).json({ message: 'need date in body' })
    } else {
        // See which data type is needed (cases, deaths, or vaccinations)
        if (req.body.dataType === "cases"){
            // const groupUsers = await prisma.cases.groupBy({
            //     by: ['iso_code'],
            //     where: {
            //         date: {
            //             contains: 'prisma.io', GREATER THAN? LESS THAN? req.body.date
            //         },
            //     },
            //     _sum: {
            //         new_cases: true,
            //     },
            // })
            res.status(200).json({ name: 'John Doe' })
        } else if (req.body.dataType === "deaths"){
            res.status(200).json({ name: 'John Doe' })
        } else if (req.body.dataType === "vaccinations"){
            res.status(200).json({ name: 'John Doe' })
        } else {
            res.status(400).json({ message: 'dataType not recognized' })
        }
    }
}  