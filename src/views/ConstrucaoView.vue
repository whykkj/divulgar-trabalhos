<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const busca = ref('')
const subcategoriaAtiva = ref('Todas')
const ordenacao = ref('distancia')

const subcategorias = [
  { nome: 'Todas', icone: 'done' },
  { nome: 'Pedreiros', icone: 'foundation' },
  { nome: 'Pintores', icone: 'format_paint' },
  { nome: 'Eletricistas', icone: 'bolt' },
  { nome: 'Encanadores', icone: 'plumbing' },
  { nome: 'Gesseiros', icone: 'home_repair_service' },
  { nome: 'Serralheiros', icone: 'hardware' }
]

const profissionais = ref([
  {
    nome: 'Seu Carlos Alvenaria & Reformas',
    profissao: 'Pedreiro & Mestre de Obras',
    categoria: 'Pedreiros',
    avaliacao: 4.9,
    avaliacoes: 128,
    bairro: 'Jardim Paulista',
    distancia: 1.2,
    disponibilidade: 'Disponível',
    precoTitulo: 'Preço base',
    preco: 'A partir de R$ 150/dia',
    especialidades: ['Alvenaria', 'Revestimento', 'Pisos'],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBRIjhovBHzmz3F4SwX52fNOXXmFkbaWKbLIb6cAl7tGG_pIBgWzbWRxxom-AdZQmS5CfcDhf_78bil33TERy3HR9g3zpHp3ZD1Ajcw0mDIIdq1DmXxp-HQgUUKJd0srSp4YS7TbTyWPkh3efkSIjrN1gzsSGyGTuHgzXaiz8vu89x6RQFjG1Yr1QrXoowspMtpf_rieeWyKK3nJBh00OokjHIVjV1wCYifkMo-yGQ8Ow-ZVfCpLVWb'
  },
  {
    nome: 'Marcos Vinícius Pinturas',
    profissao: 'Pintor Residencial & Comercial',
    categoria: 'Pintores',
    avaliacao: 4.8,
    avaliacoes: 94,
    bairro: 'Pinheiros',
    distancia: 2.4,
    disponibilidade: 'Disponível hoje',
    precoTitulo: 'Preço estimado',
    preco: 'Sob avaliação',
    especialidades: ['Pintura Lisa', 'Texturas', 'Fachadas'],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAv73x-Bpx2hZGI3E6hH1FFA-PjD8gI1zyDlv_1Irrph3LUqDkgMY60zxSW4q3vvD0qbYvE8o6sEUxrX8oLyAWjDgzwpNAgU396DONxzZSZRmk51E7GjkZZmBDVdj70R4OkTR3TZThCXCTgwdDZ4uEQTq_u9KaBJamgBMQxPdbNHSjj1g40ZFD1uzci4sYiATTbT1J4QV3v0lDLCvSYPN-cVeDYz0xrMbNSaA-JRzD-v_HYwJYJNLZy'
  },
  {
    nome: 'Roberto Elétrica Segura',
    profissao: 'Eletricista Instalador',
    categoria: 'Eletricistas',
    avaliacao: 5,
    avaliacoes: 215,
    bairro: 'Vila Mariana',
    distancia: 3.1,
    disponibilidade: 'Responde rápido',
    precoTitulo: 'Visita técnica',
    preco: 'R$ 80/avaliação',
    especialidades: [
      'Instalação Padrão',
      'Troca de Disjuntores',
      '110v/220v'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSzWtiCIvTqt9AoLza84Jrj1Trgje8hNc6fO7XeMGz_iz6VMq4ee-wL_EgD4thEBbzS2jJcWx0uPwN-zp8JBukyRRR7woUq-ViNudv8oyp1msMVb4XNhv2loWrCEU-MoWg5j2pyJRaRLJH1j67ggdAe8ooZ-zZs8qEoEJoB1nDaI5UoqU2aknIKIu_08SjFhzDiUIllmcT2O1fvcUeaYtUJQsm37q7v6sUrUE2mO3K9afr6eEUGuiU'
  },
  {
    nome: 'Drywall & Gesso Irmãos Silva',
    profissao: 'Gesseiro Especialista',
    categoria: 'Gesseiros',
    avaliacao: 4.7,
    avaliacoes: 62,
    bairro: 'Tatuapé',
    distancia: 4.5,
    disponibilidade: 'Agenda para esta semana',
    precoTitulo: 'Orçamento',
    preco: 'Sem compromisso',
    especialidades: ['Sanca de Gesso', 'Drywall', 'Molduras'],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBlzegiaydJNJNmLs25qoxnxzUJGo_UJoBHi4-wsKz5Uf2CpmzyMaubRbS-TAh7CHmVLWsqMpSu2I2eGvMcCV6JuyZbZSLGDv8AfWZXO0oXN2b529Wm2DldaswrejrumbHcqd77UgXokDd_fHjwv9F2e69OYdPQ6JRLM2Gq0OGWHLtWrXicVDvlUdfzU2bw6aUWNIo1j-3Ran6TfT3O6YbOcDJoEQ8lMJZqgvsTo-t9CpRVSgJINLyu'
  }
])

const profissionaisExibidos = computed(() => {
  let resultado = [...profissionais.value]

  if (subcategoriaAtiva.value !== 'Todas') {
    resultado = resultado.filter(
      profissional =>
        profissional.categoria === subcategoriaAtiva.value
    )
  }

  if (busca.value.trim()) {
    const termo = busca.value.toLowerCase()

    resultado = resultado.filter(profissional =>
      `${profissional.nome} ${profissional.profissao} ${profissional.especialidades.join(' ')}`
        .toLowerCase()
        .includes(termo)
    )
  }

  if (ordenacao.value === 'avaliacao') {
    resultado.sort((a, b) => b.avaliacao - a.avaliacao)
  } else {
    resultado.sort((a, b) => a.distancia - b.distancia)
  }

  return resultado
})

function voltar() {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-[#f9f9ff] text-[#111c2d]">
    <header
      class="fixed top-0 left-0 w-full z-50 bg-[#f9f9ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
    >
      <div class="h-16 px-4 flex items-center justify-between">
        <div class="flex items-center gap-1">
          <button
            type="button"
            aria-label="Voltar"
            class="w-11 h-11 flex items-center justify-center rounded-full text-[#59413a] hover:text-[#a93105]"
            @click="voltar"
          >
            <span class="material-symbols-outlined">arrow_back</span>
          </button>

          <h1 class="text-lg font-semibold">Categorias</h1>
        </div>

        <div class="flex items-center gap-1">
          <button class="w-11 h-11 flex items-center justify-center">
            <span class="material-symbols-outlined text-[#59413a]">
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

    <main class="pt-20 pb-24 px-4">
      <div class="flex flex-col gap-4 max-w-[700px] mx-auto">
        <section
          class="bg-white p-4 rounded-xl shadow-sm flex flex-col gap-3"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div
                class="w-12 h-12 rounded-xl bg-[#a93105]/10 flex items-center justify-center text-[#a93105]"
              >
                <span class="material-symbols-outlined text-[28px]">
                  construction
                </span>
              </div>

              <div>
                <div class="flex items-center gap-1.5">
                  <h2 class="text-lg font-bold">Construção</h2>

                  <span
                    class="material-symbols-outlined text-[#a93105] text-lg"
                  >
                    verified
                  </span>
                </div>

                <p class="text-xs text-[#59413a]">
                  Reformas, reparos e mão de obra qualificada
                </p>
              </div>
            </div>

            <button
              class="w-10 h-10 rounded-xl bg-[#e7eeff] flex items-center justify-center text-[#59413a]"
            >
              <span class="material-symbols-outlined text-xl">tune</span>
            </button>
          </div>

          <div class="relative">
            <span
              class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8d7169] text-xl"
            >
              search
            </span>

            <input
              v-model="busca"
              type="text"
              class="w-full h-11 pl-10 pr-10 rounded-xl bg-[#f0f3ff] text-sm outline-none focus:ring-2 focus:ring-[#a93105]/20"
              placeholder="Buscar por serviço ou profissional..."
            />

            <span
              class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#8d7169]"
            >
              mic
            </span>
          </div>
        </section>

        <section class="flex gap-1 overflow-x-auto py-1">
          <button
            v-for="subcategoria in subcategorias"
            :key="subcategoria.nome"
            type="button"
            class="shrink-0 px-3 py-2 rounded-full text-[13px] font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
            :class="
              subcategoriaAtiva === subcategoria.nome
                ? 'bg-[#a93105] text-white'
                : 'bg-white text-[#59413a]'
            "
            @click="subcategoriaAtiva = subcategoria.nome"
          >
            <span class="material-symbols-outlined text-base">
              {{ subcategoria.icone }}
            </span>

            {{ subcategoria.nome }}
          </button>
        </section>

        <section class="flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-1.5 text-sm">
            <span class="material-symbols-outlined text-[#a93105] text-lg">
              location_on
            </span>

            <strong>{{ profissionaisExibidos.length }} profissionais</strong>

            <span class="text-[#59413a]">em São Paulo, SP</span>
          </div>

          <div class="flex bg-[#f0f3ff] p-1 rounded-lg">
            <button
              class="px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1"
              :class="
                ordenacao === 'distancia'
                  ? 'bg-white text-[#a93105] shadow-sm'
                  : 'text-[#59413a]'
              "
              @click="ordenacao = 'distancia'"
            >
              <span class="material-symbols-outlined text-sm">near_me</span>
              Mais perto
            </button>

            <button
              class="px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1"
              :class="
                ordenacao === 'avaliacao'
                  ? 'bg-white text-[#a93105] shadow-sm'
                  : 'text-[#59413a]'
              "
              @click="ordenacao = 'avaliacao'"
            >
              <span class="material-symbols-outlined text-sm">star</span>
              Melhores
            </button>
          </div>
        </section>

        <div class="flex flex-col gap-3">
          <article
            v-for="profissional in profissionaisExibidos"
            :key="profissional.nome"
            class="bg-white rounded-xl p-4 shadow-sm overflow-hidden"
          >
            <div class="flex gap-3 items-start">
              <img
                :src="profissional.imagem"
                :alt="profissional.nome"
                class="w-16 h-16 rounded-xl object-cover shrink-0"
              />

              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-1">
                  <span
                    class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00855b]/15 text-[#006947] text-[11px] font-semibold"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-[#006947]"></span>
                    {{ profissional.disponibilidade }}
                  </span>

                  <span class="text-xs flex items-center">
                    <span
                      class="material-symbols-outlined text-[#fea619] text-base"
                    >
                      star
                    </span>

                    <strong>{{ profissional.avaliacao }}</strong>

                    <span class="text-[#8d7169] ml-1">
                      ({{ profissional.avaliacoes }})
                    </span>
                  </span>
                </div>

                <h3 class="text-[15px] font-bold truncate mt-1">
                  {{ profissional.nome }}
                </h3>

                <p class="text-xs text-[#59413a]">
                  {{ profissional.profissao }}
                </p>

                <p class="text-[11px] text-[#8d7169] flex items-center gap-1 mt-1">
                  <span class="material-symbols-outlined text-sm">
                    pin_drop
                  </span>

                  {{ profissional.bairro }} •
                  {{ profissional.distancia }} km de você
                </p>
              </div>
            </div>

            <div class="flex flex-wrap gap-1.5 mt-3">
              <span
                v-for="especialidade in profissional.especialidades"
                :key="especialidade"
                class="px-2.5 py-1 rounded-md bg-[#e7eeff] text-[11px] text-[#59413a] font-medium"
              >
                {{ especialidade }}
              </span>
            </div>

            <div
              class="flex items-center justify-between gap-3 bg-[#f0f3ff]/60 -mx-4 -mb-4 px-4 py-2 mt-3"
            >
              <div>
                <span class="text-[11px] text-[#8d7169] block">
                  {{ profissional.precoTitulo }}
                </span>

                <span class="text-base font-bold text-[#a93105]">
                  {{ profissional.preco }}
                </span>
              </div>

              <div class="flex items-center gap-2">
                <button
                  class="w-10 h-10 rounded-xl bg-[#006947]/10 text-[#006947] flex items-center justify-center"
                >
                  <span class="material-symbols-outlined">chat</span>
                </button>

                <button
                  class="h-10 px-3 rounded-xl bg-[#a93105] text-white text-[13px] font-semibold flex items-center gap-1.5"
                >
                  Solicitar

                  <span class="material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </article>

          <p
            v-if="profissionaisExibidos.length === 0"
            class="bg-white rounded-xl p-8 text-center text-[#59413a]"
          >
            Nenhum profissional encontrado.
          </p>
        </div>

        <section
          class="bg-[#ffdbd1]/50 rounded-xl p-4 flex items-start gap-3 shadow-sm"
        >
          <div
            class="w-10 h-10 rounded-full bg-[#a93105] shrink-0 flex items-center justify-center text-white"
          >
            <span class="material-symbols-outlined">shield_with_heart</span>
          </div>

          <div>
            <h4 class="text-[15px] font-bold">
              Garantia Comunitária Segura
            </h4>

            <p class="text-xs text-[#862300] leading-relaxed">
              Todos os profissionais são avaliados por vizinhos reais.
              Seus pagamentos e orçamentos contam com suporte local.
            </p>
          </div>
        </section>
      </div>
    </main>

    <nav
      class="fixed bottom-0 left-0 w-full z-50 bg-[#f9f9ff]/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)]"
    >
      <div class="flex justify-around items-center h-16 px-1">
        <button
          class="flex flex-col items-center text-[#59413a]"
          @click="voltar"
        >
          <span class="material-symbols-outlined">home</span>
          <span class="text-[11px]">Início</span>
        </button>

        <button class="flex flex-col items-center text-[#a93105] font-bold">
          <span class="material-symbols-outlined">grid_view</span>
          <span class="text-[11px]">Categorias</span>
        </button>

        <button class="flex flex-col items-center text-[#59413a]">
          <span class="material-symbols-outlined">search</span>
          <span class="text-[11px]">Buscar</span>
        </button>

        <button class="flex flex-col items-center text-[#59413a]">
          <span class="material-symbols-outlined">chat</span>
          <span class="text-[11px]">Mensagens</span>
        </button>

        <button class="flex flex-col items-center text-[#59413a]">
          <span class="material-symbols-outlined">person</span>
          <span class="text-[11px]">Perfil</span>
        </button>
      </div>
    </nav>
  </div>
</template>