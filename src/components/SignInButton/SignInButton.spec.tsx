import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import { SignInButton } from '.'

jest.mock('next-auth/react')

describe('SignInButton Component', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = jest.mocked(useSession)

    // useSessionMocked.mockReturnValue([null, false]) // a partie desse linha vai retorna vazio
    useSessionMocked.mockReturnValueOnce({ data: null, status: 'loading' }) // vai retornar apenas 1 vez

    render(
      <SignInButton />
    )
    expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
  })

  it('renders correctly when user is authenticated', () => {
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: 'Jon Doe',
          email: 'jon.doe@exemple.com'
        },
        expires: 'fake-expires'
      },
      status: 'authenticated'
    })

    render(
      <SignInButton />
    )
    expect(screen.getByText('Flavio Santos')).toBeInTheDocument()
  })
})