import { useMemo, useState, type ReactNode } from 'react'

type Language = 'en' | 'pt'
type Screen = 'cover' | 'setup' | 'ready' | 'cutscene' | 'whoami' | 'choice' | 'comm-cut' | 'comm-title' | 'message' | 'curiosity-cut' | 'memory-title' | 'memory' | 'final-flight' | 'final'
type CardKind = 'food' | 'utensil'

const assets = {
  cover: 'https://www.figma.com/api/mcp/asset/e0495b7c-1e86-4e97-aa0c-ea3b2cf77abb',
  sky: 'https://www.figma.com/api/mcp/asset/777d9499-681c-4b12-bc52-251fb77d95e9',
  avatars: [
    'https://www.figma.com/api/mcp/asset/638f7bf8-9102-4ecd-bff6-525739fcf5b6',
    'https://www.figma.com/api/mcp/asset/cf1313c9-fc70-42c3-87f8-5b706cfe1f13',
    'https://www.figma.com/api/mcp/asset/4682b57e-123f-4dff-ac01-886f3b23ae8a',
    'https://www.figma.com/api/mcp/asset/d27102b5-5723-4e0d-a20e-61817a20365b',
    'https://www.figma.com/api/mcp/asset/d66cb6a6-b962-4e36-b3d3-89070a1ff9fe',
    'https://www.figma.com/api/mcp/asset/d8adfe98-a11c-48ea-8f9d-cae4a35d21cb'
  ],
  spaceship: 'https://www.figma.com/api/mcp/asset/df305be5-85d2-4415-bf0f-d42312bd1adc',
  whoAmI: 'https://www.figma.com/api/mcp/asset/7bd3bbb3-7d9c-49a5-966f-656aa2fd5eaa',
  friend: 'https://www.figma.com/api/mcp/asset/08f8b693-ad50-400e-b8c1-4878275fa75a',
  whoAmIChoice: 'https://www.figma.com/api/mcp/asset/b85a5c48-1ee4-422d-9896-e14c0a027257',
  qualities: [
    'https://www.figma.com/api/mcp/asset/663918f5-36d2-4963-a366-9788f01d4171',
    'https://www.figma.com/api/mcp/asset/be0c48fb-da45-4307-a1a1-89c33cc9390a',
    'https://www.figma.com/api/mcp/asset/eb52e853-caf8-48cf-8ac5-5137576e43a6'
  ],
  communication: 'https://www.figma.com/api/mcp/asset/2063d076-4067-4ab2-9abf-cda6917792b0',
  symbols: [
    'https://www.figma.com/api/mcp/asset/573eedd3-8f86-4307-818e-e306d8dee506',
    'https://www.figma.com/api/mcp/asset/c08d44cc-9c1e-4f81-8fa6-4e32a0ff9c27',
    'https://www.figma.com/api/mcp/asset/bc2d147e-548f-457c-8462-14adb5d32b71',
    'https://www.figma.com/api/mcp/asset/c087deda-1be2-4df2-bada-d29e106375a3',
    'https://www.figma.com/api/mcp/asset/d557dfbd-697a-461a-90e4-35b3c9503e6d',
    'https://www.figma.com/api/mcp/asset/d8420d01-1b8d-4ed4-9b7e-644ee538b51c',
    'https://www.figma.com/api/mcp/asset/c1b466a0-a7e5-4cfe-9f79-49223cadcb3b'
  ],
  curiosity: 'https://www.figma.com/api/mcp/asset/289f47c6-8d2f-45d7-a367-a26f51f3090c',
  memoryTable: 'https://www.figma.com/api/mcp/asset/62ba7391-c355-4389-a63a-7eb067c5bb9e'
}

