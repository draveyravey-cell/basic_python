import { useState } from "react";
import {
  BookOpen,
  Code2,
  History,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Terminal,
  Sparkles,
  Globe,
  Users,
  Layers,
  Type,
  Library,
  Cpu,
  Play,
  Copy,
  Check,
  ArrowDown,
  Zap,
} from "lucide-react";

/* ───────────── code block component ───────────── */
function CodeBlock({ code, output }: { code: string; output?: string }) {
  const [copied, setCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-2xl overflow-hidden border border-slate-700 bg-[#1e1e2e] shadow-lg">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#181825] border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-slate-400 ml-2 font-mono">python</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors active:scale-95"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>

      {/* code */}
      <pre className="px-4 py-4 text-sm leading-relaxed overflow-x-auto">
        <code className="text-green-300 font-mono whitespace-pre">{code}</code>
      </pre>

      {/* run button */}
      {output && (
        <div className="border-t border-slate-700">
          <button
            onClick={() => setShowOutput(!showOutput)}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-emerald-400 hover:bg-[#181825] transition-colors"
          >
            <Play className="w-4 h-4" />
            {showOutput ? "Esconder resultado" : "Ver resultado"}
          </button>
          {showOutput && (
            <div className="px-4 py-3 bg-[#11111b] border-t border-slate-700">
              <div className="flex items-center gap-2 mb-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-xs text-slate-500 font-mono">output</span>
              </div>
              <pre className="text-sm text-slate-200 font-mono">{output}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ───────────── accordion component ───────────── */
function Accordion({
  title,
  icon,
  children,
  defaultOpen = false,
  color = "blue",
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  color?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const colorMap: Record<string, string> = {
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    green: "from-emerald-500 to-emerald-600",
    orange: "from-orange-500 to-orange-600",
    pink: "from-pink-500 to-pink-600",
    cyan: "from-cyan-500 to-cyan-600",
    yellow: "from-yellow-500 to-amber-600",
    red: "from-red-500 to-red-600",
  };

  return (
    <div className="mb-3 rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 w-full px-4 py-4 text-left active:bg-slate-50 transition-colors"
      >
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${colorMap[color] || colorMap.blue} text-white shadow-md flex-shrink-0`}
        >
          {icon}
        </div>
        <span className="flex-1 font-semibold text-slate-800 text-[15px] leading-tight">{title}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        )}
      </button>
      {open && <div className="px-4 pb-5 pt-1 text-slate-600 text-[15px] leading-relaxed">{children}</div>}
    </div>
  );
}

/* ───────────── spacer ───────────── */

/* ───────────── tip component ───────────── */
function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 my-4 rounded-2xl bg-amber-50 border border-amber-200">
      <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-amber-800 leading-relaxed">{children}</p>
    </div>
  );
}

/* ───────────── progress bar ───────────── */
function ProgressBar({ sections, current }: { sections: string[]; current: number }) {
  return (
    <div className="flex gap-1.5 px-5 py-3">
      {sections.map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
            i <= current ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "bg-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

/* ═══════════════ MAIN APP ═══════════════ */
export function App() {
  const [activeSection, setActiveSection] = useState(0);

  const sections = ["Início", "História", "Conceitos", "Prática"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 px-5 py-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-200">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-800 leading-tight">Python para Iniciantes</h1>
              <p className="text-xs text-slate-400">Sua primeira aula 🐍</p>
            </div>
          </div>
          <ProgressBar sections={sections} current={activeSection} />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pb-20">
        {/* ─── HERO ─── */}
        <section className="pt-8 pb-6 text-center">
          <div className="relative inline-block mb-5">
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-300/40 mx-auto">
              <span className="text-6xl">🐍</span>
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
            Bem-vindo ao mundo
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              do Python!
            </span>
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
            Aprenda os fundamentos da linguagem de programação mais popular do mundo, do zero.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-blue-500 animate-bounce">
            <ArrowDown className="w-4 h-4" />
            <span>Role para começar</span>
          </div>
        </section>

        {/* ─── QUICK STATS ─── */}
        <section className="grid grid-cols-3 gap-3 mb-8">
          <div className="text-center p-3 rounded-2xl bg-white shadow-sm border border-slate-100">
            <p className="text-2xl font-bold text-blue-600">1991</p>
            <p className="text-xs text-slate-400 mt-0.5">Ano de criação</p>
          </div>
          <div className="text-center p-3 rounded-2xl bg-white shadow-sm border border-slate-100">
            <p className="text-2xl font-bold text-emerald-600">#1</p>
            <p className="text-xs text-slate-400 mt-0.5">Mais popular</p>
          </div>
          <div className="text-center p-3 rounded-2xl bg-white shadow-sm border border-slate-100">
            <p className="text-2xl font-bold text-purple-600">∞</p>
            <p className="text-xs text-slate-400 mt-0.5">Possibilidades</p>
          </div>
        </section>

        {/* ─── SECTION: HISTÓRIA ─── */}
        <SectionHeader
          icon={<History className="w-5 h-5" />}
          title="A História do Python"
          subtitle="De onde veio essa cobra?"
          gradient="from-amber-500 to-orange-600"
          onView={() => setActiveSection(1)}
        />

        <div className="mb-8">
          <div className="p-5 rounded-2xl bg-white shadow-sm border border-slate-100 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">👨‍💻</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Guido van Rossum</h4>
                <p className="text-xs text-slate-400">Criador do Python</p>
              </div>
            </div>
            <p className="text-[15px] text-slate-600 leading-relaxed mb-3">
              Python foi criado por <strong>Guido van Rossum</strong> no final dos anos 80 no{" "}
              <em>Centrum Wiskunde & Informatica</em> (CWI) na Holanda. Foi lançado pela primeira vez em{" "}
              <strong>1991</strong>.
            </p>
            <p className="text-[15px] text-slate-600 leading-relaxed">
              A linguagem foi concebida para ser de <strong>propósito geral</strong>, com foco na{" "}
              <strong>legibilidade do código</strong> e na <strong>simplicidade</strong>.
            </p>
          </div>

          <Tip>
            O nome "Python" não vem da cobra! Foi inspirado no grupo de comédia britânico{" "}
            <strong>Monty Python</strong>, do qual Guido é um grande fã. 🎭
          </Tip>

          <div className="p-5 rounded-2xl bg-white shadow-sm border border-slate-100">
            <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Por que Python se tornou tão popular?
            </h4>
            <p className="text-[15px] text-slate-600 leading-relaxed">
              Desde o seu início, Python cresceu exponencialmente, tornando-se uma das linguagens mais populares do
              mundo. Hoje é amplamente utilizada em:
            </p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {[
                { emoji: "🌐", label: "Desenvolvimento Web" },
                { emoji: "📊", label: "Análise de Dados" },
                { emoji: "🤖", label: "Inteligência Artificial" },
                { emoji: "⚙️", label: "Automação" },
                { emoji: "🔬", label: "Ciência" },
                { emoji: "🎮", label: "Games" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 text-sm text-slate-700"
                >
                  <span>{item.emoji}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── SECTION: CONCEITOS ─── */}
        <SectionHeader
          icon={<BookOpen className="w-5 h-5" />}
          title="Conceitos Chave"
          subtitle="O que torna Python especial"
          gradient="from-blue-500 to-indigo-600"
          onView={() => setActiveSection(2)}
        />

        <div className="mb-8 space-y-0">
          <Accordion
            title="Zen do Python – Simplicidade e Legibilidade"
            icon={<Sparkles className="w-5 h-5" />}
            color="purple"
            defaultOpen
          >
            <p className="mb-3">
              Python é conhecido por sua sintaxe <strong>clara e concisa</strong>, que enfatiza a legibilidade do
              código.
            </p>
            <p className="mb-3">
              O <em>"Zen do Python"</em> encapsula os princípios de design da linguagem. Você pode vê-lo digitando:
            </p>
            <CodeBlock code="import this" />
            <div className="mt-3 p-3 rounded-xl bg-purple-50 border border-purple-100">
              <p className="text-sm text-purple-800 italic">
                "Bonito é melhor que feio."
                <br />
                "Simples é melhor que complexo."
                <br />
                "Legibilidade conta."
              </p>
            </div>
          </Accordion>

          <Accordion
            title="Linguagem Interpretada"
            icon={<Terminal className="w-5 h-5" />}
            color="green"
          >
            <p className="mb-3">
              Python é uma linguagem <strong>interpretada</strong>, o que significa que o código é executado{" "}
              <strong>linha por linha</strong> por um interpretador em tempo de execução.
            </p>
            <p>
              Diferente de linguagens compiladas (como C), você <strong>não precisa compilar</strong> seu código antes
              de executá-lo. Isso torna o desenvolvimento e a depuração muito mais rápidos!
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1 text-center p-3 rounded-xl bg-red-50 border border-red-100">
                <p className="text-xs text-red-400 mb-1">Compilada (C)</p>
                <p className="text-xs text-red-700">Código → Compilar → Executar</p>
              </div>
              <div className="flex-1 text-center p-3 rounded-xl bg-green-50 border border-green-100">
                <p className="text-xs text-green-400 mb-1">Interpretada (Python)</p>
                <p className="text-xs text-green-700">Código → Executar ✨</p>
              </div>
            </div>
          </Accordion>

          <Accordion
            title="Linguagem de Alto Nível"
            icon={<Layers className="w-5 h-5" />}
            color="blue"
          >
            <p className="mb-3">
              Python <strong>abstrai</strong> muitos detalhes de baixo nível do hardware, permitindo que você se
              concentre na <strong>lógica do programa</strong>.
            </p>
            <p>
              Isso a torna muito mais fácil de aprender e usar em comparação com linguagens de baixo nível como C ou
              Assembly.
            </p>
            <Tip>
              Em Python, uma tarefa que levaria 50 linhas em C pode ser feita em apenas 5 linhas! 🚀
            </Tip>
          </Accordion>

          <Accordion
            title="Tipagem Dinâmica e Forte"
            icon={<Type className="w-5 h-5" />}
            color="orange"
          >
            <div className="mb-4">
              <h5 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs flex items-center justify-center font-bold">
                  D
                </span>
                Tipagem Dinâmica
              </h5>
              <p className="text-sm mb-2">
                O tipo de uma variável é determinado <strong>em tempo de execução</strong>. Você não precisa declarar
                o tipo!
              </p>
              <CodeBlock
                code={`# Não precisa declarar tipo!\nnome = "Maria"    # string\nidade = 25        # inteiro\naltura = 1.65     # float`}
              />
            </div>
            <div>
              <h5 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs flex items-center justify-center font-bold">
                  F
                </span>
                Tipagem Forte
              </h5>
              <p className="text-sm mb-2">
                Python <strong>não permite</strong> operações sem sentido entre tipos diferentes sem conversão
                explícita.
              </p>
              <CodeBlock
                code={`# Isso dá ERRO! ❌\nresultado = "10" + 5\n\n# Precisa converter! ✅\nresultado = int("10") + 5`}
                output="15"
              />
            </div>
          </Accordion>

          <Accordion
            title="Paradigma Múltiplo"
            icon={<Cpu className="w-5 h-5" />}
            color="pink"
          >
            <p className="mb-3">Python suporta múltiplos paradigmas de programação:</p>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-pink-50 border border-pink-100">
                <h5 className="font-semibold text-pink-800 text-sm mb-1">🏗️ Orientada a Objetos (POO)</h5>
                <p className="text-xs text-pink-700">Classes, objetos, herança e polimorfismo.</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                <h5 className="font-semibold text-blue-800 text-sm mb-1">📝 Imperativa</h5>
                <p className="text-xs text-blue-700">Sequências de comandos que mudam o estado do programa.</p>
              </div>
              <div className="p-3 rounded-xl bg-green-50 border border-green-100">
                <h5 className="font-semibold text-green-800 text-sm mb-1">🔄 Funcional</h5>
                <p className="text-xs text-green-700">Funções de primeira classe e funções puras.</p>
              </div>
            </div>
          </Accordion>

          <Accordion
            title="Extensa Biblioteca Padrão"
            icon={<Library className="w-5 h-5" />}
            color="cyan"
          >
            <p className="mb-3">
              Python vem com uma <strong>vasta biblioteca padrão</strong> que oferece módulos para uma ampla gama de
              tarefas: rede, manipulação de dados, expressões regulares e muito mais.
            </p>
            <p>
              Isso significa que você <strong>não precisa reinventar a roda</strong> para funcionalidades comuns!
            </p>
            <Tip>
              Python é frequentemente descrito como vindo com "baterias incluídas" 🔋 por causa de sua extensa
              biblioteca padrão.
            </Tip>
          </Accordion>

          <Accordion
            title="Multiplataforma"
            icon={<Globe className="w-5 h-5" />}
            color="green"
          >
            <p>
              Python é <strong>multiplataforma</strong>: o mesmo código roda em Windows, macOS e Linux com pouca ou
              nenhuma modificação, graças ao seu interpretador.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              {["🪟 Windows", "🍎 macOS", "🐧 Linux"].map((os) => (
                <div key={os} className="px-4 py-2 rounded-xl bg-green-50 border border-green-100 text-sm text-green-700">
                  {os}
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion
            title="Comunidade Ativa e Ecossistema Rico"
            icon={<Users className="w-5 h-5" />}
            color="red"
          >
            <p className="mb-3">
              Python possui uma das <strong>maiores e mais ativas</strong> comunidades de desenvolvedores do mundo.
            </p>
            <p>Isso resulta em uma vasta quantidade de:</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Tutoriais e recursos gratuitos
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Frameworks: Django, Flask, FastAPI
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Bibliotecas: NumPy, Pandas, TensorFlow
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Fóruns de ajuda e suporte
              </li>
            </ul>
          </Accordion>
        </div>

        {/* ─── SECTION: CASE SENSITIVE ─── */}
        <SectionHeader
          icon={<Type className="w-5 h-5" />}
          title="Hora de Praticar!"
          subtitle="Conceitos fundamentais + código"
          gradient="from-emerald-500 to-green-600"
          onView={() => setActiveSection(3)}
        />

        {/* Case Sensitive */}
        <div className="p-5 rounded-2xl bg-white shadow-sm border border-slate-100 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white shadow-md">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Case-Sensitive</h4>
              <p className="text-xs text-slate-400">Maiúsculas ≠ Minúsculas</p>
            </div>
          </div>

          <p className="text-[15px] text-slate-600 leading-relaxed mb-3">
            Python <strong>diferencia</strong> letras maiúsculas de minúsculas. Isso significa que{" "}
            <code className="px-1.5 py-0.5 rounded-md bg-slate-100 text-sm font-mono text-blue-600">print</code>,{" "}
            <code className="px-1.5 py-0.5 rounded-md bg-slate-100 text-sm font-mono text-blue-600">Print</code> e{" "}
            <code className="px-1.5 py-0.5 rounded-md bg-slate-100 text-sm font-mono text-blue-600">PRINT</code> são
            coisas completamente diferentes!
          </p>

          <CodeBlock
            code={`print("Olá!")  # ✅ Funciona!\nPrint("Olá!")  # ❌ Erro!\nPRINT("Olá!")  # ❌ Erro!`}
            output={'Olá!\n\nNameError: name \'Print\' is not defined'}
          />

          <Tip>
            Sempre preste atenção nas maiúsculas e minúsculas! No Python, quase todos os comandos são escritos em{" "}
            <strong>letras minúsculas</strong>.
          </Tip>
        </div>

        {/* Hello World */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white shadow-xl mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <span className="text-2xl">🎉</span>
            </div>
            <div>
              <h4 className="font-bold text-white">Seu Primeiro Programa!</h4>
              <p className="text-xs text-blue-100">O famoso "Hello, World!"</p>
            </div>
          </div>

          <p className="text-[15px] text-blue-100 leading-relaxed mb-3">
            Todo programador começa aqui. O comando <strong className="text-white">print()</strong> exibe uma mensagem
            na tela. Vamos fazer o clássico:
          </p>

          <div className="rounded-2xl overflow-hidden border border-white/20 bg-[#1e1e2e] shadow-lg">
            <div className="flex items-center gap-1.5 px-4 py-2 bg-[#181825]">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-xs text-slate-400 ml-2 font-mono">meu_primeiro_programa.py</span>
            </div>
            <pre className="px-4 py-4 text-lg">
              <code className="text-green-300 font-mono">print("Hello, World!")</code>
            </pre>
            <div className="px-4 py-3 bg-[#11111b] border-t border-white/10">
              <div className="flex items-center gap-2 mb-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-xs text-slate-500 font-mono">output</span>
              </div>
              <pre className="text-sm text-white font-mono">Hello, World!</pre>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-white/10 backdrop-blur">
            <p className="text-sm text-blue-100">
              <strong className="text-white">Como funciona?</strong>
              <br />
              <code className="text-yellow-300">print()</code> é uma <strong className="text-white">função</strong>{" "}
              que recebe um texto entre aspas e o exibe na tela.
            </p>
          </div>
        </div>

        {/* More about print */}
        <div className="p-5 rounded-2xl bg-white shadow-sm border border-slate-100 mb-4">
          <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-500" />
            Mais sobre o print()
          </h4>

          <p className="text-[15px] text-slate-600 leading-relaxed mb-3">
            Você pode usar <strong>aspas simples</strong> ou <strong>aspas duplas</strong> — ambas funcionam da mesma
            forma:
          </p>

          <CodeBlock
            code={`print("Hello, World!")  # aspas duplas\nprint('Hello, World!')  # aspas simples`}
            output={"Hello, World!\nHello, World!"}
          />

          <p className="text-[15px] text-slate-600 leading-relaxed mb-3">
            Você também pode imprimir <strong>vários itens</strong> separados por vírgula:
          </p>

          <CodeBlock
            code={`print("Olá", "Mundo", "Python")`}
            output="Olá Mundo Python"
          />

          <p className="text-[15px] text-slate-600 leading-relaxed">
            E até fazer <strong>cálculos</strong> dentro do print:
          </p>

          <CodeBlock
            code={`print(2 + 3)\nprint("2 + 3 =", 2 + 3)`}
            output={"5\n2 + 3 = 5"}
          />
        </div>

        {/* ─── SUMMARY ─── */}
        <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-300" />
            </div>
            <h3 className="font-bold text-lg">Resumo da Aula</h3>
          </div>

          <ul className="space-y-3">
            {[
              "Python foi criado por Guido van Rossum em 1991",
              "É uma linguagem interpretada e de alto nível",
              "Possui tipagem dinâmica e forte",
              "É case-sensitive (diferencia maiúsculas/minúsculas)",
              'print("texto") exibe uma mensagem na tela',
              "Use aspas simples ou duplas para strings",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ─── FOOTER ─── */}
        <footer className="mt-8 text-center pb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-sm text-green-700">
            <Check className="w-4 h-4" />
            Aula 1 concluída!
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Feito com 💙 para iniciantes em Python
          </p>
        </footer>
      </main>
    </div>
  );
}

/* ───────────── section header ───────────── */
function SectionHeader({
  icon,
  title,
  subtitle,
  gradient,
  onView,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  gradient: string;
  onView: () => void;
}) {
  return (
    <div className="flex items-center gap-3 mb-4 mt-2" ref={(el) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) onView();
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }}>
      <div
        className={`flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg flex-shrink-0`}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-lg text-slate-800">{title}</h3>
        <p className="text-xs text-slate-400">{subtitle}</p>
      </div>
    </div>
  );
}
