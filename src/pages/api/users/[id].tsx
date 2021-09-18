import {NextApiRequest, NextApiResponse} from 'next'

export default (request: NextApiRequest, response: NextApiResponse) => {
  console.log(request.query)

  const users = [
    {id: 1, name: 'Flavio'},
    {id: 2, name: 'Dani'},
    {id: 3, name: 'Maik'},
  ]

  return response.json(users)
}

//