import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export default function Wip() {
  return <Circle />;
}

function Circle() {
  const [dataset, setDataset] = useState(generateDataset());

  const ref = useRef();

  useEffect(() => {
    const svgElement = d3.select(ref.current);

    svgElement
      .selectAll('circle')
      .data(dataset)
      .join('circle')
      .attr('cx', (d) => d[0])
      .attr('cy', (d) => d[1])
      .attr('r', 3);

    setInterval(() => {
      const newDataset = generateDataset();
      setDataset(newDataset);
    }, 2000);
  }, [dataset]);

  return <svg viewBox="0 0 100 50" ref={ref} />;
}

function generateDataset() {
  return Array(10)
    .fill(0)
    .map(() => [Math.random() * 80 + 10, Math.random() * 35 + 10]);
}
