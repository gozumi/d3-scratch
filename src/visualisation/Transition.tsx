import { useSpring, animated } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react'

export default function AnimatedCircles() {
  const [visibleCircles, setVisibleCircles] = useState(generateCircles())

  useEffect(() => {
    setInterval(() => {
      setVisibleCircles(generateCircles())
    }, 2000)
  }, [visibleCircles])

  return (
    <svg viewBox="0 0 100 20">
      {visibleCircles.map((d) => (
        <AnimatedCircle
          key={d}
          index={d}
          isShowing={visibleCircles.includes(d)}
        />
      ))}
    </svg>
  )
}

function AnimatedCircle({
  index,
  isShowing,
}: {
  index: number
  isShowing: boolean
}) {
  const wasShowing = useRef(false)
  useEffect(() => {
    wasShowing.current = isShowing
  }, [isShowing])
  const style = useSpring({
    config: {
      duration: 1200,
    },
    r: isShowing ? 6 : 0,
    opacity: isShowing ? 1 : 0,
  })

  return (
    <animated.circle
      {...style}
      cx={index * 15 + 10}
      cy="10"
      fill={
        !isShowing
          ? 'tomato'
          : !wasShowing.current
            ? 'cornflowerblue'
            : 'lightgrey'
      }
    />
  )
}

function generateCircles() {
  return Array(10)
    .fill(0)
    .map(() => Math.floor(Math.random() * 100))
}
