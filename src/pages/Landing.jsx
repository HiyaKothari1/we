import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

// ghost
const DURATION = 8 // ek chakkar (left -> right -> left) kitne second mein
const LOOPS = 3    // ghost kitne chakkar lagaye

// skeleton ki timeline (seconds)
const WAIT = 2     // girne se pehle upar kitna ruke
const DROP = 0.3   // girne mein lagne wala waqt (chhota = zyada tez/thappp)
const BOUNCE = 0.3 // zameen par thup + rebound
const HOLD = 5     // neeche kitni der ruka rahe
const RISE = 3     // wapas upar jaane mein
const TOTAL = WAIT + DROP + BOUNCE + HOLD + RISE

const t = (s) => s / TOTAL

export default function Landing() {
  return (
    // poori screen, koi scroll nahi
    <div className="relative h-dvh w-full overflow-hidden bg-black">
      <Navbar />

      {/* shake wala layer; zoom neeche ke kinare se hota hai, isliye extra hissa upar se katta hai */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: 1.04, transformOrigin: 'bottom center' }}
        animate={{
          x: [0, 0, -7, 7, -4, 4, 0, 0],
          y: [0, 0, 0, -3, 0, -2, 0, 0],
        }}
        transition={{
          duration: TOTAL,
          repeat: Infinity,
          ease: 'linear',
          times: [
            0,
            t(WAIT + DROP),
            t(WAIT + DROP + 0.08),
            t(WAIT + DROP + 0.16),
            t(WAIT + DROP + 0.24),
            t(WAIT + DROP + 0.32),
            t(WAIT + DROP + 0.4),
            1,
          ],
        }}
      >
        {/* object-bottom: image neeche se tikti hai, extra hissa upar se cut hota hai */}
        <img
          src="/images/gate-bg.png"
          alt="Welcome to The Project Graveyard"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover object-bottom"
        />

        {/* ghost: left -> right -> left, LOOPS chakkar ke baad fade out */}
        <motion.div
          className="pointer-events-none absolute top-[15%] w-[14%]"
          initial={{ left: '1%', opacity: 1 }}
          animate={{ left: ['1%', '85%', '1%'], opacity: 0 }}
          transition={{
            left: { duration: DURATION, ease: 'linear', repeat: LOOPS - 1 },
            opacity: { delay: DURATION * LOOPS - 0.6, duration: 0.6 },
          }}
        >
          <motion.div
            animate={{ scaleX: [1, 1, -1, -1] }}
            transition={{
              duration: DURATION,
              times: [0, 0.49, 0.5, 1],
              ease: 'linear',
              repeat: LOOPS - 1,
            }}
          >
            <motion.img
              src="/images/ghost.png"
              alt=""
              draggable={false}
              className="w-full select-none opacity-60 drop-shadow-[0_0_25px_rgba(200,255,230,0.5)]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>

        {/* skeleton: WAIT sec baad dhadaam, HOLD sec ruka, RISE sec mein upar, phir dobara */}
        <motion.div
          className="pointer-events-none absolute left-[70%] top-0 w-[14%]"
          initial={{ y: '-110%' }}
          animate={{ y: ['-110%', '-110%', '0%', '-7%', '0%', '0%', '-110%'] }}
          transition={{
            duration: TOTAL,
            repeat: Infinity,
            times: [
              0,
              t(WAIT),
              t(WAIT + DROP),
              t(WAIT + DROP + BOUNCE / 2),
              t(WAIT + DROP + BOUNCE),
              t(WAIT + DROP + BOUNCE + HOLD),
              1,
            ],
            ease: ['linear', [0.75, 0, 1, 0.55], 'easeOut', 'easeIn', 'linear', 'easeInOut'],
          }}
        >
          <motion.img
            src="/images/skeleton.png"
            alt=""
            draggable={false}
            className="w-full select-none drop-shadow-[0_8px_18px_rgba(0,0,0,0.7)]"
            style={{ transformOrigin: 'top center' }}
            animate={{ rotate: [0, 0, 5, -4, 2, 0, 0, 0] }}
            transition={{
              duration: TOTAL,
              repeat: Infinity,
              ease: 'easeOut',
              times: [
                0,
                t(WAIT),
                t(WAIT + DROP),
                t(WAIT + DROP + 0.12),
                t(WAIT + DROP + 0.25),
                t(WAIT + DROP + BOUNCE),
                t(WAIT + DROP + BOUNCE + HOLD),
                1,
              ],
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}