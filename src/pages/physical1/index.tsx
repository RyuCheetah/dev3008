// ** MUI Imports
// import Card from '@mui/material/Card'
// import Grid from '@mui/material/Grid'

// import Typography from '@mui/material/Typography'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'

import Papa from 'papaparse'
import React, { useState, useEffect } from 'react'

// import CsvDownloadButton from '@types/react-json-to-csv'
import DataGrid, {
  Column,

  // ColumnChooser,
  FilterRow,
  SearchPanel,
  Scrolling

  // MasterDetail
} from 'devextreme-react/data-grid'
import moment from 'moment'

// import { json } from 'stream/consumers'

const Users = () => {
  const [userList, setUserList] = useState<any[]>([])

  // const [CSVData, setCSVData] = useState()
  // const [parsedString, setParsedString] = useState()

  // const [json, setJson] = useState([])
  // const [unparsedString, setUnparsedString] = useState('')
  useEffect(() => {
    getUserList()

    return
  }, [])

  const getUserList = async () => {
    console.log(process.env.NEXT_PUBLIC_API_URL + 'physical1/list')
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'physical1/list', {
      method: 'GET'
    })

    if (response.status === 200) {
      response.json().then(jsonData => {
        setUserList(jsonData)
      })
    }
  }

  // const commonConfig = { delimiter: ',' }

  const downloadTxtFile = async (data: BlobPart) => {
    const element = document.createElement('a')
    const file = new Blob([data], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'angle.csv'
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  return (
    <DataGrid
      dataSource={userList}
      showBorders={true}
      showRowLines={true}
      columnAutoWidth={true}
      allowColumnReordering={true}
      rowAlternationEnabled={true}
      onCellClick={data => {
        console.log(data.column.caption)

        if (data.column.caption == '딥다왼쪽data') {
          const jsonData = data.row.data.realtime_left_angle

          // setUnparsedString(Papa.unparse(jsonData))

          const csv = Papa.unparse(jsonData)

          downloadTxtFile(csv)
        }

        if (data.column.caption == '딥다오른쪽data') {
          const jsonData = data.row.data.realtime_right_angle

          // setUnparsedString(Papa.unparse(jsonData))

          const csv = Papa.unparse(jsonData)

          downloadTxtFile(csv)
        }
      }}

      // useNative={false}
    >
      <Scrolling
        showScrollbar='always'

        // useNative={false}
      />
      <FilterRow visible={true} />
      <SearchPanel visible={true} />
      <Column dataField='id' caption='id' />
      <Column dataField='user_id' caption='유저 id' /> <Column dataField='user.user_name' caption='유저이름' />
      <Column dataField='user.user_no' caption='대상자번호' />
      <Column dataField='game_id' caption='게임 id' />
      <Column
        caption='딥다왼쪽data'
        cellRender={() => {
          return <>다운로드</>
        }}
      />
      <Column
        caption='딥다오른쪽data'
        cellRender={() => {
          return <>다운로드</>
        }}
      />
      <Column
        dataField='create_date'
        caption='생성일'
        calculateCellValue={e => {
          return moment(e.create_date).format('YYYY-MM-DD HH:mm:ss')
        }}
      />
      {/* <ColumnChooser enabled={true} /> */}
      {/* <Column dataField="babyName" caption="아기이름" width={400} /> */}
    </DataGrid>
  )
}

export default Users
