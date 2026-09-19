<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const busca = ref('')
const subcategoriaAtiva = ref('Todos')
const filtroAtivo = ref('')
const favoritos = ref([])

const subcategorias = [
  {
    nome: 'Todos',
    icone: 'verified'
  },
  {
    nome: 'Marido de Aluguel',
    icone: 'handyman'
  },
  {
    nome: 'Diaristas & Faxina',
    icone: 'cleaning_services'
  },
  {
    nome: 'Mudanças & Fretes',
    icone: 'local_shipping'
  },
  {
    nome: 'Jardinagem',
    icone: 'yard'
  },
  {
    nome: 'Montadores de Móveis',
    icone: 'chair'
  },
  {
    nome: 'Conserto de Eletros',
    icone: 'electrical_services'
  }
]

const filtros = [
  {
    nome: 'Emergência / Rápido',
    icone: 'bolt'
  },
  {
    nome: 'Mais perto',
    icone: 'near_me'
  },
  {
    nome: 'Melhores notas',
    icone: 'star'
  }
]

const profissionais = ref([
  {
    nome: 'Seu Antônio Reparos Rápidos',
    profissao: 'Marido de Aluguel & Consertos',
    categoria: 'Marido de Aluguel',
    avaliacao: 4.9,
    avaliacoes: 240,
    bairro: 'Bela Vista',
    distancia: 0.6,
    disponibilidade: 'Disponível agora (Emergência)',
    emergencia: true,
    botao: 'Chamar Agora',
    botaoIcone: 'bolt',
    especialidades: [
      'Troca de Chuveiro',
      'Varal & Prateleiras',
      'Fechaduras & Portas'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCMk9oZeeP-gi3dB54527Q1bEBnh7Mt5qC9BmWb8fAuCklHXVT-XKJOp6eYCzB9zT0HvikRSNFUCmPxD9V8QJZd4QtBMV8CFUPF9lQxoIFBumBdjM847CbqrQ904eRxihlvuzC7wiMVKg1cIhtMCpOZHwpG-GBzTezmO7Bz3OaScLepMzUuEfHhJAxyndawMmr66eBLsdUERXwzgWm8dikx-v5ISXWljndnct1Hh0a42FWrSWfqO7fE'
  },
  {
    nome: 'Dona Maria & Filhas',
    profissao: 'Diaristas Profissionais',
    categoria: 'Diaristas & Faxina',
    avaliacao: 5,
    avaliacoes: 352,
    bairro: 'Saúde',
    distancia: 1.8,
    disponibilidade: 'Verificada pela vizinhança',
    emergencia: false,
    botao: 'Agendar Diária',
    botaoIcone: 'calendar_month',
    especialidades: [
      'Faxina Residencial',
      'Limpeza Pós-Obra',
      'Passadeira'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCSKMVCO_rFZDvn4ziOKXqLvlCdMFao866XINFHctiOzTmxdAWmwgee4jxCKAsoKD4ycuUDTYq8LU0qq1lVuZfdt9XbidchGgLrI2PYUNCHCReuhXTaiXI8PJZwxWy-K8kd5gIPXtO5inb0xfNNcnv9XCPZZfLWhWIKO1adePKyJWu8doCd_st0e6h_rfaYQ6qNnD5ue2UOVaDPPJxIe4HwMWvMxuj2nGyPf4SX_Be4fGs5NeTDwOon'
  },
  {
    nome: 'Verde Vida Paisagismo',
    profissao: 'Jardineiro & Manutenção Externa',
    categoria: 'Jardinagem',
    avaliacao: 4.8,
    avaliacoes: 88,
    bairro: 'Vila Mariana',
    distancia: 2.5,
    disponibilidade: 'Disponível',
    emergencia: false,
    botao: 'Pedir Orçamento',
    botaoIcone: 'request_quote',
    especialidades: [
      'Corte de Grama',
      'Poda de Árvores',
      'Controle de Pragas'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCt2iIAtG1safBr6i_HYKnmi6_iNDk-NM-yU10g3peaUkBgqt_HEgsdYAPKJRj2YNrj9nxsuXm5WpDfdsyvASMg612AvaijgrZUXh_6sE7uqnTEUQnW6AvsA4b2RZh5GOaHV0QIl081oNOaYzwndLALeJEAhfC49EwLAx_VJyWsNbqzElJh3kCxCmkSuVTL-9jdJ2CkEOAc4iAB8ENEBq_xy_4uvo-7S72Kua7h4i78JuF8o0-HAMXT'
  },
  {
    nome: 'Leandro Montagens Rápidas',
    profissao: 'Montador de Móveis Credenciado',
    categoria: 'Montadores de Móveis',
    avaliacao: 4.9,
    avaliacoes: 130,
    bairro: 'Ipiranga',
    distancia: 3.2,
    disponibilidade: 'Disponível amanhã',
    emergencia: false,
    botao: 'Consultar Horários',
    botaoIcone: 'calendar_today',
    especialidades: [
      'Móveis Planejados',
      'Guarda-roupas',
      'Desmontagem para Mudança'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDeK4PwaLL6jmeaqR9jWcfie2Qp1k6sB9uw4c7aRvbkB9-mZnkd5bHZU8W5db4yb-x6HS5WDHqv9IWuzRiSiOAjxD3Zeu0X46LjlBzOU-1UbVVVOOgg_JWIefNeaGNgl09W3SUpf0MPeQZuI3DiYpn2Tv6QFGQaMHa-jI6rv5I67j-WBcfNYCEXMz9uK0o-D1exa29x8Py3FkqcvcQk8chwT7dYqTTbBS44GDCu3Vd-OKYe04Q4o3qm'
  }
])

const profissionaisExibidos = computed(() => {
  let resultado = [...profissionais.value]

  if (subcategoriaAtiva.value !== 'Todos') {
    resultado = resultado.filter(
      (profissional) =>
        profissional.categoria === subcategoriaAtiva.value
    )
  }

  const termo = busca.value.trim().toLowerCase()

  if (termo) {
    resultado = resultado.filter((profissional) => {
      const conteudo = [
        profissional.nome,
        profissional.profissao,
        profissional.categoria,
        profissional.bairro,
        ...profissional.especialidades
      ]
        .join(' ')
        .toLowerCase()

      return conteudo.includes(termo)
    })
  }

  if (filtroAtivo.value === 'Emergência / Rápido') {
    resultado = resultado.filter(
      (profissional) => profissional.emergencia
    )
  }

  if (filtroAtivo.value === 'Mais perto') {
    resultado.sort((a, b) => a.distancia - b.distancia)
  }

  if (filtroAtivo.value === 'Melhores notas') {
    resultado.sort((a, b) => b.avaliacao - a.avaliacao)
  }

  return resultado
})

function selecionarFiltro(nome) {
  filtroAtivo.value =
    filtroAtivo.value === nome ? '' : nome
}

function alternarFavorito(nome) {
  if (favoritos.value.includes(nome)) {
    favoritos.value = favoritos.value.filter(
      (favorito) => favorito !== nome
    )
  } else {
    favoritos.value.push(nome)
  }
}

function estaFavoritado(nome) {
  return favoritos.value.includes(nome)
}

function solicitarServico(profissional) {
  alert(`Serviço selecionado: ${profissional.nome}`)
}

function voltar() {
  router.push('/')
}
</script>

<template>
  <div
    class="min-h-screen bg-[#f9f9ff] text-[#111c2d] font-['Plus_Jakarta_Sans']"
  >
    <!-- CABEÇALHO -->
    <header
      class="fixed top-0 left-0 w-full z-50 bg-[#f9f9ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
    >
      <div class="h-16 px-4 flex items-center justify-between gap-2">
        <div class="flex items-center gap-1">
          <button
            type="button"
            aria-label="Voltar"
            class="min-w-11 min-h-11 flex items-center justify-center rounded-full text-[#59413a] hover:text-[#a93105]"
            @click="voltar"
          >
            <span class="material-symbols-outlined text-2xl">
              arrow_back
            </span>
          </button>

          <h1 class="text-lg font-semibold">
            Categorias
          </h1>
        </div>

        <div class="flex items-center gap-1">
          <button
            type="button"
            aria-label="Notificações"
            class="min-w-11 min-h-11 flex items-center justify-center rounded-full text-[#59413a] hover:text-[#a93105]"
          >
            <span class="material-symbols-outlined text-2xl">
              notifications
            </span>
          </button>

          <div
            class="w-8 h-8 rounded-full bg-[#a93105] flex items-center justify-center"
          >
            <span class="material-symbols-outlined text-white text-lg">
              person
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- CONTEÚDO -->
    <main class="w-full pt-20 pb-24 px-4">
      <div class="max-w-[700px] mx-auto flex flex-col gap-4">
        <!-- APRESENTAÇÃO -->
        <section
          class="flex flex-col bg-[#f0f3ff] rounded-xl p-3 shadow-sm gap-3"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div
                class="w-11 h-11 rounded-full bg-[#ffdbd1] flex items-center justify-center text-[#a93105] shadow-sm"
              >
                <span class="material-symbols-outlined text-2xl">
                  home_repair_service
                </span>
              </div>

              <div>
                <h2 class="text-lg font-semibold">
                  Serviços Gerais
                </h2>

                <p class="text-xs text-[#59413a]">
                  Soluções práticas e confiáveis para seu lar
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Mais informações"
              class="w-9 h-9 rounded-full bg-[#d8e3fb] flex items-center justify-center text-[#59413a]"
            >
              <span class="material-symbols-outlined text-xl">
                info
              </span>
            </button>
          </div>

          <!-- BUSCA -->
          <div class="relative w-full">
            <span
              class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8d7169] text-xl"
            >
              search
            </span>

            <input
              v-model="busca"
              type="text"
              class="w-full h-11 pl-10 pr-10 rounded-full bg-white text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#a93105]/20"
              placeholder="O que você precisa consertar hoje?"
            />

            <button
              type="button"
              aria-label="Abrir filtros"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-[#8d7169] hover:text-[#a93105]"
            >
              <span class="material-symbols-outlined text-lg">
                tune
              </span>
            </button>
          </div>
        </section>

        <!-- SUBCATEGORIAS -->
        <section class="-mx-4 px-4 overflow-x-auto">
          <div class="flex items-center gap-1 py-0.5">
            <button
              v-for="subcategoria in subcategorias"
              :key="subcategoria.nome"
              type="button"
              class="shrink-0 px-3 py-1.5 rounded-full text-[13px] font-semibold flex items-center gap-1.5 transition-all"
              :class="
                subcategoriaAtiva === subcategoria.nome
                  ? 'bg-[#a93105] text-white shadow-sm'
                  : 'bg-[#dee8ff] text-[#59413a] hover:bg-[#d8e3fb]'
              "
              @click="subcategoriaAtiva = subcategoria.nome"
            >
              <span class="material-symbols-outlined text-base">
                {{ subcategoria.icone }}
              </span>

              {{ subcategoria.nome }}
            </button>
          </div>
        </section>

        <!-- LOCALIZAÇÃO E FILTROS -->
        <section class="flex flex-col gap-1">
          <div class="flex items-center gap-1 text-[#59413a]">
            <span
              class="material-symbols-outlined text-lg text-[#006947]"
            >
              location_on
            </span>

            <strong class="text-[13px] text-[#111c2d]">
              {{ profissionaisExibidos.length }} profissionais
            </strong>

            <span class="text-xs">
              em Belem, PA
            </span>
          </div>

          <div class="flex items-center gap-1 overflow-x-auto pt-1">
            <button
              v-for="filtro in filtros"
              :key="filtro.nome"
              type="button"
              class="shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold transition-all"
              :class="
                filtroAtivo === filtro.nome
                  ? 'bg-[#a93105] text-white ring-2 ring-[#ffb59f]'
                  : filtro.nome === 'Emergência / Rápido'
                    ? 'bg-[#ffdad6] text-[#93000a]'
                    : filtro.nome === 'Mais perto'
                      ? 'bg-[#ffddb8] text-[#653e00]'
                      : 'bg-[#e7eeff] text-[#59413a]'
              "
              @click="selecionarFiltro(filtro.nome)"
            >
              <span class="material-symbols-outlined text-sm">
                {{ filtro.icone }}
              </span>

              {{ filtro.nome }}
            </button>
          </div>
        </section>

        <!-- SOCORRO IMEDIATO -->
        <section
          class="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-[#ffdbd1] to-[#dee8ff] shadow-sm relative overflow-hidden"
        >
          <div class="flex-1 min-w-0 z-10">
            <span
              class="text-[11px] uppercase tracking-wide text-[#a93105] font-bold"
            >
              Socorro imediato
            </span>

            <h3 class="text-lg font-semibold leading-tight">
              Precisa de socorro rápido em casa?
            </h3>

            <p class="text-xs text-[#59413a] mt-0.5">
              Encontre quem resolve perto de você com resposta em minutos.
            </p>
          </div>

          <div
            class="w-14 h-14 shrink-0 rounded-full bg-white flex items-center justify-center text-[#a93105] shadow-md z-10"
          >
            <span
              class="material-symbols-outlined text-3xl"
              style="font-variation-settings: 'FILL' 1"
            >
              handyman
            </span>
          </div>
        </section>

        <!-- PROFISSIONAIS -->
        <section class="flex flex-col gap-3">
          <article
            v-for="profissional in profissionaisExibidos"
            :key="profissional.nome"
            class="flex flex-col bg-white rounded-xl p-3 shadow-sm hover:shadow-md gap-3 transition-shadow"
          >
            <div class="flex items-start gap-3">
              <div class="relative shrink-0">
                <img
                  :src="profissional.imagem"
                  :alt="profissional.nome"
                  class="w-16 h-16 rounded-xl object-cover shadow-sm bg-[#e7eeff]"
                />

                <div
                  class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#006947] text-white flex items-center justify-center shadow"
                >
                  <span class="material-symbols-outlined text-xs">
                    handyman
                  </span>
                </div>
              </div>

              <div class="flex-1 min-w-0">
                <span
                  class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                  :class="
                    profissional.emergencia
                      ? 'bg-[#6ffbbe] text-[#005236]'
                      : 'bg-[#dee8ff] text-[#59413a]'
                  "
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full"
                    :class="
                      profissional.emergencia
                        ? 'bg-[#006947] animate-pulse'
                        : 'bg-[#855300]'
                    "
                  ></span>

                  {{ profissional.disponibilidade }}
                </span>

                <h3 class="text-lg font-semibold truncate mt-1">
                  {{ profissional.nome }}
                </h3>

                <p class="text-xs text-[#59413a] font-medium">
                  {{ profissional.profissao }}
                </p>

                <div
                  class="flex flex-wrap items-center gap-2 mt-1.5 text-xs"
                >
                  <span
                    class="flex items-center gap-0.5 text-[#855300] font-bold"
                  >
                    <span
                      class="material-symbols-outlined text-base"
                      style="font-variation-settings: 'FILL' 1"
                    >
                      star
                    </span>

                    {{ profissional.avaliacao }}
                  </span>

                  <span class="text-[#59413a]">
                    ({{ profissional.avaliacoes }} avaliações)
                  </span>

                  <span class="text-[#8d7169]">•</span>

                  <span class="text-[#59413a] flex items-center">
                    <span class="material-symbols-outlined text-[13px]">
                      place
                    </span>

                    {{ profissional.bairro }} •
                    {{ profissional.distancia }} km
                  </span>
                </div>
              </div>
            </div>

            <!-- ESPECIALIDADES -->
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="especialidade in profissional.especialidades"
                :key="especialidade"
                class="px-2.5 py-1 rounded-lg bg-[#e7eeff] text-[11px] text-[#111c2d]"
              >
                {{ especialidade }}
              </span>
            </div>

            <!-- AÇÕES -->
            <div class="flex items-center gap-2 pt-1">
              <button
                type="button"
                class="flex-1 h-11 rounded-xl text-[15px] font-semibold flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                :class="
                  profissional.emergencia
                    ? 'bg-[#a93105] text-white shadow-md'
                    : 'bg-[#dee8ff] text-[#111c2d]'
                "
                @click="solicitarServico(profissional)"
              >
                <span class="material-symbols-outlined text-lg">
                  {{ profissional.botaoIcone }}
                </span>

                {{ profissional.botao }}
              </button>

              <button
                type="button"
                aria-label="Abrir conversa"
                class="w-11 h-11 rounded-xl bg-[#f0f3ff] text-[#59413a] flex items-center justify-center hover:text-[#a93105]"
              >
                <span class="material-symbols-outlined text-xl">
                  chat
                </span>
              </button>

              <button
                v-if="profissional.emergencia"
                type="button"
                aria-label="Adicionar aos favoritos"
                class="w-11 h-11 rounded-xl bg-[#f0f3ff] flex items-center justify-center"
                :class="
                  estaFavoritado(profissional.nome)
                    ? 'text-[#ba1a1a]'
                    : 'text-[#59413a]'
                "
                @click="alternarFavorito(profissional.nome)"
              >
                <span
                  class="material-symbols-outlined text-xl"
                  :style="
                    estaFavoritado(profissional.nome)
                      ? { fontVariationSettings: `'FILL' 1` }
                      : {}
                  "
                >
                  favorite
                </span>
              </button>
            </div>
          </article>

          <div
            v-if="profissionaisExibidos.length === 0"
            class="bg-white rounded-xl p-8 text-center shadow-sm"
          >
            <span
              class="material-symbols-outlined text-4xl text-[#a93105]"
            >
              search_off
            </span>

            <h3 class="font-bold mt-2">
              Nenhum profissional encontrado
            </h3>

            <p class="text-sm text-[#59413a] mt-1">
              Tente alterar a categoria, o filtro ou a pesquisa.
            </p>
          </div>
        </section>

        <!-- SEGURANÇA -->
        <footer
          class="flex items-center gap-2 p-3 rounded-xl bg-[#f0f3ff] text-[#59413a]"
        >
          <span
            class="material-symbols-outlined text-2xl text-[#006947] shrink-0"
          >
            shield
          </span>

          <p class="text-xs">
            Todos os profissionais passam por verificação e possuem
            avaliações reais de clientes da sua região.
          </p>
        </footer>
      </div>
    </main>

    <!-- MENU INFERIOR -->
    <nav
      class="fixed bottom-0 left-0 w-full z-50 bg-[#f9f9ff]/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)]"
    >
      <div class="flex justify-around items-center h-16 px-1">
        <button
          type="button"
          class="flex flex-col items-center justify-center min-w-11 min-h-11 text-[#59413a]"
          @click="voltar"
        >
          <span class="material-symbols-outlined text-2xl">
            home
          </span>

          <span class="text-[11px]">
            Início
          </span>
        </button>

        <button
          type="button"
          class="flex flex-col items-center justify-center min-w-11 min-h-11 text-[#a93105] font-bold"
        >
          <span class="material-symbols-outlined text-2xl">
            grid_view
          </span>

          <span class="text-[11px]">
            Categorias
          </span>
        </button>

        <button
          type="button"
          class="flex flex-col items-center justify-center min-w-11 min-h-11 text-[#59413a]"
        >
          <span class="material-symbols-outlined text-2xl">
            search
          </span>

          <span class="text-[11px]">
            Buscar
          </span>
        </button>

        <button
          type="button"
          class="flex flex-col items-center justify-center min-w-11 min-h-11 text-[#59413a]"
        >
          <span class="material-symbols-outlined text-2xl">
            chat
          </span>

          <span class="text-[11px]">
            Mensagens
          </span>
        </button>

        <button
          type="button"
          class="flex flex-col items-center justify-center min-w-11 min-h-11 text-[#59413a]"
        >
          <span class="material-symbols-outlined text-2xl">
            person
          </span>

          <span class="text-[11px]">
            Perfil
          </span>
        </button>
      </div>
    </nav>
  </div>
</template>