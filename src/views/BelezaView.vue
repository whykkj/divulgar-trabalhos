<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const busca = ref('')
const subcategoriaAtiva = ref('Todas')
const filtroRapido = ref('')
const favoritos = ref([])

const subcategorias = [
  'Todas',
  'Cabeleireiras',
  'Manicures',
  'Maquiagem',
  'Barbearia',
  'Sobrancelhas',
  'Depilação'
]

const filtrosRapidos = [
  {
    nome: 'Atende a Domicílio',
    icone: 'home_pin',
    cor: 'text-[#006947]'
  },
  {
    nome: 'Salão Próprio',
    icone: 'storefront',
    cor: 'text-[#855300]'
  },
  {
    nome: 'Disponível Hoje',
    icone: 'bolt',
    cor: 'text-[#a93105]'
  }
]

const profissionais = ref([
  {
    nome: 'Studio Camila Rocha',
    profissao: 'Cabeleireira & Colorista',
    categoria: 'Cabeleireiras',
    avaliacao: 4.9,
    avaliacoes: 185,
    bairro: 'Vila Mariana',
    distancia: 0.8,
    preco: 'R$ 80',
    disponibilidade: 'Atende a domicílio',
    atendeDomicilio: true,
    salaoProprio: true,
    disponivelHoje: true,
    especialidades: [
      'Corte Feminino',
      'Mechas & Luzes',
      'Escova Progressiva'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8n-3NcjPtyX4xPU-Tt_8IDkDWjduIr6hRC85ScEtMhdntOegQoRqpnZtzSWsc05JE61hlxAoFTqBIqpRrMyRyboDPkJsrAfRQjJEsXxbOikapqs1Q0jpoz1MK-JM_N5m7olJVeMywmTgo8HbkdF8moR32V_ZOiq5xKkuya0wc0oy2_f2ubgSFpOf82uWaHrnk2fNpZaIrPD54fKrUpbj50lUnfVjuUNqwRYkz8vvjSUEEo7RcaSnX',
    galeria: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDTnJIZnLj9ZNT6db4-Y3gk472buuy9thTXIDa9Qq_fw5DAgFCRocycenX1-ExI9fyKto85VjiT_FwLAlgmdn_Os94Lw_uLGVgM-sYYH4d56Pwe2xD7Fi59ylEUFKOIY-TdiFCG_ku_Pq1uRvBQozgWD33WMCybScx7fLgG7-_jC0dzznYq-PEXNkvM0RtURCieJ_l3Kg5-r5C5cZ7ixAlAPyG761FyNyVB_FhUUpnkljvASKpTfZJy',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD8M6fmyf4-rUZLE356j-Qz1RG2Fav-RYj61Tm_j_195xprBTAN4kBmbOEVSPlXOS9cMqdSiLUmn-3R6lIfbyktSYFyY2gWR4Eux6xHR3rHWjQg6NjEG3PnSIvke1Sy65D52AINfew2sGf7AaZ0--SfOg0AEU0H062QIymXuYJMv0Nzkq-wsWCof0qz-30Fb8nzF9nX5cTg3GMm7CjKMJBfciEGNuX6AK51jWMrjB-7ZpD7r8U3JBPi',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKa7V5--WqPWDHUIjWcWlIsjzwgJQMhL1IcXveyi7xXJ9h_g2KxQYhf_zmWBDJhRRRAeP9ln2X6oGM5_vmCNOb13jh8mDLqYryDpWGZQ1BA5VyW3WbVRefMXotL5yICZKZEHOdD1Qcxjx0zMwhtmqpl2fOqqHIYD2cixVc4uzjKTfxr2HrHFb8VBZAX9JJ4KO1SZMeQ30jLhc-pA2QSqk2sYiYE9UKrujR6h6liKC2yEvuLoE8cegf'
    ]
  },
  {
    nome: 'Espaço Unhas da Lu',
    profissao: 'Designer de Unhas & Manicure',
    categoria: 'Manicures',
    avaliacao: 4.8,
    avaliacoes: 142,
    bairro: 'Moema',
    distancia: 1.5,
    preco: 'R$ 45',
    disponibilidade: 'Disponível hoje',
    atendeDomicilio: false,
    salaoProprio: true,
    disponivelHoje: true,
    especialidades: [
      'Unhas de Gel',
      'Alongamento Fibra',
      'Nail Art'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBFRX9TVZXFHPyUNwKm9kfoEW_uZpEyzB80JLC5XmX-FUsuVE9xVdVFhqKxEF7JMmVBT2PMynHCaIbDEiziVlwPaMH9QeSUz1_BWENggudumimQQ-eps3D_TCChzKYKKzzZ_vqKMTubdjZMsgJ2W_HEbaEC5rxvPe36rc_KHeFYKvTJhSeApIEzzTbMvvhuHp4x-VGWT3p6T1mqD4NUd54AewpPbfkiOJwR_RpjEB6U2mFdHuLxR5Zx',
    galeria: []
  },
  {
    nome: 'Barbearia Raiz & Navalha',
    profissao: 'Barbeiro Especialista',
    categoria: 'Barbearia',
    avaliacao: 4.9,
    avaliacoes: 310,
    bairro: 'Pinheiros',
    distancia: 2,
    preco: 'R$ 50',
    disponibilidade: 'Aberto agora',
    atendeDomicilio: false,
    salaoProprio: true,
    disponivelHoje: true,
    especialidades: [
      'Corte Degradê',
      'Barboterapia',
      'Tratamento Capilar'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAq7LIXhRMwMK5C3uR8sTxdjHShyNA4EjdoXhcoZGzGoYaaeEq7A1T0oUjik-9iz2dLiMV-Gf0Ty1cZRhC5Ak0Xrbqr84-s3c6LM1NBpndJn6LseKXO4RN64E49L_PtdcASSNYCWJexwcHLO6ehr3knQpTW3q9wIWQCQM99x9IUU37tWVbRjyzAl875XZKCLCLxCjZDDy5Q_62TskrR_MrggZDwv8Ytn5OetJNP6QO5dJqhEsCx0HJa',
    galeria: []
  },
  {
    nome: 'Amanda Sobrancelhas & Make',
    profissao: 'Maquiadora & Lash Designer',
    categoria: 'Maquiagem',
    categoriaSecundaria: 'Sobrancelhas',
    avaliacao: 5,
    avaliacoes: 95,
    bairro: 'Bela Vista',
    distancia: 1.2,
    preco: 'R$ 70',
    disponibilidade: '',
    atendeDomicilio: true,
    salaoProprio: false,
    disponivelHoje: false,
    especialidades: [
      'Extensão de Cílios',
      'Microblading',
      'Maquiagem Social'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBMCacj_CeIsaPCozy1dl0JvBnyM5pjDjY6_PPPyqFbgik8M-C1EnRkyvDxLwp_MtBVi3y21SzegsS-wA-WrGvarzbg2aFjbp82pP5F2hBhA2Gg3i-JBEAjdnBdgRLKcZCn2ewkuUYsEHRuQH5Y2JF1VWzqlWLWKrBiE3WoHxO6hkrNFR-9_8jmao0j0KkYOffHBpQRswBvw9aEcLd5GMbQ7dibT-PxOu-5IXns87E3FazIX3n4XHco',
    galeria: []
  }
])

const profissionaisExibidos = computed(() => {
  let resultado = [...profissionais.value]

  if (subcategoriaAtiva.value !== 'Todas') {
    resultado = resultado.filter((profissional) => {
      return (
        profissional.categoria === subcategoriaAtiva.value ||
        profissional.categoriaSecundaria === subcategoriaAtiva.value
      )
    })
  }

  if (filtroRapido.value === 'Atende a Domicílio') {
    resultado = resultado.filter(
      (profissional) => profissional.atendeDomicilio
    )
  }

  if (filtroRapido.value === 'Salão Próprio') {
    resultado = resultado.filter(
      (profissional) => profissional.salaoProprio
    )
  }

  if (filtroRapido.value === 'Disponível Hoje') {
    resultado = resultado.filter(
      (profissional) => profissional.disponivelHoje
    )
  }

  const termo = busca.value.trim().toLowerCase()

  if (termo) {
    resultado = resultado.filter((profissional) => {
      const conteudo = [
        profissional.nome,
        profissional.profissao,
        profissional.categoria,
        profissional.categoriaSecundaria,
        profissional.bairro,
        ...profissional.especialidades
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return conteudo.includes(termo)
    })
  }

  return resultado
})

function selecionarFiltro(nome) {
  filtroRapido.value =
    filtroRapido.value === nome ? '' : nome
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

function voltar() {
  router.push('/')
}

function agendar(profissional) {
  alert(`Agendamento selecionado com ${profissional.nome}`)
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
            class="min-w-11 min-h-11 flex items-center justify-center rounded-full text-[#59413a] hover:text-[#a93105] transition-colors"
            @click="voltar"
          >
            <span class="material-symbols-outlined text-2xl">
              arrow_back
            </span>
          </button>

          <h1 class="text-lg font-semibold tracking-tight">
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
      <div class="max-w-[700px] mx-auto flex flex-col gap-3">
        <!-- APRESENTAÇÃO DA CATEGORIA -->
        <section class="bg-[#f0f3ff] rounded-xl p-3 shadow-sm">
          <div class="flex items-center justify-between gap-2 mb-2">
            <div class="flex items-center gap-2">
              <div
                class="w-10 h-10 rounded-full bg-[#a93105]/10 flex items-center justify-center text-[#a93105]"
              >
                <span class="material-symbols-outlined text-[22px]">
                  content_cut
                </span>
              </div>

              <div>
                <h2 class="text-lg font-semibold">
                  Beleza & Estética
                </h2>

                <p class="text-xs text-[#59413a]">
                  Cuidados, estilo e bem-estar perto de você
                </p>
              </div>
            </div>

            <span
              class="text-[11px] bg-[#ffddb8] text-[#2a1700] px-1.5 py-0.5 rounded-full font-semibold"
            >
              Novo
            </span>
          </div>

          <!-- BUSCA -->
          <div class="relative w-full">
            <span
              class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#59413a] text-xl"
            >
              search
            </span>

            <input
              v-model="busca"
              type="text"
              class="w-full bg-white text-[#111c2d] text-sm pl-10 pr-10 py-2.5 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-[#a93105]/20"
              placeholder="Buscar serviços, corte, manicure..."
            />

            <button
              type="button"
              aria-label="Abrir filtros"
              class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#59413a] p-1 rounded-full hover:bg-[#e7eeff]"
            >
              <span class="material-symbols-outlined text-lg">
                tune
              </span>
            </button>
          </div>
        </section>

        <!-- SUBCATEGORIAS -->
        <section class="-mx-4 px-4 overflow-x-auto flex gap-1 py-0.5">
          <button
            v-for="subcategoria in subcategorias"
            :key="subcategoria"
            type="button"
            class="whitespace-nowrap px-3.5 py-1.5 rounded-full text-[13px] font-semibold shadow-sm transition-colors"
            :class="
              subcategoriaAtiva === subcategoria
                ? 'bg-[#a93105] text-white'
                : 'bg-white text-[#59413a] hover:text-[#a93105]'
            "
            @click="subcategoriaAtiva = subcategoria"
          >
            {{ subcategoria }}
          </button>
        </section>

        <!-- LOCALIZAÇÃO -->
        <section class="flex flex-col gap-1">
          <div
            class="flex flex-wrap items-center justify-between gap-2 text-[13px]"
          >
            <span class="flex items-center gap-1 font-semibold">
              <span
                class="material-symbols-outlined text-[#a93105] text-lg"
              >
                location_on
              </span>

              {{ profissionaisExibidos.length }} profissionais em Belem, PA
            </span>

            <span
              class="text-[#006947] font-semibold flex items-center gap-1"
            >
              <span
                class="w-2 h-2 rounded-full bg-[#006947] animate-pulse"
              ></span>

              Em tempo real
            </span>
          </div>

          <!-- FILTROS RÁPIDOS -->
          <div class="-mx-4 px-4 overflow-x-auto flex gap-1 py-1">
            <button
              v-for="filtro in filtrosRapidos"
              :key="filtro.nome"
              type="button"
              class="shrink-0 flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold shadow-sm transition-colors"
              :class="
                filtroRapido === filtro.nome
                  ? 'bg-[#a93105] text-white'
                  : 'bg-white text-[#111c2d] hover:bg-[#e7eeff]'
              "
              @click="selecionarFiltro(filtro.nome)"
            >
              <span
                class="material-symbols-outlined text-[15px]"
                :class="
                  filtroRapido === filtro.nome
                    ? 'text-white'
                    : filtro.cor
                "
              >
                {{ filtro.icone }}
              </span>

              {{ filtro.nome }}
            </button>
          </div>
        </section>

        <!-- LISTA DE PROFISSIONAIS -->
        <section class="flex flex-col gap-3">
          <article
            v-for="profissional in profissionaisExibidos"
            :key="profissional.nome"
            class="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2"
          >
            <div class="flex items-start gap-2">
              <div
                class="relative w-14 h-14 rounded-full overflow-hidden shrink-0 bg-[#e7eeff]"
              >
                <img
                  :src="profissional.imagem"
                  :alt="profissional.nome"
                  class="w-full h-full object-cover"
                />

                <span
                  class="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#006947] ring-2 ring-white"
                ></span>
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-1">
                  <h3 class="text-lg font-semibold truncate">
                    {{ profissional.nome }}
                  </h3>

                  <button
                    type="button"
                    :aria-label="
                      estaFavoritado(profissional.nome)
                        ? 'Remover dos favoritos'
                        : 'Adicionar aos favoritos'
                    "
                    class="p-1 transition-colors"
                    :class="
                      estaFavoritado(profissional.nome)
                        ? 'text-[#a93105]'
                        : 'text-[#59413a] hover:text-[#a93105]'
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

                <p class="text-xs text-[#59413a]">
                  {{ profissional.profissao }}
                </p>

                <div class="flex flex-wrap items-center gap-2 mt-1 text-xs">
                  <span
                    class="inline-flex items-center gap-0.5 text-[#855300] font-bold"
                  >
                    <span
                      class="material-symbols-outlined text-[#fea619] text-[15px]"
                      style="font-variation-settings: 'FILL' 1"
                    >
                      star
                    </span>

                    {{ profissional.avaliacao }}
                  </span>

                  <span class="text-[#59413a]">
                    ({{ profissional.avaliacoes }} avaliações)
                  </span>

                  <span class="text-[#e1bfb6]">•</span>

                  <span class="text-[#59413a]">
                    {{ profissional.bairro }} •
                    {{ profissional.distancia }} km
                  </span>
                </div>
              </div>
            </div>

            <!-- GALERIA -->
            <div
              v-if="profissional.galeria.length"
              class="grid grid-cols-3 gap-1 rounded-lg overflow-hidden"
            >
              <div
                v-for="(foto, indice) in profissional.galeria"
                :key="foto"
                class="h-20 bg-[#e7eeff] relative"
              >
                <img
                  :src="foto"
                  :alt="`Trabalho de ${profissional.nome}`"
                  class="w-full h-full object-cover"
                />

                <span
                  v-if="indice === 2"
                  class="absolute inset-0 bg-[#263143]/40 flex items-center justify-center text-white text-[13px] font-bold"
                >
                  +12
                </span>
              </div>
            </div>

            <!-- DISPONIBILIDADE E ESPECIALIDADES -->
            <div class="flex flex-wrap items-center gap-1.5">
              <span
                v-if="profissional.disponibilidade"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#6ffbbe] text-[#002113] text-[11px] font-semibold"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-[#006947]"
                ></span>

                {{ profissional.disponibilidade }}
              </span>

              <span
                v-for="especialidade in profissional.especialidades"
                :key="especialidade"
                class="px-2 py-0.5 rounded-md bg-[#f0f3ff] text-[#59413a] text-[11px]"
              >
                {{ especialidade }}
              </span>
            </div>

            <!-- PREÇO E AGENDAMENTO -->
            <div class="pt-1 flex items-center justify-between gap-2">
              <span class="text-[13px] text-[#59413a]">
                A partir de

                <strong class="text-lg text-[#111c2d]">
                  {{ profissional.preco }}
                </strong>
              </span>

              <button
                type="button"
                class="bg-[#a93105] hover:bg-[#cb491f] text-white text-[15px] font-semibold px-4 py-2 rounded-xl shadow-sm transition-colors"
                @click="agendar(profissional)"
              >
                Agendar Horário
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
              Tente selecionar outra categoria ou alterar a busca.
            </p>
          </div>
        </section>

        <!-- INCENTIVO -->
        <aside
          class="bg-gradient-to-r from-[#ffdbd1] to-[#ffddb8] rounded-xl p-3 shadow-sm flex items-center gap-3"
        >
          <div
            class="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 text-[#a93105] shadow-sm"
          >
            <span class="material-symbols-outlined text-2xl">
              handshake
            </span>
          </div>

          <div class="flex-1 min-w-0">
            <h3 class="text-[15px] text-[#3a0a00] font-bold leading-snug">
              Valorize o talento do seu bairro
            </h3>

            <p class="text-xs text-[#862300] mt-0.5">
              Agende com antecedência e apoie profissionais autônomos
              locais a crescerem.
            </p>
          </div>
        </aside>
      </div>
    </main>

    <!-- MENU INFERIOR -->
    <nav
      class="fixed bottom-0 left-0 w-full z-50 bg-[#f9f9ff]/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)]"
    >
      <div class="flex justify-around items-center h-16 px-1">
        <button
          type="button"
          class="flex flex-col items-center justify-center min-w-11 min-h-11 text-[#59413a] hover:text-[#a93105]"
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
          class="flex flex-col items-center justify-center min-w-11 min-h-11 text-[#59413a] hover:text-[#a93105]"
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
          class="flex flex-col items-center justify-center min-w-11 min-h-11 text-[#59413a] hover:text-[#a93105]"
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
          class="flex flex-col items-center justify-center min-w-11 min-h-11 text-[#59413a] hover:text-[#a93105]"
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