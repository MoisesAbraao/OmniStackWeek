const Dev = require('../models/Dev');
const parseStrigASArrays = require('../utils/parseStringAsArrays');


module.exports = {
    async index(request, response) {
        //busca de devs
        const { latitude, longitude, techs } = request.query;
        
        const techsArrrays = parseStrigASArrays(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArrrays
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 1000,
                },
            }
        });

        return response.json({ devs });
    }
}