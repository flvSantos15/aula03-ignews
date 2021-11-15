import { GetStaticProps } from 'next'
import Head from 'next/head'
import Prismic from '@prismicio/client'

import { getPrismicClient } from '../../services/prismic'

import styles from './styles.module.scss'

export default function Posts(){
  return(
    <>
      <Head>
        <title>Post | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href='#'>
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>Vou trazer um conceito — uma ideia — que vai além de mudar o background do fundo da tela e as cores dos textos, que é o padrão. Vamos escurecer um pouco as imagens também.</p>
          </a>
          <a href='#'>
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>Vou trazer um conceito — uma ideia — que vai além de mudar o background do fundo da tela e as cores dos textos, que é o padrão. Vamos escurecer um pouco as imagens também.</p>
          </a>
          <a href='#'>
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>Vou trazer um conceito — uma ideia — que vai além de mudar o background do fundo da tela e as cores dos textos, que é o padrão. Vamos escurecer um pouco as imagens também.</p>
          </a>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'publication')
  ],{
    fetch: ['publication.title', 'publication.content'],
    pageSize: 100,
  })

  console.log(response)

  return {
    props : {}
  }
}