const copy = {
  en: {
    settings: 'Settings', replay: 'Replay instructions', close: 'Leave game', back: 'Back', next: 'Next', finish: 'Finish', continue: 'Continue',
    chooseAvatar: 'Choose your avatar', name: 'Name', accessories: 'Choose an accessory', noAccessory: 'None',
    ready: 'Time to explore the galaxy!', readySub: 'Ready, set, zoom!', letsGo: "Let's go!", clickContinue: 'Click to continue',
    whoAmI: 'Who Am I?', qualityQuestion: 'I defend equality so that everyone has the same rights and opportunities.',
    qualityNames: ['Playfulness', 'Creativity', 'Justice'], correct: 'Great choice!', tryAgain: 'Try again — look for the value connected to equality.',
    messageTitle: 'Find the Hidden Message', messageHint: 'Use the seven clues to discover the message.', messagePlaceholder: '_ _ _ _ _ _ _',
    check: 'Check answer', messageError: 'That is not the hidden message. Try again.', messageCorrect: 'You found the message!',
    memoryTitle: 'Matching Cards', sameKind: 'Choose one food card and one cutlery card.', noMatch: 'Those cards do not match. Try again.', match: 'Correct match!',
    finalTitle: 'Great job, space explorer!', seeYou: 'See you soon!', playAgain: 'Play again',
    language: 'Language', volume: 'Narration volume', settingsTitle: 'Game settings', settingsHelp: 'You can change these options at any time.',
    tutorial: [
      'Did not quite catch the instructions? Press the replay button to listen again!',
      'Use settings to change the language and narration volume.',
      'Do you need to stop the adventure? Press the close button to leave the game.'
    ]
  },
  pt: {
    settings: 'Definições', replay: 'Repetir instruções', close: 'Sair do jogo', back: 'Voltar', next: 'Seguinte', finish: 'Terminar', continue: 'Continuar',
    chooseAvatar: 'Escolhe o teu avatar', name: 'Nome', accessories: 'Escolhe um acessório', noAccessory: 'Nenhum',
    ready: 'Está na hora de explorar a galáxia!', readySub: 'Preparar, apontar, voar!', letsGo: 'Vamos!', clickContinue: 'Clica para continuar',
    whoAmI: 'Quem Sou Eu?', qualityQuestion: 'Defendo a igualdade para que todos tenham os mesmos direitos e oportunidades.',
    qualityNames: ['Brincadeira', 'Criatividade', 'Justiça'], correct: 'Boa escolha!', tryAgain: 'Tenta novamente — procura o valor relacionado com a igualdade.',
    messageTitle: 'Encontra a Mensagem Escondida', messageHint: 'Usa as sete pistas para descobrir a mensagem.', messagePlaceholder: '_ _ _ _ _ _ _',
    check: 'Verificar resposta', messageError: 'Essa não é a mensagem escondida. Tenta novamente.', messageCorrect: 'Encontraste a mensagem!',
    memoryTitle: 'Cartas Correspondentes', sameKind: 'Escolhe uma carta de comida e uma carta de talheres.', noMatch: 'Estas cartas não correspondem. Tenta novamente.', match: 'Par correto!',
    finalTitle: 'Muito bem, explorador espacial!', seeYou: 'Até breve!', playAgain: 'Jogar novamente',
    language: 'Idioma', volume: 'Volume da narração', settingsTitle: 'Definições do jogo', settingsHelp: 'Podes alterar estas opções a qualquer momento.',
    tutorial: [
      'Não percebeste as instruções? Usa o botão de repetição para ouvir novamente!',
      'Usa as definições para alterar o idioma e o volume da narração.',
      'Precisas de parar a aventura? Usa o botão de saída para deixar o jogo.'
    ]
  }
} as const

const accessories = ['', '🧢', '👑', '👓', '🎧']

