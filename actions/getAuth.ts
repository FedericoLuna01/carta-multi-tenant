import axios from 'axios'

export default async function getAuth(): Promise<{ email: string, authorized: boolean } | null> {
  try {
    const res = await axios.get('/api/auth')
    console.log({ response: res })
    return res.data
  } catch (error) {
    console.log(error)
    // TODO: Fixear esto
    return null
  }
}