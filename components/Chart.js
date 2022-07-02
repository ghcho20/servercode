import React, {
    useEffect,
    useRef,
    useState,
    useLayoutEffect
}  from 'react'
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

const Chart = ({ baseUrl, dashboardId }) => {
  const sdk = new ChartsEmbedSDK({ baseUrl: baseUrl })
  const chartDiv = useRef(null)
  const [width, setWidth] = useState(0)
  const [chartInst, setChartInst] = useState(null)

  useLayoutEffect(() => {
    setWidth(chartDiv.current.offsetWidth)
    if (width>0) {
        setChartInst(sdk.createDashboard({
            dashboardId: dashboardId,
            width: width, height: 500,
            theme: 'light'
        }))
    }
  }, [width])

  useEffect(async () => {
    if (chartInst) {
        await chartInst.render(chartDiv.current)
    }
  }, [chartInst])

  return (
        <div className="flex w-full justify-center items-center"
        ref={chartDiv} />
  )
}

export default Chart
