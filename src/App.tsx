import { useState } from 'react'
import blazeImage from './assets/blaze.jpg?w=300&h=300&format=webp&imagetools'
import handIcon from './assets/hand.svg'
import utilStyle from '@/styles/utils/container.module.css'
import style from './app.module.css'
const techIcons = ['react-icon.svg', 'typescript-icon.svg', 'vite-icon.svg']

function App() {
  const [boops, setBoops] = useState(0)
  const [playAnimation, setPlayAnimation] = useState(false)
  return (
    <main className={style.app}>
      <section aria-label="starter introduction" className={style.introduction}>
        <div className={utilStyle.container}>
          <div>
            <h1>Vite + React + TypeScript</h1>
            <ul className={style.techList}>
              {techIcons.map((icon) => (
                <li key={icon}>
                  {' '}
                  <img src={`/icons/${icon}`} alt="" />
                </li>
              ))}
            </ul>
          </div>

          <p className={style.info}>
            Welcome to my <strong>Vite + React + TypeScript</strong> template
            setup. Please check out the <code>README.md</code> for more
            information on the configuration!
          </p>
        </div>
      </section>

      <section
        aria-label="interactive dog petting"
        className={style.petGoodBoy}
      >
        <div className={utilStyle.container}>
          <h2>
            Give the good boy <br />
            some boops
          </h2>

          <div className={style.boopCounter}>
            <button
              onClick={() => {
                if (playAnimation) return
                setBoops((b) => b + 1)
                setPlayAnimation(true)
              }}
              disabled={playAnimation}
            >
              Boop
            </button>
            <p>Boops: {boops}</p>
          </div>

          <div className={style.boopers}>
            <img
              src={handIcon}
              alt=""
              className={style.hand}
              data-boop={playAnimation}
              onAnimationEnd={() => setPlayAnimation(false)}
            />
            <img src={blazeImage} alt="Very good dog" className={style.blaze} />
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
