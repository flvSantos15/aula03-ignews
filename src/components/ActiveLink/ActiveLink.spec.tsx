import { render, screen } from '@testing-library/react' // import para 'renderizar' um componente p teste
import { ActiveLink } from '.'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe('ActiveLink Component', () => {
  it('should renders correctly', () => {
    render(
      <ActiveLink
        href='/' // aqui preciso passar tudo o q o component precisa
        activeClassName='active' // não precisar ser o valores reais
      >
        <a>Home</a>
      </ActiveLink>
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
    // espero que esse test, esteja no documento
  })

  it('should be receiving active className', () => {
    render(
      <ActiveLink
        href='/' // aqui preciso passar tudo o q o component precisa
        activeClassName='active' // não precisar ser o valores reais
      >
        <a>Home</a>
      </ActiveLink>
    )
    expect(screen.getByText('Home')).toHaveClass('active')
    // espero que esse test, esteja no documento
  })
})
