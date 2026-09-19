<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const busca = ref('')
const subcategoriaAtiva = ref('Todas')
const modoAtendimento = ref('')
const favoritos = ref([])

const subcategorias = [
  {
    nome: 'Todas',
    icone: 'done'
  },
  {
    nome: 'Conserto de Celular',
    icone: 'smartphone'
  },
  {
    nome: 'Técnico de Informática',
    icone: 'laptop_mac'
  },
  {
    nome: 'Redes & Wi-Fi',
    icone: 'router'
  },
  {
    nome: 'Câmeras & CFTV',
    icone: 'videocam'
  },
  {
    nome: 'Smart TVs',
    icone: 'tv'
  },
  {
    nome: 'Impressoras',
    icone: 'print'
  }
]

const profissionais = ref([
  {
    nome: 'Dr. Smartphone Express',
    profissao: 'Conserto de Celulares e Tablets',
    categoria: 'Conserto de Celular',
    avaliacao: 4.9,
    avaliacoes: 198,
    bairro: 'Consolação',
    distancia: 1.1,
    disponibilidade: 'Orçamento grátis em 1h',
    atendimentoRemoto: false,
    atendimentoDomicilio: false,
    destaque: 'Lab próprio',
    observacao: 'Entrega no mesmo dia',
    observacaoIcone: 'schedule',
    botao: 'Pedir Orçamento',
    especialidades: [
      'Troca de Tela',
      'Bateria Original',
      'Conector de Carga'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBUnFgBtu0MOHVFY7IxtLa0-V_7WvL6aF6zaMIYLEX9ZxCiPQIknSn1fKbJVek2AhPZuecYCpjAyY6LQ0juFR1dtC1nc_BP9kAvDuUHdUbac_8YEUbUycKkkdtinT14XDgFVRj-GcdujrwjqB_pqZGp7PktkEuBBjyYnu2ym0-Np1c8RQk0UuEnLj2h813ARHseVcx2sbqazgNEj47xYzv3rYoEbAKmZE7x-mpYhp3EBlBILaVyRpHx'
  },
  {
    nome: 'Lucas Tech Suporte TI',
    profissao: 'Técnico de Notebooks e PCs',
    categoria: 'Técnico de Informática',
    avaliacao: 4.8,
    avaliacoes: 115,
    bairro: 'Perdizes',
    distancia: 2.3,
    disponibilidade: 'Presencial ou remoto',
    atendimentoRemoto: true,
    atendimentoDomicilio: true,
    destaque: '',
    observacao: 'Avaliação prévia sem custo',
    observacaoIcone: 'check_circle',
    botao: 'Ver Perfil',
    especialidades: [
      'Formatação & Backup',
      'Upgrade SSD & RAM',
      'Remoção de Vírus'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDi9bp-iHCSnxlfs1YaZdjwq7VMHivMRxUD3O6OBr49ypOfRVweI8bgsEc4DuSgoWzM0tLxH8-rHCAysRLflwnSYc7Ks_sQx8PSofflz6kqX4C7HOWvsXRQtUaG0VZXgeYeyz1QXimau5eKfDKNhYnbfOav76Ml4SSbjbWOw_sspaGNK63osMOhAPBJFAvesqYlmAEimoUwO1jUmat91IZpqLaHN5j_kxUYxX9rVkrsGfzl2vCHM4dV'
  },
  {
    nome: 'SeguraNet Redes & Câmeras',
    profissao: 'Instalador de CFTV e Wi-Fi Mesh',
    categoria: 'Redes & Wi-Fi',
    categoriaSecundaria: 'Câmeras & CFTV',
    avaliacao: 5,
    avaliacoes: 89,
    bairro: 'Pinheiros',
    distancia: 2.9,
    disponibilidade: 'Disponível hoje',
    atendimentoRemoto: false,
    atendimentoDomicilio: true,
    destaque: '',
    observacao: 'Visita técnica gratuita',
    observacaoIcone: 'check_circle',
    botao: 'Contatar',
    especialidades: [
      'Câmeras Intelbras',
      'Roteadores Mesh',
      'Cabeamento Estruturado'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuChPa_e6Lww_DzNDSmQF8zeF1rQMNkSlr9RB6ma2VP9gj1xfEnHiyv-ez8nqK0WcI4dyA6tLyqwD-wdWhlLEPOK6ml_mr_nc5Ml_Tmyv6-3COxEelGY8X837jZO_nQHbbZAGqnXiwTR6VSe81Uoc_UnbQwxpxjkd4AJrcMOH13FXLFcvZwNT-OO-vuq2vWvTrsNPFf3R2-6LzO10Dzk85yDyGUHv20Hl68jfEpDG501xp7pgfp5waab'
  },
  {
    nome: 'Áudio & Vídeo Smart',
    profissao: 'Instalação de Suportes e TVs',
    categoria: 'Smart TVs',
    avaliacao: 4.7,
    avaliacoes: 53,
    bairro: 'Moema',
    distancia: 3.4,
    disponibilidade: 'Especialista em TV',
    atendimentoRemoto: false,
    atendimentoDomicilio: true,
    destaque: '',
    observacao: 'Leva suportes e cabos',
    observacaoIcone: 'inventory_2',
    botao: 'Pedir Orçamento',
    especialidades: [
      'Instalação em Painel',
      'Configuração Alexa',
      'Home Theater'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDAoZuFHnLZcJKXythIvPiRpikkDrLzzljf13TsyZWwYb9R7FOt49f3ZM3FCgzCi84v9aJIKQDQOPcQhSgZmOy0d-7kak1pd38ZuXV7_zKu0S4bt7-2qqBMTQNOm0xm3ZwsVqxQaXU2Ef92uhPpyvU7l8F77ucX012HVnSQbxwQXVizVcra7qzA_375zgF8vWftCUibfLBvkLvl6bYKF-f2WprElsGNw5yLmpgG5ksXZjUF_dOehOT5'
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

  if (modoAtendimento.value === 'remoto') {
    resultado = resultado.filter(
      (profissional) => profissional.atendimentoRemoto
    )
  }

  if (modoAtendimento.value === 'domicilio') {
    resultado = resultado.filter(
      (profissional) => profissional.atendimentoDomicilio
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

function selecionarModo(modo) {
  modoAtendimento.value =
    modoAtendimento.value === modo ? '' : modo
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

function cadastrarTecnico() {
  alert('Cadastro de técnico selecionado')
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
      <div class="h-16 px-4 flex items-center justify-between">
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
        <section class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div
                class="w-12 h-12 rounded-xl bg-[#ffdbd1] flex items-center justify-center text-[#a93105] shadow-sm"
              >
                <span class="material-symbols-outlined text-[26px]">
                  devices
                </span>
              </div>

              <div>
                <div class="flex items-center gap-1.5">
                  <h2 class="text-[22px] font-bold">
                    Tecnologia
                  </h2>

                  <span
                    class="inline-flex items-center px-2 py-0.5 rounded-full bg-[#ffddb8] text-[#2a1700] text-[11px]"
                  >
                    Ao vivo
                  </span>
                </div>

                <p class="text-xs text-[#59413a]">
                  Soluções digitais e reparos na sua vizinhança
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Abrir filtros"
              class="w-10 h-10 rounded-full bg-[#dee8ff] text-[#59413a] flex items-center justify-center hover:text-[#a93105]"
            >
              <span class="material-symbols-outlined text-xl">
                tune
              </span>
            </button>
          </div>

          <!-- BUSCA -->
          <div
            class="relative w-full shadow-sm rounded-xl overflow-hidden bg-white"
          >
            <span
              class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#59413a] text-[22px]"
            >
              search
            </span>

            <input
              v-model="busca"
              type="text"
              class="w-full pl-11 pr-10 py-3 bg-transparent text-sm outline-none focus:ring-2 focus:ring-[#a93105]/20"
              placeholder="Buscar marcas, peças ou serviços..."
            />

            <span
              class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#8d7169] text-xl"
            >
              mic
            </span>
          </div>
        </section>

        <!-- SUBCATEGORIAS -->
        <section class="-mx-4 px-4 overflow-x-auto flex gap-1 py-1">
          <button
            v-for="subcategoria in subcategorias"
            :key="subcategoria.nome"
            type="button"
            class="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap shadow-sm"
            :class="
              subcategoriaAtiva === subcategoria.nome
                ? 'bg-[#a93105] text-white'
                : 'bg-white text-[#59413a] hover:text-[#a93105]'
            "
            @click="subcategoriaAtiva = subcategoria.nome"
          >
            <span
              class="material-symbols-outlined text-base"
              :class="
                subcategoriaAtiva === subcategoria.nome
                  ? 'text-white'
                  : 'text-[#a93105]'
              "
            >
              {{ subcategoria.icone }}
            </span>

            {{ subcategoria.nome }}
          </button>
        </section>

        <!-- STATUS E ATENDIMENTO -->
        <section class="bg-[#f0f3ff] p-3.5 rounded-2xl">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-1.5">
              <span
                class="w-2 h-2 rounded-full bg-[#006947] animate-pulse"
              ></span>

              <span class="text-[13px] font-semibold">
                {{ profissionaisExibidos.length }} especialistas em São Paulo,
                SP
              </span>
            </div>

            <span class="text-xs text-[#006947] font-medium">
              Bairros próximos
            </span>
          </div>

          <div class="grid grid-cols-2 gap-1 pt-2">
            <button
              type="button"
              class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-[11px] font-semibold shadow-sm transition-colors"
              :class="
                modoAtendimento === 'remoto'
                  ? 'bg-[#a93105] text-white'
                  : 'bg-white text-[#111c2d]'
              "
              @click="selecionarModo('remoto')"
            >
              <span class="material-symbols-outlined text-[17px]">
                cell_tower
              </span>

              Atendimento Remoto
            </button>

            <button
              type="button"
              class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-[11px] font-semibold shadow-sm transition-colors"
              :class="
                modoAtendimento === 'domicilio'
                  ? 'bg-[#a93105] text-white'
                  : 'bg-white text-[#111c2d]'
              "
              @click="selecionarModo('domicilio')"
            >
              <span class="material-symbols-outlined text-[17px]">
                home_pin
              </span>

              Em Domicílio
            </button>
          </div>
        </section>

        <!-- DICA -->
        <section
          class="flex items-center gap-3 p-3.5 rounded-2xl bg-[#6ffbbe] text-[#002113] shadow-sm"
        >
          <div
            class="w-9 h-9 rounded-full bg-[#006947] text-white flex items-center justify-center shrink-0"
          >
            <span
              class="material-symbols-outlined text-xl"
              style="font-variation-settings: 'FILL' 1"
            >
              verified
            </span>
          </div>

          <div>
            <h3 class="text-[13px] font-bold">
              Dica da Comunidade do Bairro
            </h3>

            <p class="text-xs text-[#005236] leading-snug">
              Diagnóstico transparente e peças com garantia certificada de
              serviço.
            </p>
          </div>
        </section>

        <!-- PROFISSIONAIS -->
        <section class="flex flex-col gap-3">
          <article
            v-for="profissional in profissionaisExibidos"
            :key="profissional.nome"
            class="flex flex-col rounded-2xl bg-white p-3 shadow-sm gap-2"
          >
            <div class="flex gap-3 items-start">
              <div
                class="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#dee8ff]"
              >
                <img
                  :src="profissional.imagem"
                  :alt="profissional.nome"
                  class="w-full h-full object-cover"
                />

                <span
                  v-if="profissional.destaque"
                  class="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-[#263143]/80 text-white text-[9px]"
                >
                  {{ profissional.destaque }}
                </span>
              </div>

              <div class="flex flex-col min-w-0 flex-1">
                <div class="flex items-center justify-between gap-1">
                  <span
                    class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00855b] text-white text-[10px]"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full bg-white"
                    ></span>

                    {{ profissional.disponibilidade }}
                  </span>

                  <button
                    type="button"
                    aria-label="Salvar profissional"
                    class="transition-colors"
                    :class="
                      estaFavoritado(profissional.nome)
                        ? 'text-[#a93105]'
                        : 'text-[#8d7169] hover:text-[#a93105]'
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
                      bookmark_add
                    </span>
                  </button>
                </div>

                <h3 class="text-lg font-semibold truncate mt-1">
                  {{ profissional.nome }}
                </h3>

                <span class="text-xs text-[#59413a] truncate">
                  {{ profissional.profissao }}
                </span>

                <div class="flex flex-wrap items-center gap-2 mt-1 text-xs">
                  <div
                    class="flex items-center gap-0.5 text-[#855300]"
                  >
                    <span
                      class="material-symbols-outlined text-base"
                      style="font-variation-settings: 'FILL' 1"
                    >
                      star
                    </span>

                    <strong>{{ profissional.avaliacao }}</strong>

                    <span class="text-[#59413a]">
                      ({{ profissional.avaliacoes }})
                    </span>
                  </div>

                  <span class="text-[#e1bfb6]">•</span>

                  <span class="text-[#59413a] flex items-center">
                    <span class="material-symbols-outlined text-sm">
                      location_on
                    </span>

                    {{ profissional.bairro }} •
                    {{ profissional.distancia }} km
                  </span>
                </div>
              </div>
            </div>

            <!-- SERVIÇOS -->
            <div class="flex flex-wrap gap-1.5 pt-1">
              <span
                v-for="especialidade in profissional.especialidades"
                :key="especialidade"
                class="px-2.5 py-1 rounded-lg bg-[#e7eeff] text-[#111c2d] text-[11px]"
              >
                {{ especialidade }}
              </span>
            </div>

            <!-- AÇÕES -->
            <div class="flex items-center justify-between gap-2 pt-2">
              <div
                class="flex items-center gap-1 text-[#006947] text-xs"
              >
                <span class="material-symbols-outlined text-base">
                  {{ profissional.observacaoIcone }}
                </span>

                <span>{{ profissional.observacao }}</span>
              </div>

              <button
                type="button"
                class="px-4 py-2.5 rounded-xl text-[13px] font-semibold active:scale-95 transition-transform"
                :class="
                  profissional.botao === 'Ver Perfil'
                    ? 'bg-[#ffdbd1] text-[#3a0a00]'
                    : 'bg-[#a93105] text-white'
                "
                @click="solicitarServico(profissional)"
              >
                {{ profissional.botao }}
              </button>
            </div>
          </article>

          <div
            v-if="profissionaisExibidos.length === 0"
            class="bg-white rounded-2xl p-8 text-center shadow-sm"
          >
            <span
              class="material-symbols-outlined text-4xl text-[#a93105]"
            >
              devices_off
            </span>

            <h3 class="font-bold mt-2">
              Nenhum especialista encontrado
            </h3>

            <p class="text-sm text-[#59413a] mt-1">
              Tente alterar a busca, a categoria ou o atendimento.
            </p>
          </div>
        </section>

        <!-- CADASTRO DE PROFISSIONAL -->
        <section
          class="flex items-center justify-between gap-3 p-4 rounded-2xl bg-[#e7eeff] shadow-sm"
        >
          <div class="flex flex-col max-w-[70%]">
            <h3 class="text-lg font-bold">
              Você é técnico na região?
            </h3>

            <p class="text-xs text-[#59413a] mt-0.5">
              Cadastre seus serviços e receba chamados diretos de clientes
              vizinhos.
            </p>
          </div>

          <button
            type="button"
            class="px-3.5 py-2 rounded-xl bg-[#fea619] text-[#684000] text-[13px] font-semibold shadow-sm shrink-0"
            @click="cadastrarTecnico"
          >
            Cadastrar
          </button>
        </section>
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