import {NextApiRequest, NextApiResponse} from 'next'

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    {id: 1, name: 'Flavio'},
    {id: 2, name: 'Dani'},
    {id: 1, name: 'Maik'},
  ]

  return response.json(users)
}

//