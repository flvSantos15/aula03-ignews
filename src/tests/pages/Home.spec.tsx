import { render, screen } from '@testing-library/react'
import { stripe } from '../../services/stripe'
import Home, { getStaticProps } from '../../pages'

jest.mock('next/router')
jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return { data: null, status: 'loading' }
    }
  }
})
jest.mock('../../services/stripe')

describe('Home page', () => {
  it('renders correctly', () => {
    render(
      <Home
        product={{
          priceId: 'fake-priceId',
          amount: 'R$ 10,00'
        }}
      />
    )
    expect(screen.getByText('for R$10,00 month')).toBeInTheDocument()
  })

  it('initial data', async () => {
    const retrieveStripePriceMocked = jest.mocked(stripe.prices.retrieve)

    // sempre q fn for promise uso esse:
    retrieveStripePriceMocked.mockResolvedValueOnce({
      id: 'fake-price-amount',
      unit_amount: 1000
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10,00'
          }
        }
      })
    )
  })
})