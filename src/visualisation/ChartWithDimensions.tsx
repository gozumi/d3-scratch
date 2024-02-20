import * as d3 from 'd3'
import { useEffect, useMemo, useRef, useState } from 'react'
import Axis from './Axis'

interface Dimensions {
  boundedHeight?: number
  boundedWidth?: number
  width: number
  height: number
  marginTop?: number
  marginBottom?: number
  marginRight?: number
  marginLeft?: number
}

export default function ChartWithDimensions() {
  const { ref, dimensions } = useChartDimensions({
    width: 500,
    height: 500,
  })

  const xScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, 200])
        .range([0, dimensions.boundedWidth || 0]),
    [dimensions],
  )

  return (
    <div className="chart__wrapper" ref={ref} style={{ height: '200px' }}>
      <svg width={dimensions.width} height={dimensions.height}>
        <g
          transform={`translate(${[
            dimensions.marginLeft,
            dimensions.marginRight,
          ].join(',')})`}
        >
          <rect
            width={dimensions.boundedWidth}
            height={dimensions.boundedHeight}
            fill="lavender"
          />
          <g
            transform={`translate(${[0, dimensions.boundedHeight].join(',')})`}
          >
            <Axis domain={xScale.domain()} range={xScale.range()} />
          </g>
        </g>
      </svg>
    </div>
  )
}

function useChartDimensions(dimensionsProp: Dimensions) {
  const ref = useRef()
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const dimensions = combineChartDimensions(dimensionsProp)

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      return
    }
    const element: SVGElement | undefined = ref.current

    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) {
        return
      }

      if (!entries.length) {
        return
      }

      const entry = entries[0]

      if (width != entry.contentRect.width) {
        setWidth(entry.contentRect.width)
      }

      if (height != entry.contentRect.height) {
        setHeight(entry.contentRect.height)
      }
    })

    element && resizeObserver.observe(element)
    return () => {
      if (element) {
        resizeObserver.unobserve(element)
      }
    }
  })

  const newDimensions = combineChartDimensions({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  })

  return { ref, dimensions: newDimensions }
}

function combineChartDimensions(dimensions: Dimensions): Dimensions {
  const parsedDimensions = {
    ...dimensions,
    marginTop: dimensions.marginTop || 10,
    marginRight: dimensions.marginRight || 10,
    marginBottom: dimensions.marginBottom || 40,
    marginLeft: dimensions.marginLeft || 75,
  }
  return {
    ...parsedDimensions,
    boundedHeight: Math.max(
      parsedDimensions.height -
        parsedDimensions.marginTop -
        parsedDimensions.marginBottom,
      0,
    ),
    boundedWidth: Math.max(
      parsedDimensions.width -
        parsedDimensions.marginLeft -
        parsedDimensions.marginRight,
      0,
    ),
  }
}