const memoryCards = [
  { pair: 'soup', kind: 'food' as CardKind, symbol: '🍲', name: 'Soup' },
  { pair: 'soup', kind: 'utensil' as CardKind, symbol: '🥄', name: 'Soup spoon' },
  { pair: 'noodles', kind: 'food' as CardKind, symbol: '🍜', name: 'Noodles' },
  { pair: 'noodles', kind: 'utensil' as CardKind, symbol: '🥢', name: 'Chopsticks' },
  { pair: 'salad', kind: 'food' as CardKind, symbol: '🥗', name: 'Salad' },
  { pair: 'salad', kind: 'utensil' as CardKind, symbol: '🍴', name: 'Salad fork' },
  { pair: 'steak', kind: 'food' as CardKind, symbol: '🥩', name: 'Steak' },
  { pair: 'steak', kind: 'utensil' as CardKind, symbol: '🔪', name: 'Knife' },
  { pair: 'rice', kind: 'food' as CardKind, symbol: '🍚', name: 'Rice' },
  { pair: 'rice', kind: 'utensil' as CardKind, symbol: '🥄', name: 'Rice spoon' },
  { pair: 'flatbread', kind: 'food' as CardKind, symbol: '🫓', name: 'Flatbread' },
  { pair: 'flatbread', kind: 'utensil' as CardKind, symbol: '👐', name: 'Hands' },
  { pair: 'pizza', kind: 'food' as CardKind, symbol: '🍕', name: 'Pizza' },
  { pair: 'pizza', kind: 'utensil' as CardKind, symbol: '🙌', name: 'Hands' },
  { pair: 'egg', kind: 'food' as CardKind, symbol: '🥚', name: 'Egg' },
  { pair: 'egg', kind: 'utensil' as CardKind, symbol: '🥄', name: 'Egg spoon' },
  { pair: 'pasta', kind: 'food' as CardKind, symbol: '🍝', name: 'Pasta' },
  { pair: 'pasta', kind: 'utensil' as CardKind, symbol: '🍴', name: 'Pasta fork' }
].map((card, id) => ({ ...card, id }))

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5)
}

function IconButton({ label, children, onClick }: { label: string; children: ReactNode; onClick?: () => void }) {
  return <button className="icon-button" aria-label={label} title={label} onClick={onClick}>{children}</button>
}

function AvatarPanel({ selected, setSelected, name, setName, accessory, setAccessory, t }: {
  selected: number; setSelected: (value: number) => void; name: string; setName: (value: string) => void
  accessory: string; setAccessory: (value: string) => void; t: typeof copy.en | typeof copy.pt
}) {
  const randomName = () => setName(['Nova', 'Lumi', 'Orion', 'Mika', 'Sol', 'Ari'][Math.floor(Math.random() * 6)])
  return <>
    <section className="avatar-panel" aria-label={t.chooseAvatar}>
      <h2>{t.chooseAvatar}</h2>
      <div className="avatar-grid">
        {assets.avatars.map((src, index) => <button key={src} onClick={() => setSelected(index)} className={`avatar avatar-${index} ${selected === index ? 'selected' : ''}`} aria-label={`Avatar ${index + 1}`}>
          <img src={src} alt="" />{selected === index && accessory && <span className="avatar-accessory">{accessory}</span>}
        </button>)}
      </div>
    </section>
    <div className="accessory-row" aria-label={t.accessories}>
      <span>{t.accessories}</span>
      {accessories.map((item, index) => <button key={`${item}-${index}`} className={accessory === item ? 'selected' : ''} onClick={() => setAccessory(item)} aria-label={item || t.noAccessory}>{item || '—'}</button>)}
    </div>
    <div className="name-row">
      <label htmlFor="player-name">{t.name}</label>
      <input id="player-name" value={name} onChange={event => setName(event.target.value)} maxLength={20} />
      <button className="dice" onClick={randomName} aria-label="Generate a random name">◆</button>
    </div>
  </>
}

