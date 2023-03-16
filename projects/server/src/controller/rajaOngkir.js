const axios = require("axios");

axios.defaults.baseURL = 'https://api.rajaongkir.com/starter'
axios.defaults.headers.common['key'] = '965efe8f5211d9b1ee77e8c093a7d1b3'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const rajaOngkirController = {
    getProvince : (req,res) => {
         axios.get('province').then(response => res.status(201).json(response.data.rajaongkir.results)).catch(err => res.status(401).send(err))
    }, getCity : (req, res) => {
        const id = req.params.provId

        axios.get(`city?province=${id}`).then(response => res.status(201).json(response.data.rajaongkir.results)).catch(err => res.status(401).send(err))
    }, getCost : (req,res) => {
        const param = req.params
        axios.post('/cost', {
        origin: param.origin,
        destination: param.destination,
        weight: param.weight,
        courier: param.courier.toLowerCase()})
        .then(response => res.json(response.data.rajaongkir.results))
        .catch(err => res.send(err))
    }
    }
    module.exports = rajaOngkirController;
