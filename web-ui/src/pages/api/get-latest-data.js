import prisma from '@/lib/prisma'
import reduceData from '@/lib/reduceData'

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
            const countryCases = await prisma.cases.groupBy({
                by: ['iso_code'],
                _max: {
                    total_cases_per_million: true,
                },
                cacheStrategy: { swr: 600, ttl: 600 },
            })
            return res.json(reduceData(countryCases))
        } else if (req.query.dataType === "deaths") {
            const countryDeaths = await prisma.deaths.groupBy({
                by: ['iso_code'],
                _max: {
                    total_deaths_per_million: true,
                },
                cacheStrategy: { swr: 600, ttl: 600 },
            })
            return res.json(reduceData(countryDeaths))
        } else if (req.query.dataType === "vaccinations") {
            const countryVaccinations = await prisma.vaccinations.groupBy({
                by: ['iso_code'],
                _max: {
                    total_vaccinations_per_hundred: true,
                },
                cacheStrategy: { swr: 600, ttl: 600 },
            })
            return res.json(reduceData(countryVaccinations))
        } else {
            res.status(400).json({ message: 'dataType not recognized' })
        }
    }
}  