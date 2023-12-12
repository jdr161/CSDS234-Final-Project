export default async function handler(req, res) {
    // Check for API password and correct request syntax
    if (!(req.method === "GET")){
        res.status(405).json({ message: `expected method: GET, received: ${req.method}` })
    } else if (!req.body.password) {
        res.status(400).json({ message: 'no password provided, bozo' })
    } else if (!(`Basic ${btoa(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`)}` === req.headers.authorization)) {
        res.status(401).json({ message: 'wrong username or password, bozo' })
    } else if (!req.query.dataType) {
        res.status(400).json({ message: 'need dataType in request parameters' })
    } else if (!req.query.date){
        res.status(400).json({ message: 'need date in request parameters' })
    } else {
        // See which data type is needed (cases, deaths, or vaccinations)
        if (req.query.dataType === "cases"){
            // const groupUsers = await prisma.cases.groupBy({
            //     by: ['iso_code'],
            //     where: {
            //         date: {
            //             lte: req.query.date,
            //         },
            //     },
            //     _sum: {
            //         new_cases: true,
            //     },
            // })
            res.status(200).json({ name: 'John Doe' })
        } else if (req.query.dataType === "deaths"){
            res.status(200).json({ name: 'John Doe' })
        } else if (req.query.dataType === "vaccinations"){
            res.status(200).json({ name: 'John Doe' })
        } else {
            res.status(400).json({ message: 'dataType not recognized' })
        }
    }
}  