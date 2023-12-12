import prisma from '../../lib/prisma'

export default async function handler(req, res) {
    if (!(req.method === "GET")) {
        res.status(405).json({ message: `expected method: GET, received: ${req.method}` })
    } else if (!req.headers.authorization) {
        res.status(400).json({ message: 'basic authorization required, bozo' })
    } else if (!(`Basic ${btoa(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`)}` === req.headers.authorization)) {
        res.status(401).json({ message: 'wrong username or password, bozo' })
    } else if (!req.query.dataType) {
        res.status(400).json({ message: 'need dataType in request parameters' })
    } else {
        // See which data type is needed (cases, deaths, or vaccinations)
        if (req.query.dataType === "cases") {
            const test = await prisma.cases.findUnique({
                where: {
                    iso_code_date: {
                        iso_code: "AFG",
                        date: "2020-03-30",
                    },
                },
            })
            return res.json(test)
            // const countryCases = await prisma.cases.groupBy({
            //     by: ['iso_code'],
            //     _sum: {
            //         new_cases: true,
            //     },
            // })
            // return res.json(countryCases)
            res.status(200).json({ name: 'John Doe' })
        } else if (req.query.dataType === "deaths") {
            res.status(200).json({ name: 'John Doe' })
        } else if (req.query.dataType === "vaccinations") {
            res.status(200).json({ name: 'John Doe' })
        } else {
            res.status(400).json({ message: 'dataType not recognized' })
        }
    }
}  