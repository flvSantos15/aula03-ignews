import { render, screen } from '@testing-library/react'
import Posts, { getStaticProps, Post } from '../../pages/posts'
import { getPrismicClient } from '../../services/prismic'

const posts = [{
  slug: 'my-new-post',
  title: 'Me New Post',
  excerpt: 'Post excerpt',
  updatedAt: '10 de Abril'
}] as Post[]

jest.mock('../../services/prismic')

describe('Posts Page', () => {
  it('should render correctly', () => {
    render(<Posts posts={posts} />)
    expect(screen.getByText('Me New Post')).toBeInTheDocument()
  })

  it('loads initial data', async () => {
    const getPrimicClientMocked = jest.mocked(getPrismicClient)

    getPrimicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [
                { type: 'heading', text: 'My New Post' }
              ],
              content: [
                { type: 'paragraph', text: 'Post excerpt' }
              ]
            },
            last_publication_date: '04-01-2021'
          }
        ]
      })
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'my-new-post',
            title: 'My New Post',
            excerpt: 'Post excerpt',
            updatedAt: '01 de abril de 2021'
          }]
        }
      })
    )

  })
})