export default function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [volume, setVolume] = useState(1)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [screen, setScreen] = useState<Screen>('cover')
  const [tutorialStep, setTutorialStep] = useState<number | null>(null)
  const [selected, setSelected] = useState(0)
  const [accessory, setAccessory] = useState('')
  const [name, setName] = useState('')
  const [quality, setQuality] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [messageState, setMessageState] = useState<'idle' | 'error' | 'success'>('idle')
  const [deck] = useState(() => shuffle(memoryCards))
  const [openCards, setOpenCards] = useState<number[]>([])
  const [matchedCards, setMatchedCards] = useState<number[]>([])
  const [memoryFeedback, setMemoryFeedback] = useState('')
  const t = copy[language]

  const instruction = useMemo(() => {
    if (tutorialStep !== null) return t.tutorial[tutorialStep]
    if (screen === 'setup') return `${t.chooseAvatar}. ${t.accessories}. ${t.name}.`
    if (screen === 'ready') return `${t.ready} ${t.readySub}`
    if (screen === 'whoami' || screen === 'choice') return `${t.whoAmI}. ${t.qualityQuestion}`
    if (screen === 'comm-title' || screen === 'message') return `${t.messageTitle}. ${t.messageHint}`
    if (screen === 'memory-title' || screen === 'memory') return `${t.memoryTitle}. ${t.sameKind}`
    if (screen === 'final') return `${t.finalTitle} ${t.seeYou}`
    return t.ready
  }, [screen, t, tutorialStep])

  const speak = (text = instruction) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language === 'pt' ? 'pt-PT' : 'en-GB'
    utterance.volume = volume
    window.speechSynthesis.speak(utterance)
  }

  const start = () => { setScreen('setup'); setTutorialStep(0) }
  const nextTutorial = () => tutorialStep === null ? setScreen('ready') : tutorialStep < 2 ? setTutorialStep(tutorialStep + 1) : setTutorialStep(null)
  const leaveGame = () => { window.speechSynthesis?.cancel(); setScreen('cover'); setTutorialStep(null); setSettingsOpen(false) }

  const checkMessage = () => {
    const expected = language === 'pt' ? 'AMIZADE' : 'FRIENDS'
    if (message === expected) { setMessageState('success'); speak(t.messageCorrect) }
    else { setMessageState('error'); speak(t.messageError) }
  }

  const chooseCard = (id: number) => {
    if (openCards.includes(id) || matchedCards.includes(id) || openCards.length === 2) return
    const nextOpen = [...openCards, id]
    setOpenCards(nextOpen)
    setMemoryFeedback('')
    if (nextOpen.length !== 2) return
    const [first, second] = nextOpen.map(cardId => deck.find(card => card.id === cardId)!)
    window.setTimeout(() => {
      if (first.kind === second.kind) setMemoryFeedback(t.sameKind)
      else if (first.pair !== second.pair) setMemoryFeedback(t.noMatch)
      else {
        setMatchedCards(current => [...current, first.id, second.id])
        setMemoryFeedback(t.match)
      }
      setOpenCards([])
    }, 650)
  }

  const resetGame = () => {
    setScreen('cover'); setTutorialStep(null); setQuality(null); setMessage(''); setMessageState('idle')
    setOpenCards([]); setMatchedCards([]); setMemoryFeedback('')
  }

  return <main className="stage-shell">
    <div className={`stage ${screen === 'cover' ? 'cover' : ['cutscene', 'comm-cut', 'curiosity-cut', 'final'].includes(screen) ? 'cutscene' : screen === 'whoami' || screen === 'choice' ? 'friendship' : 'space'}`}>
      {screen === 'cover' ? <>
        <img className="cover-art" src={assets.cover} alt="Space Inclusion — two characters sitting on a purple planet" />
        <IconButton label={t.settings} onClick={() => setSettingsOpen(true)}>⚙</IconButton>
        <button className="play" onClick={start} aria-label="Play"><span>▷</span></button>
      </> : screen === 'cutscene' ? <button className="cutscene-skip" onClick={() => setScreen('whoami')} aria-label={t.continue}><span>{t.clickContinue}</span></button> : screen === 'whoami' || screen === 'choice' ? <>
        <img className="friendship-bg" src={screen === 'whoami' ? assets.whoAmI : assets.whoAmIChoice} alt="" />
        <Profile selected={selected} name={name} accessory={accessory} />
        <Toolbar t={t} onReplay={() => speak()} onSettings={() => setSettingsOpen(true)} onClose={leaveGame} />
        {screen === 'whoami' ? <section className="whoami-intro">
          <h1>“{t.whoAmI}”</h1><img src={assets.friend} alt="Friendly one-eyed alien" />
          <button className="primary whoami-next" onClick={() => setScreen('choice')}>{t.next}</button>
        </section> : <section className="quality-game">
          <h1>{t.qualityQuestion}</h1>
          <div className="quality-cards">
            {t.qualityNames.map((label, index) => <button className={`quality-card ${quality === index ? 'selected' : ''}`} key={label} onClick={() => setQuality(index)}>
              <img src={assets.qualities[index]} alt="" /><span>{label}</span>
            </button>)}
          </div>
          {quality !== null && <p className="quality-feedback" role="status">{quality === 2 ? t.correct : t.tryAgain}</p>}
          {quality === 2 && <button className="primary game-continue" onClick={() => setScreen('comm-cut')}>{t.continue}</button>}
        </section>}
      </> : screen === 'comm-cut' || screen === 'curiosity-cut' ? <button className="scene-transition" onClick={() => setScreen(screen === 'comm-cut' ? 'comm-title' : 'memory-title')}>
        <img src={screen === 'comm-cut' ? assets.communication : assets.curiosity} alt="A new planet and its resident" /><span>{t.continue}</span>
      </button> : screen === 'comm-title' || screen === 'memory-title' ? <>
        <img className="planet-bg" src={screen === 'comm-title' ? assets.communication : assets.curiosity} alt="" />
        <GameChrome selected={selected} name={name} accessory={accessory} t={t} onReplay={() => speak()} onSettings={() => setSettingsOpen(true)} onClose={leaveGame} />
        <h1 className="planet-title">{screen === 'comm-title' ? t.messageTitle : t.memoryTitle}</h1>
        <button className="primary game-continue" onClick={() => setScreen(screen === 'comm-title' ? 'message' : 'memory')}>{t.next}</button>
      </> : screen === 'message' ? <>
        <img className="planet-bg dim" src={assets.communication} alt="" />
        <GameChrome selected={selected} name={name} accessory={accessory} t={t} onReplay={() => speak()} onSettings={() => setSettingsOpen(true)} onClose={leaveGame} />
        <section className="message-game">
          <div className="symbol-row">{assets.symbols.map((src, index) => <img src={src} alt={`Clue ${index + 1}`} key={src} />)}</div>
          <input className={messageState} aria-invalid={messageState === 'error'} aria-label="Hidden seven-letter message" maxLength={7} value={message} onChange={event => { setMessage(event.target.value.toUpperCase().replace(/[^A-Z]/g, '')); setMessageState('idle') }} placeholder={t.messagePlaceholder} />
          <p className={`message-feedback ${messageState}`} role="status">{messageState === 'error' ? t.messageError : messageState === 'success' ? t.messageCorrect : t.messageHint}</p>
          {message.length === 7 && messageState !== 'success' && <button className="primary game-continue" onClick={checkMessage}>{t.check}</button>}
          {messageState === 'success' && <button className="primary game-continue" onClick={() => setScreen('curiosity-cut')}>{t.continue}</button>}
        </section>
      </> : screen === 'memory' ? <>
        <img className="planet-bg memory-bg" src={assets.memoryTable} alt="" />
        <GameChrome selected={selected} name={name} accessory={accessory} t={t} onReplay={() => speak()} onSettings={() => setSettingsOpen(true)} onClose={leaveGame} />
        <section className="memory-grid" aria-label={t.memoryTitle}>
          {deck.map(card => { const shown = openCards.includes(card.id) || matchedCards.includes(card.id); return <button key={card.id} className={`memory-card ${shown ? 'shown' : ''} ${matchedCards.includes(card.id) ? 'matched' : ''}`} onClick={() => chooseCard(card.id)} aria-label={shown ? card.name : 'Hidden card'}>{shown ? <><span>{card.symbol}</span><small>{card.name}</small></> : '✦'}</button> })}
        </section>
        {memoryFeedback && <p className="memory-feedback" role="status">{memoryFeedback}</p>}
        {matchedCards.length === deck.length && <button className="primary game-continue" onClick={() => setScreen('final-flight')}>{t.continue}</button>}
      </> : screen === 'final-flight' ? <section className="final-flight">
        <img src={assets.spaceship} alt="Spaceship flying home" /><button className="primary game-continue" onClick={() => setScreen('final')}>{t.finish}</button>
      </section> : screen === 'final' ? <section className="final-message"><h1>{t.finalTitle}</h1><p>{t.seeYou}</p><button className="primary" onClick={resetGame}>{t.playAgain}</button></section> : <>
        <div className="toolbar">
          {screen === 'ready' && <IconButton label={t.back} onClick={() => setScreen('setup')}>←</IconButton>}
          <span className="spacer" />
          <IconButton label={t.replay} onClick={() => speak()}>↻</IconButton>
          <IconButton label={t.settings} onClick={() => setSettingsOpen(true)}>⚙</IconButton>
          <IconButton label={t.close} onClick={leaveGame}>×</IconButton>
        </div>
        {screen === 'setup' ? <>
          <AvatarPanel selected={selected} setSelected={setSelected} name={name} setName={setName} accessory={accessory} setAccessory={setAccessory} t={t} />
          {tutorialStep === null && <button className="primary next" onClick={nextTutorial}>{t.next}</button>}
        </> : <section className="ready-screen">
          <h1>{t.ready}</h1><strong>{t.readySub}</strong><img src={assets.spaceship} alt="Colourful spaceship" />
          <button className="primary lets-go" onClick={() => setScreen('cutscene')}>{t.letsGo}</button>
        </section>}
        {tutorialStep !== null && <div className="tutorial" role="dialog" aria-modal="true" aria-label={`Tutorial step ${tutorialStep + 1}`}>
          <h1>Tutorial:</h1><p>{t.tutorial[tutorialStep]}</p><b>{tutorialStep + 1}/3</b>
          <button className="primary tutorial-next" onClick={nextTutorial}>{tutorialStep === 2 ? t.finish : t.next}</button>
        </div>}
      </>}

      {settingsOpen && <div className="settings-backdrop" role="presentation">
        <section className="settings-panel" role="dialog" aria-modal="true" aria-labelledby="settings-title">
          <h2 id="settings-title">{t.settingsTitle}</h2><p>{t.settingsHelp}</p>
          <label>{t.language}<select value={language} onChange={event => setLanguage(event.target.value as Language)}><option value="en">English</option><option value="pt">Português</option></select></label>
          <label>{t.volume}<input type="range" min="0" max="1" step="0.1" value={volume} onChange={event => setVolume(Number(event.target.value))} /></label>
          <button className="primary" onClick={() => { speak(); setSettingsOpen(false) }}>{t.replay}</button>
          <button className="settings-close" onClick={() => setSettingsOpen(false)} aria-label={t.close}>×</button>
        </section>
      </div>}
    </div>
  </main>
}

function Profile({ selected, name, accessory }: { selected: number; name: string; accessory: string }) {
  return <div className="profile-orbit" aria-label={`${name || 'Player'} profile`}><img src={assets.avatars[selected]} alt="Selected player avatar" />{accessory && <span className="profile-accessory">{accessory}</span>}<i /><i /><i /></div>
}

function Toolbar({ t, onReplay, onSettings, onClose }: { t: typeof copy.en | typeof copy.pt; onReplay: () => void; onSettings: () => void; onClose: () => void }) {
  return <div className="toolbar friendship-toolbar"><span className="spacer" /><IconButton label={t.replay} onClick={onReplay}>↻</IconButton><IconButton label={t.settings} onClick={onSettings}>⚙</IconButton><IconButton label={t.close} onClick={onClose}>×</IconButton></div>
}

function GameChrome({ selected, name, accessory, t, onReplay, onSettings, onClose }: { selected: number; name: string; accessory: string; t: typeof copy.en | typeof copy.pt; onReplay: () => void; onSettings: () => void; onClose: () => void }) {
  return <><Profile selected={selected} name={name} accessory={accessory} /><Toolbar t={t} onReplay={onReplay} onSettings={onSettings} onClose={onClose} /></>
}
