import axios from 'axios'

export default {
  getCoordinates(address) {
    return axios.get('/geo/coordinates', {
      params: { address },
    })
  },
}
