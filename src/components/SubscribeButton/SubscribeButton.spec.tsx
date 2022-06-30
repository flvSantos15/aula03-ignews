import { render, screen, fireEvent } from '@testing-library/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SubscribeButton } from '.'

jest.mock('next-auth/react')
jest.mock('next/router')

describe('SubscribeButton Component', () => {
  it('renders corretly', () => {
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      data: null, status: 'loading'
    })

    render(
      <SubscribeButton />
    )
    expect(screen.getByText('Subscribe Now')).toBeInTheDocument()
  })

  it('redirects user to sign in when not authentcated', () => {
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      data: null, status: 'loading'
    })

    const signInMocked = jest.mocked(signIn)
    render(
      <SubscribeButton />
    )
    const subscribeButton = screen.getByText('Subscribe Now')

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  it('redirects to posts when user already has a subscrption', () => {
    const useRouterMocked = jest.mocked(useRouter)
    const useSessionMocked = jest.mocked(useSession)
    const pushMocked = jest.fn()

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: 'Jon Doe',
          email: 'jon.doe@exemple.com'
        },
        activeSubscriptio: 'fake-subcription',
        expires: 'fake-expires'
      },
      status: 'authenticated'
    })

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked
    } as any)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe Now')

    fireEvent.click(subscribeButton)

    expect(pushMocked).toHaveBeenCalled()
  })
})