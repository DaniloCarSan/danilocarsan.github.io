import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Sem título",
    description: "Nenhuma descrição fornecida",
  },
  components: {
    callout: {
      note: "Nota",
      abstract: "Resumo",
      info: "Informação",
      todo: "A fazer",
      tip: "Dica",
      success: "Sucesso",
      question: "Pergunta",
      warning: "Aviso",
      failure: "Falha",
      danger: "Perigo",
      bug: "Bugs",
      example: "Exemplo",
      quote: "Citação",
    },
    backlinks: {
      title: "Backlinks",
      noBacklinksFound: "Nenhum backlink encontrado",
    },
    themeToggle: {
      lightMode: "Modo claro",
      darkMode: "Modo escuro",
    },
    explorer: {
      title: "Explorador",
    },
    footer: {
      createdWith: "Criado com",
    },
    graph: {
      title: "Visualização de Gráfico",
    },
    recentNotes: {
      title: "Notas Recentes",
      seeRemainingMore: ({ remaining }) => `Ver mais ${remaining} →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Transclusão de ${targetSlug}`,
      linkToOriginal: "Link para original",
    },
    search: {
      title: "Busca",
      searchBarPlaceholder: "Buscar por algo",
    },
    tableOfContents: {
      title: "Sumário",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `Tempo de leitura: ${minutes} min`,
    },
  },
  pages: {
    rss: {
      recentNotes: "Notas recentes",
      lastFewNotes: ({ count }) => `Últimas ${count} notas`,
    },
    error: {
      title: "Não Encontrado",
      notFound: "Esta página é privada ou não existe.",
    },
    folderContent: {
      folder: "Pasta",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 item nesta pasta." : `${count} itens nesta pasta.`,
    },
    tagContent: {
      tag: "Tag",
      tagIndex: "Índice de Tags",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 item com esta tag." : `${count} itens com esta tag.`,
      showingFirst: ({ count }) => `Mostrando as primeiras ${count} tags.`,
      totalTags: ({ count }) => `Encontradas ${count} tags no total.`,
    },
  },
} as const satisfies Translation
