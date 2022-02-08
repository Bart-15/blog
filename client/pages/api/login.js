import { API_URL} from '../config/index';
import cookie from 'cookie'
import axios from 'axios';
export default async (req, res) => {
    if(req.method === 'POST') {
        const {email, password} = req.body;

        const res = await axios.post(`${API_URL}/login`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, 
                password
            })
        })

        const data = await res.data;

        const resOK = response && response.status === 200 && response.statusText === 'OK';
        if(resOK) {
            res.setHeader(
                'Set-Cookie',
                cookie.serialize('token', String(res.data.token), {
                  httpOnly: true,
                  secure: process.env.NODE_ENV !== 'development',
                  maxAge: 60 * 60 * 24 * 7, // 1 week
                  sameSite: 'strict',
                  path: '/'
                })
             ).status(200).json({user: data.user})
        } else {
            console.log('error')
        }


    } else {
      res.setHeader('Allow', ['POST'])
      res.status(405).json({message: `Method ${req.method} not allowed`})
    }
  }