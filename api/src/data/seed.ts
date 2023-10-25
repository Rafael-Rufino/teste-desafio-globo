import { prisma } from '../lib/prisma'

async function main() {
  const highlights = [
    {
      title: 'Pop & Art',
      url: 'http://g1.globo.com/pop-arte/index.html',
      logo: 'http://s.glbimg.com/bu/i/fc/5fb2e18d-a47f-4bb8-9a7e-b66871cf53c0.png',
      queries: [
        { value: 'música' },
        { value: 'pop' },
        { value: 'art' },
        { value: 'arte' },
        { value: 'cultura' },
        { value: 'shows' },
      ],
    },
    {
      title: 'Política',
      url: 'http://g1.globo.com/politica/index.html',
      logo: 'http://s.glbimg.com/bu/i/fc/5fb2e18d-a47f-4bb8-9a7e-b66871cf53c0.png',
      queries: [
        { value: 'eleições' },
        { value: 'política' },
        { value: 'dilma' },
        { value: 'aécio' },
        { value: 'apuração' },
      ],
    },
    {
      title: 'Neymar',
      url: 'http://globoesporte.globo.com/pop-arte/index.html',
      logo: 'http://s.glbimg.com//es/sde/f/2014/06/11/8f43a73e5a1046e40507df53aade4cb4_80x80.jpeg',
      queries: [
        { value: 'futebol' },
        { value: 'neymar' },
        { value: 'barcelona' },
        { value: 'brasil' },
      ],
    },
    {
      title: 'iPhone',
      url: 'http://www.techtudo.com.br/tudo-sobre/iphone-6.html',
      logo: 'http://s2.glbimg.com/MtxbxzJKdWKkG1GIq3K1ljOz-8Q=/90x90/s2.glbimg.com/39EyVUsSanEBBcoPHDGLx5paorU=/91x118:1437x1004/494x325/s.glbimg.com/po/tt2/f/original/2014/09/09/iphone_6_1.jpg',
      queries: [
        { value: 'iphone' },
        { value: 'celular' },
        { value: 'apple' },
        { value: 'smartphone' },
      ],
    },
  ]

  for (const highlightData of highlights) {
    const queriesData = highlightData.queries.map((query) => ({
      value: query.value,
    }))

    await prisma.highlights.create({
      data: {
        title: highlightData.title,
        url: highlightData.url,
        logo: highlightData.logo,
        queries: {
          create: queriesData,
        },
      },
    })
  }

  const suggestions = [
    'futebol brasileiro',
    'futebol americano',
    'futebol',
    'musica',
    'musica de anderson freire',
    'musica que neymar pediu',
    'politica entre dilma e aecio',
    'politica',
    'politica macroeconomica',
    'neymar',
    'neymar no barcelona',
    'gol do neymar',
    'iphone memoria',
    'iphone plus',
    'iphone 6',
  ]

  for (const suggestionData of suggestions) {
    await prisma.suggestions.create({
      data: {
        value: suggestionData,
      },
    })
  }
}

main()
  .catch((error) => {
    console.error('Erro durante o seeding:', error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
