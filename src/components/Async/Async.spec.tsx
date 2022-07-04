import { render, screen, waitFor } from '@testing-library/react'
import { Async } from '.'

test('it renders correctly', async () => {
  render(<Async />)

  expect(screen.getByText('Hello World')).toBeInTheDocument()
  await waitFor(() => expect(screen.getByText('Button')).toBeInTheDocument())
  await waitFor(() => expect(screen.getByText('Button')).toBeInTheDocument())
  // uso como abaixo para ver se uma elemento não esta na tela
  // await waitFor(() => expect(screen.queryByText('Button')).not.toBeInTheDocument())
})

/**
 * 1. getByText - qnd quero pegar um txt no momento do test e quero retornar um
 * cas não encontrado
 * 2. findByText - qnd quero pegar um txt e fazer o test aguardar 1 segundo e se não
 * achar retorna erro
 * 3. queryByText - qnd quero pegar um txt e aguardar, mas não retorna erro 
 */