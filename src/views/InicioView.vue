<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const busca = ref('')

const categorias = [
  {
    nome: 'Construção',
    icone: '🔨',
    fundo: 'bg-yellow-100'
  },
  {
    nome: 'Beleza',
    icone: '✂️',
    fundo: 'bg-pink-100'
  },
  {
    nome: 'Serv. Gerais',
    icone: '🔧',
    fundo: 'bg-sky-100'
  },
  {
    nome: 'Tecnologia',
    icone: '💻',
    fundo: 'bg-purple-100'
  }
]

const profissionais = [
  {
    nome: 'Carlos Eduardo Silveira',
    profissao: 'Eletricista & Manutenção',
    avaliacao: '4.9',
    avaliacoes: 84,
    bairro: 'Pinheiros, SP',
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDY80d73K5Q80t5eha8-jPIaDF-SkOmXG74fImcNA5C1WWxe64A604TDm-rl4-OgTFwJBxy5r0U-yFtTx4gOdUFnYSt0tnVoPpWMZ57vM5bPrlW8Yo4mgtfqr1DdSmaztppHWXjuL3L19GBdMTSg0PXobKW17fJMvlRq5ev34ryJfH_reYwbWO8vvHwAXDjteL7-nFQXgur70JSFACKcuBgOOoOryBrROKcezd7rgygSdfmJ38KQgnr'
  },
  {
    nome: 'Marcos Vinícius',
    profissao: 'Pintor & Reformas',
    avaliacao: '5.0',
    avaliacoes: 112,
    bairro: 'Vila Mariana, SP',
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-jHLicIBiZdlfiTyLLm9xyoGTFUK5ynXCBcAqmuLKeDa2lLowl_Ci8m-W7Kez4Zxtg-rDMr77SHxhwY34NuPT-GFX3H8xL6POPj0MVog6bNwdT6YM7m91_Cae7Fp1xRk5wh_bEVLNNB3pNN0-qmg-Lj3H62l9g6QKReGthsKnvLkpJoXSdUdp5Sz72sgrsPtTTF9rTf32FxvLMPM1pc3OFoeRdWuC0k7Tq6iXDC4x29dFda81Bmch'
  }
]

function buscar() {
  const termo = busca.value.trim()

  if (!termo) {
    return
  }

  console.log('Buscando:', termo)
}

