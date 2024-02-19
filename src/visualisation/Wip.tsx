import { useEffect, useState } from 'react'

export default function Wip() {
  return <Circle />
}

function Circle() {
  const [dataset, setDataset] = useState(generateDataset())

  useEffect(() => {
    setInterval(() => {
      const newDataset = generateDataset()
      setDataset(newDataset)
    }, 2000)
  }, [dataset])

  return (
    <svg viewBox="0  0 100 50">
      {dataset.map(([x, y]) => (
        <circle cx={x} cy={y} r="3" />
      ))}
    </svg>
  )
}

function generateDataset() {
  return Array(10)
    .fill(0)
    .map(() => [Math.random() * 80 + 10, Math.random() * 35 + 10])
}
