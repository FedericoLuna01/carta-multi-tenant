import axios from 'axios'

export default async function getAuth(): Promise<{ email: string, authorized: boolean } | null> {
  try {
    const res = await axios.get('/api/auth')
    return res.data
  } catch (error) {
    return null
  }
}