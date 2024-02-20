import { useMemo } from 'react'
import * as d3 from 'd3'

interface AxisProps {
  domain: number[]
  range: number[]
}

export default function Axis(props: AxisProps) {
  const { domain, range } = props

  const ticks = useMemo(() => {
    const xScale = d3.scaleLinear().domain(domain).range(range)
    return xScale.ticks().map((value) => ({
      value,
      xOffset: xScale(value),
    }))
  }, [domain, range])

  return (
    <svg>
      <path d="M 9.5 0.5 H 290.5" stroke="currentColor" />
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          <line y2="6" stroke="currentColor" />
          <text
            key={value}
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              transform: 'translateY(20px)',
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </svg>
  )
}
