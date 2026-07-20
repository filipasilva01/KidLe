import { useState } from 'react'

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
  spaceship: 'https://www.figma.com/api/mcp/asset/df305be5-85d2-4415-bf0f-d42312bd1adc'
  ,whoAmI: 'https://www.figma.com/api/mcp/asset/7bd3bbb3-7d9c-49a5-966f-656aa2fd5eaa'
  ,friend: 'https://www.figma.com/api/mcp/asset/08f8b693-ad50-400e-b8c1-4878275fa75a'
  ,whoAmIChoice: 'https://www.figma.com/api/mcp/asset/b85a5c48-1ee4-422d-9896-e14c0a027257'
  ,qualities: [
    'https://www.figma.com/api/mcp/asset/663918f5-36d2-4963-a366-9788f01d4171',
    'https://www.figma.com/api/mcp/asset/be0c48fb-da45-4307-a1a1-89c33cc9390a',
    'https://www.figma.com/api/mcp/asset/eb52e853-caf8-48cf-8ac5-5137576e43a6'
  ]
  ,communication: 'https://www.figma.com/api/mcp/asset/2063d076-4067-4ab2-9abf-cda6917792b0'
  ,symbolStrip: 'https://www.figma.com/api/mcp/asset/a0135d67-746f-4d31-804b-27b24a49c911'
  ,symbols: [
    'https://www.figma.com/api/mcp/asset/573eedd3-8f86-4307-818e-e306d8dee506',
    'https://www.figma.com/api/mcp/asset/c08d44cc-9c1e-4f81-8fa6-4e32a0ff9c27',
    'https://www.figma.com/api/mcp/asset/bc2d147e-548f-457c-8462-14adb5d32b71',
    'https://www.figma.com/api/mcp/asset/c087deda-1be2-4df2-bada-d29e106375a3',
    'https://www.figma.com/api/mcp/asset/d557dfbd-697a-461a-90e4-35b3c9503e6d',
    'https://www.figma.com/api/mcp/asset/d8420d01-1b8d-4ed4-9b7e-644ee538b51c',
    'https://www.figma.com/api/mcp/asset/c1b466a0-a7e5-4cfe-9f79-49223cadcb3b'
  ]
  ,curiosity: 'https://www.figma.com/api/mcp/asset/289f47c6-8d2f-45d7-a367-a26f51f3090c'
  ,memoryTable: 'https://www.figma.com/api/mcp/asset/62ba7391-c355-4389-a63a-7eb067c5bb9e'
}

const memoryValues = ['🍌', '🥕', '🥚', '🧀', '🍄', '☁️', '🍝', '🥣']
const memoryDeck = [...memoryValues, ...memoryValues].map((value, id) => ({ id, value }))

const tutorial = [
  <>Did not quite catch the instructions?<br />Press here to listen to them again!</>,
  <>Here you can change the game language, the sound<br />volume and see who created this adventure!</>,
  <>Do you need to stop the adventure?<br />Press here to leave the game!</>
]

function IconButton({ label, children, onClick }: { label: string; children: string; onClick?: () => void }) {
  return <button className="icon-button" aria-label={label} title={label} onClick={onClick}>{children}</button>
}

function AvatarPanel({ selected, setSelected, name, setName }: {
  selected: number; setSelected: (n: number) => void; name: string; setName: (s: string) => void
}) {
  const randomName = () => setName(['Nova', 'Lumi', 'Orion', 'Mika', 'Sol', 'Ari'][Math.floor(Math.random() * 6)])
  return <>
    <section className="avatar-panel" aria-label="Choose your avatar">
      <h2>Choose your avatar</h2>
      <div className="avatar-grid">
        {assets.avatars.map((src, index) => <button key={src} onClick={() => setSelected(index)} className={`avatar avatar-${index} ${selected === index ? 'selected' : ''}`} aria-label={`Avatar ${index + 1}`}>
          <img src={src} alt="" />
        </button>)}
      </div>
    </section>
    <div className="name-row">
      <label htmlFor="player-name">Name</label>
      <input id="player-name" value={name} onChange={e => setName(e.target.value)} maxLength={20} />
      <button className="dice" onClick={randomName} aria-label="Generate a random name">◆</button>
    </div>
  </>
}

