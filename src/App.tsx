import { useEffect, useState } from 'react'
import axios from 'axios'

interface MetaData {
  [key: string]: string
}

interface TimeSeries {
  [date: string]: {
    [key: string]: string
  }
}

interface Data {
  metaData: MetaData
  timeSeries: TimeSeries
}

const App: React.FC = () => {
  const [data, setData] = useState<Data>({
    metaData: {},
    timeSeries: {}
  })

  // fetch data from api
  useEffect(() => {
    const fetchData = async () => {
      const url =
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo'
      const res = await axios.get(url)

      if (res.data) {
        const newObj: Data = {
          metaData: res.data['Meta Data'],
          timeSeries: res.data['Time Series (Daily)']
        }

        res && setData(newObj)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="flex flex-col gap-4 bg-slate-200 p-4">
      <div className="flex flex-col items-center">
        <h1 className="text-xl mb-4 font-bold">Meta Data</h1>
        <div className="flex flex-col items-center bg-indigo-400 text-white w-2/4 py-2 rounded-lg">
          {Object.entries(data.metaData).map((entry, i) => (
            <div key={i} className="flex gap-2 py-1">
              <h4>{entry[0]}:</h4>
              <p>{entry[1]}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full border-2 border-black my-4"></div>
      <div>
        <h1 className="text-center text-xl mb-4 font-bold">
          Daily Time Series
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          {Object.entries(data.timeSeries).map((entry, i) => (
            <div
              key={i}
              className="w-[23%] bg-indigo-400 text-white p-2 rounded-lg"
            >
              <h2 className="text-lg font-medium text-center my-4">
                {entry[0]}
              </h2>
              {Object.entries(entry[1]).map((e, i) => (
                <div key={i} className="flex gap-2 px-4 py-1">
                  <h4>{e[0]}:</h4>
                  <p>{e[1]}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