function abrirCategoria(nome) {
  const rotas = {
    Construção: '/construcao',
    Beleza: '/beleza',
    'Serv. Gerais': '/servicos-gerais',
    Tecnologia: '/tecnologia'
  }

  const rota = rotas[nome]

  if (rota) {
    router.push(rota)
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 flex justify-center">
    <div
      class="w-full max-w-[420px] bg-white min-h-screen relative flex flex-col overflow-x-hidden pb-24"
    >
      <!-- CABEÇALHO -->
      <header
        class="sticky top-0 z-40 bg-white px-5 py-3.5 flex items-center justify-between border-b border-gray-100"
      >
        <div class="flex items-center space-x-2">
          <div
            class="w-10 h-10 rounded-full border-2 border-slate-800 flex items-center justify-center"
          >
            🏙️
          </div>
        </div>

        <div class="flex items-center space-x-4 text-slate-700">
          <button
            type="button"
            class="p-1"
            aria-label="Pesquisar"
          >
            🔍
          </button>

          <button
            type="button"
            class="p-1"
            aria-label="Abrir menu"
          >
            ☰
          </button>
        </div>
      </header>

      <!-- APRESENTAÇÃO -->
      <section class="bg-[#D94E1E] text-white px-5 pt-5 pb-8">
        <div
          class="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-medium mb-4"
        >
          <span class="w-2 h-2 rounded-full bg-amber-400"></span>
          Belem, PA
        </div>

        <h1 class="text-[26px] leading-[1.2] font-extrabold mb-3">
          Encontre e valorize pequenos trabalhadores da sua região
        </h1>

        <p class="text-[13px] leading-relaxed text-white/90 mb-5">
          Conectamos você aos melhores profissionais locais com avaliações
          reais de vizinhos.
        </p>

        <!-- BUSCA -->
        <div class="flex items-center gap-2.5">
          <div class="relative flex-1">
            <input
              v-model="busca"
              type="text"
              class="w-full bg-white text-slate-800 placeholder-slate-400 text-xs pl-3 pr-3 py-2.5 rounded-xl border-0 outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="O que você precisa?"
              @keyup.enter="buscar"
            />
          </div>

          <button
            type="button"
            class="bg-[#F6A000] text-slate-900 font-bold text-xs px-3.5 py-2.5 rounded-xl hover:bg-amber-400 transition-colors"
            @click="buscar"
          >
            📍 Mais perto
          </button>
        </div>
      </section>

      <!-- ESTATÍSTICAS -->
      <section class="bg-white border-b border-slate-100 py-4 px-3">
        <div class="grid grid-cols-3 text-center">
          <div>
            <span class="text-[20px] font-bold text-[#D94E1E]">
              2.400+
            </span>

            <span class="block text-[9px] font-semibold text-slate-400">
              PROFISSIONAIS
            </span>
          </div>

          <div>
            <span class="text-[20px] font-bold text-[#D94E1E]">
              18k+
            </span>

            <span class="block text-[9px] font-semibold text-slate-400">
              AVALIAÇÕES
            </span>
          </div>

          <div>
            <span class="text-[20px] font-bold text-[#D94E1E]">
              47
            </span>

            <span class="block text-[9px] font-semibold text-slate-400">
              BAIRROS
            </span>
          </div>
        </div>
      </section>

      <!-- CATEGORIAS -->
      <section class="pt-5 pb-3 px-4">
        <div class="flex items-center justify-between mb-3.5">
          <h2 class="text-base font-bold text-slate-800">
            Categorias
          </h2>

          <button
            type="button"
            class="text-xs font-semibold text-[#D94E1E]"
          >
            Ver todas
          </button>
        </div>

        <div class="flex gap-3 overflow-x-auto pb-1">
          <button
            v-for="categoria in categorias"
            :key="categoria.nome"
            type="button"
            class="shrink-0 w-[84px] h-[92px] rounded-2xl border border-slate-200 bg-white flex flex-col items-center justify-center p-2 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all"
            @click="abrirCategoria(categoria.nome)"
          >
            <div
              :class="categoria.fundo"
              class="w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 text-base"
            >
              {{ categoria.icone }}
            </div>

            <span class="text-[11px] font-bold text-slate-800 text-center">
              {{ categoria.nome }}
            </span>
          </button>
        </div>
      </section>

      <!-- PROFISSIONAIS EM DESTAQUE -->
      <section class="pt-2 pb-6 px-4">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-base font-bold text-slate-800">
            Destaques
          </h2>

          <button
            type="button"
            class="text-xs font-semibold text-[#D94E1E]"
          >
            Ver todos
          </button>
        </div>

        <div class="flex gap-3 overflow-x-auto">
          <article
            v-for="profissional in profissionais"
            :key="profissional.nome"
            class="shrink-0 w-[240px] rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-sm"
          >
            <div class="relative h-28 w-full bg-slate-200">
              <img
                :src="profissional.imagem"
                :alt="profissional.nome"
                class="w-full h-full object-cover"
              />

              <div
                class="absolute top-2.5 right-2.5 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
              >
                ● Disponível
              </div>
            </div>

            <div class="p-3">
              <h3 class="font-bold text-sm text-slate-800 truncate">
                {{ profissional.nome }}
              </h3>

              <p class="text-xs text-slate-500 mb-2">
                {{ profissional.profissao }}
              </p>

              <div
                class="flex items-center justify-between text-xs pt-1 border-t border-slate-50"
              >
                <div class="text-amber-500 font-semibold">
                  ★

                  <span class="text-slate-800">
                    {{ profissional.avaliacao }}
                  </span>

                  <span class="text-slate-400 font-normal">
                    ({{ profissional.avaliacoes }})
                  </span>
                </div>

                <span class="text-slate-400 text-[11px]">
                  {{ profissional.bairro }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- MENU INFERIOR -->
      <nav
        class="fixed bottom-0 max-w-[420px] w-full bg-white border-t border-slate-200 py-2.5 px-8 flex justify-around items-center z-50 shadow-lg"
      >
        <button
          type="button"
          class="flex flex-col items-center text-[#D94E1E]"
          @click="router.push('/')"
        >
          <span>⌂</span>

          <span class="text-[11px] font-semibold">
            Início
          </span>
        </button>

        <button
          type="button"
          class="flex flex-col items-center text-slate-400"
        >
          <span>🔍</span>

          <span class="text-[11px]">
            Buscar
          </span>
        </button>
      </nav>
    </div>
  </div>
</template>