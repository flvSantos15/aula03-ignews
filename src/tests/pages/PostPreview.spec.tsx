import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import { getPrismicClient } from '../../services/prismic'
import { useRouter } from 'next/router'
import PostPreview, {
  getStaticProps,
} from '../../pages/posts/preview/[slug]'

const posts = {
  slug: 'my-new-post',
  title: 'My New Post',
  content: 'Post example',
  updatedAt: '10 de Abril'
}

jest.mock('next-auth/react')
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn()
  })
}))

describe('PostPreview page', () => {
  it('render correctly', () => {
    const useRouterMocked = jest.mocked(useRouter)
    const useSessionMocked = jest.mocked(useSession)
    const pushMocked = jest.fn()

    useSessionMocked.mockReturnValueOnce({
      data: null, status: 'loading'
    })

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked
    } as any)

    render(<PostPreview post={posts} />)
    expect(screen.getByText('My New Post')).toBeInTheDocument()
    expect(screen.getByText('10 de Abril')).toBeInTheDocument()
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument()
  })

  it('redirects to full page when user is subscribed', () => {
    const useRouterMocked = jest.mocked(useRouter)
    const useSessionMocked = jest.mocked(useSession)
    const pushMocked = jest.fn()

    useSessionMocked.mockReturnValueOnce({
      data: {
        activeSubscription: 'fake-subcription'
      },
      status: 'authenticated'
    } as any)

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked
    } as any)

    render(<PostPreview post={posts} />)

    expect(pushMocked).toHaveBeenCalledWith('/posts/my-new-post')
  })

  it('loads initial data', async () => {
    const getPrimicClientMocked = jest.mocked(getPrismicClient)

    getPrimicClientMocked.mockReturnValueOnce({
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

    const response = await getStaticProps({ params: { slug: 'my-new-post' } })

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My New Post',
            excerpt: 'Post excerpt',
            updatedAt: '01 de abril de 2021'
          }
        }
      })
    )

  })
})