import { render, screen } from '@testing-library/react'
import { getSession } from 'next-auth/react'
import Post, { getServerSideProps } from '../../pages/posts/[slug]'
import { getPrismicClient } from '../../services/prismic'

const post = {
  slug: 'my-new-post',
  title: 'Me New Post',
  content: '<p>Post excerpt</p>',
  updatedAt: '10 de Abril'
}

jest.mock('next-auth/react')
jest.mock('../../services/prismic')

describe('Post Page', () => {
  it('should render correctly', () => {
    render(<Post post={post} />)
    expect(screen.getByText('Me New Post')).toBeInTheDocument()
    expect(screen.getByText('Post excerpt')).toBeInTheDocument()
  })

  it('redirects user if no subscription is found', async () => {
    const getSessionMocked = jest.mocked(getSession)

    getSessionMocked.mockResolvedValueOnce(null)

    const response = await getServerSideProps({
      params: { slug: 'my-new-post' }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/'
        })
      })
    )

  })

  it('loads initial data', async () => {
    const getSessionMocked = jest.mocked(getSession)
    const getPrismicMocked = jest.mocked(getPrismicClient)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subcription'
    } as any)

    getPrismicMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'My New Post' }
          ],
          content: [
            { type: 'paragraph', text: 'Post content' }
          ]
        },
        last_publication_date: '04-01-2021'
      })
    } as any)

    const response = await getServerSideProps({
      params: { slug: 'my-new-post' }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My New Post',
            content: '<p>Post content</p>',
            updatedAt: '01 de abril de 2021'
          }
        }
      })
    )

  })
})