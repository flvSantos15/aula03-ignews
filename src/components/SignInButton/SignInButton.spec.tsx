import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/client'
import { SignInButton } from '.'

jest.mock('next-auth/client')

describe('SignInButton Component', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = jest.mocked(useSession)

    // useSessionMocked.mockReturnValue([null, false]) // a partie desse linha vai retorna vazio
    useSessionMocked.mockReturnValueOnce([null, false]) // vai retornar apenas 1 vez

    render(
      <SignInButton />
    )
    expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
  })

  it('renders correctly when user is authenticated', () => {
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: 'Jon Doe',
          email: 'jon.doe@exemple.com'
        },
        expires: 'fake-expires'
      },
      false
    ])

    render(
      <SignInButton />
    )
    expect(screen.getByText('Jon Doe')).toBeInTheDocument()
  })
})