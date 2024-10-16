import ky from 'ky'

const baseApi = ky.create({
  prefixUrl: `http://localhost:${import.meta.env.VITE_PORT}/api`
})

export default baseApi