export default function App() {
  const [screen, setScreen] = useState<'cover' | 'setup' | 'ready' | 'cutscene' | 'whoami' | 'choice' | 'comm-cut' | 'comm-title' | 'message' | 'curiosity-cut' | 'memory-title' | 'memory' | 'final-flight' | 'final'>('cover')
  const [tutorialStep, setTutorialStep] = useState<number | null>(null)
  const [selected, setSelected] = useState(0)
  const [name, setName] = useState('')
  const [quality, setQuality] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [openCards, setOpenCards] = useState<number[]>([])
  const [matchedCards, setMatchedCards] = useState<number[]>([])

  const start = () => { setScreen('setup'); setTutorialStep(0) }
  const next = () => tutorialStep === null ? setScreen('ready') : tutorialStep < 2 ? setTutorialStep(tutorialStep + 1) : setTutorialStep(null)
  const chooseCard = (id: number) => {
    if (openCards.includes(id) || matchedCards.includes(id) || openCards.length === 2) return
    const nextOpen = [...openCards, id]
    setOpenCards(nextOpen)
    if (nextOpen.length === 2) {
      const [a, b] = nextOpen
      if (memoryDeck[a].value === memoryDeck[b].value) { setMatchedCards(v => [...v, a, b]); setOpenCards([]) }
      else window.setTimeout(() => setOpenCards([]), 650)
    }
  }

  return <main className="stage-shell">
    <div className={`stage ${screen === 'cover' ? 'cover' : ['cutscene','comm-cut','curiosity-cut','final'].includes(screen) ? 'cutscene' : screen === 'whoami' || screen === 'choice' ? 'friendship' : 'space'}`}>
      {screen === 'cover' ? <>
        <img className="cover-art" src={assets.cover} alt="Space Inclusion — two characters sitting on a purple planet" />
        <IconButton label="Settings">⚙</IconButton>
        <button className="play" onClick={start} aria-label="Play"><span>▷</span></button>
      </> : screen === 'cutscene' ? <button className="cutscene-skip" onClick={() => setScreen('whoami')} aria-label="Continue to Who Am I"><span>Click to continue</span></button> : screen === 'whoami' || screen === 'choice' ? <>
        <img className="friendship-bg" src={screen === 'whoami' ? assets.whoAmI : assets.whoAmIChoice} alt="" />
        <div className="profile-orbit" aria-label={`${name || 'Player'} profile`}>
          <img src={assets.avatars[selected]} alt="Selected player avatar" />
          <i /><i /><i />
        </div>
        <div className="toolbar friendship-toolbar">
          <span className="spacer" />
          <IconButton label="Replay" onClick={() => setScreen('whoami')}>↻</IconButton>
          <IconButton label="Settings">⚙</IconButton>
          <IconButton label="Close" onClick={() => setScreen('cover')}>×</IconButton>
        </div>
        {screen === 'whoami' ? <section className="whoami-intro">
          <h1>“Who Am I?”</h1>
          <img src={assets.friend} alt="Friendly one-eyed alien" />
          <button className="primary whoami-next" onClick={() => setScreen('choice')}>Next</button>
        </section> : <section className="quality-game">
          <h1>I defend equality so that everyone has the same rights and opportunities.</h1>
          <div className="quality-cards">
            {['Playfulness', 'Creativity', 'Justice'].map((label, index) => <button className={`quality-card ${quality === index ? 'selected' : ''}`} key={label} onClick={() => setQuality(index)}>
              <img src={assets.qualities[index]} alt="" /><span>{label}</span>
            </button>)}
          </div>
          {quality !== null && <p className="quality-feedback" role="status">{quality === 2 ? 'Great choice!' : 'Try again — look for the value connected to equality.'}</p>}
          {quality === 2 && <button className="primary game-continue" onClick={() => setScreen('comm-cut')}>Continue</button>}
        </section>}
      </> : screen === 'comm-cut' || screen === 'curiosity-cut' ? <button className="scene-transition" onClick={() => setScreen(screen === 'comm-cut' ? 'comm-title' : 'memory-title')}>
        <img src={screen === 'comm-cut' ? assets.communication : assets.curiosity} alt="A new planet and its resident" /><span>Continue</span>
      </button> : screen === 'comm-title' || screen === 'memory-title' ? <>
        <img className="planet-bg" src={screen === 'comm-title' ? assets.communication : assets.curiosity} alt="" />
        <GameChrome selected={selected} name={name} onReplay={() => setScreen(screen)} onClose={() => setScreen('cover')} />
        <h1 className="planet-title">{screen === 'comm-title' ? 'Find the Hidden Message' : 'Matching Cards'}</h1>
        <button className="primary game-continue" onClick={() => setScreen(screen === 'comm-title' ? 'message' : 'memory')}>Next</button>
      </> : screen === 'message' ? <>
        <img className="planet-bg dim" src={assets.communication} alt="" />
        <GameChrome selected={selected} name={name} onReplay={() => setMessage('')} onClose={() => setScreen('cover')} />
        <section className="message-game">
          <div className="symbol-row">{assets.symbols.map((src, i) => <img src={src} alt={`Clue ${i + 1}`} key={src} />)}</div>
          <input aria-label="Hidden seven-letter message" maxLength={7} value={message} onChange={e => setMessage(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))} placeholder="_ _ _ _ _ _ _" />
          <p>Use the seven clues to discover the message.</p>
          {message.length === 7 && <button className="primary game-continue" onClick={() => setScreen('curiosity-cut')}>Continue</button>}
        </section>
      </> : screen === 'memory' ? <>
        <img className="planet-bg memory-bg" src={assets.memoryTable} alt="" />
        <GameChrome selected={selected} name={name} onReplay={() => { setOpenCards([]); setMatchedCards([]) }} onClose={() => setScreen('cover')} />
        <section className="memory-grid" aria-label="Matching cards game">
          {memoryDeck.map(card => { const shown = openCards.includes(card.id) || matchedCards.includes(card.id); return <button key={card.id} className={`memory-card ${shown ? 'shown' : ''} ${matchedCards.includes(card.id) ? 'matched' : ''}`} onClick={() => chooseCard(card.id)} aria-label={shown ? card.value : 'Hidden card'}>{shown ? card.value : '✦'}</button> })}
        </section>
        {matchedCards.length === memoryDeck.length && <button className="primary game-continue" onClick={() => setScreen('final-flight')}>Continue</button>}
      </> : screen === 'final-flight' ? <section className="final-flight">
        <img src={assets.spaceship} alt="Spaceship flying home" />
        <button className="primary game-continue" onClick={() => setScreen('final')}>Finish</button>
      </section> : screen === 'final' ? <section className="final-message"><h1>Great job, space explorer!</h1><p>See you soon!</p><button className="primary" onClick={() => { setScreen('cover'); setQuality(null); setMessage(''); setMatchedCards([]) }}>Play again</button></section> : <>
        <div className="toolbar">
          {screen === 'ready' && <IconButton label="Back" onClick={() => setScreen('setup')}>←</IconButton>}
          <span className="spacer" />
          <IconButton label="Replay tutorial" onClick={() => setTutorialStep(0)}>↻</IconButton>
          <IconButton label="Settings">⚙</IconButton>
          <IconButton label="Close" onClick={() => { setScreen('cover'); setTutorialStep(null) }}>×</IconButton>
        </div>
        {screen === 'setup' ? <>
          <AvatarPanel selected={selected} setSelected={setSelected} name={name} setName={setName} />
          {tutorialStep === null && <button className="primary next" onClick={next}>Next</button>}
        </> : <section className="ready-screen">
          <h1>Time to explore the galaxy!</h1>
          <strong>Ready, set, zoom!</strong>
          <img src={assets.spaceship} alt="Colourful spaceship" />
          <button className="primary lets-go" onClick={() => setScreen('cutscene')}>Let's go!</button>
        </section>}
        {tutorialStep !== null && <div className="tutorial" role="dialog" aria-modal="true" aria-label={`Tutorial step ${tutorialStep + 1}`}>
          <h1>Tutorial:</h1>
          <p>{tutorial[tutorialStep]}</p>
          <b>{tutorialStep + 1}/3</b>
          <button className="primary tutorial-next" onClick={next}>{tutorialStep === 2 ? 'Finish' : 'Next'}</button>
        </div>}
      </>}
    </div>
  </main>
}

function GameChrome({ selected, name, onReplay, onClose }: { selected: number; name: string; onReplay: () => void; onClose: () => void }) {
  return <><div className="profile-orbit game-profile" aria-label={`${name || 'Player'} profile`}><img src={assets.avatars[selected]} alt="Selected player avatar" /><i /><i /><i /></div><div className="toolbar friendship-toolbar"><span className="spacer" /><IconButton label="Replay" onClick={onReplay}>↻</IconButton><IconButton label="Settings">⚙</IconButton><IconButton label="Close" onClick={onClose}>×</IconButton></div></>
}
