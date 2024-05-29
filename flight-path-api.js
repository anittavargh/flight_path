const express = require('express');
const app = express();
app.use(express.json());

function sortFlights(flights) {
    // Create a map to store the next flight from each airport
    const nextFlightMap = new Map(flights.map(([src, dst]) => [src, dst]));
    
    // Find the starting airport which is not a destination in any flight
    const allDestinations = new Set(flights.map(([_, dst]) => dst));

    let startAirport = null;

    for (const [src, dst] of flights) {
        if (!allDestinations.has(src)) {
            startAirport = src;
            break;
        }
    }

    // Generate the sorted flight path
    const flightPath = [];
    while (nextFlightMap.has(startAirport)) {
        flightPath.push(startAirport);
        startAirport = nextFlightMap.get(startAirport);
    }

    flightPath.push(startAirport); // Add the last destination

    return flightPath;
}

app.post('/api/flight-path', (req, res) => {
    const flights = req.body.flights;
    if (!Array.isArray(flights) || flights.length === 0) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    try {
        const flightPath = sortFlights(flights);
        const flightPathSrcAndDst = [flightPath[0], flightPath[flightPath.length - 1]] 
        res.json(flightPathSrcAndDst);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
