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
  Scrolling,
  Export

  // MasterDetail
} from 'devextreme-react/data-grid'
import { exportDataGrid } from 'devextreme/excel_exporter'
import moment from 'moment'
import { Workbook } from 'exceljs'
import saveAs from 'file-saver'

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
    console.log(process.env.NEXT_PUBLIC_API_URL + 'content6/listApp')
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'content6/listApp', {
      method: 'GET'
    })

    if (response.status === 200) {
      response.json().then(jsonData => {
        setUserList(jsonData)
      })
    }
  }

  const onExporting = (e: { component: any }) => {
    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet('sheet1')
    exportDataGrid({
      component: e.component,
      worksheet: worksheet,
      customizeCell: function (options) {
        options.excelCell.font = { name: 'Arial', size: 12 }
        options.excelCell.alignment = { horizontal: 'left' }
      }
    }).then(function () {
      workbook.xlsx.writeBuffer().then(function (buffer) {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'content6.xlsx')
      })
    })
  }

  // const commonConfig = { delimiter: ',' }

  const downloadTxtFile = async (data: BlobPart, filename: string) => {
    const element = document.createElement('a')
    const file = new Blob([data], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = filename
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  const getDataOne = async (id: string, attributes: string) => {
    console.log(process.env.NEXT_PUBLIC_API_URL + 'content6/findData')
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + 'content6/findData?id=' + id + '&attributes=' + attributes,
      {
        method: 'GET'
      }
    )

    if (response.status === 200) {
      response.json().then(jsonData => {
        if (jsonData[attributes] != null) {
          const csv = Papa.unparse(jsonData[attributes])
          alert('다운로드가 시작됩니다.')
          downloadTxtFile(csv, attributes + '.csv')
        } else {
          alert('data가 없습니다.')
        }
      })
    } else {
      return null
    }
  }

  //    form.AddField("user_id", participantid);
  //    form.AddField("game_id", game_id);
  //    form.AddField("game_level", game_level);
  //    form.AddField("fail_count", fail_count);
  //    form.AddField("success_count", success_count);
  //    form.AddField("success_percentage", success_percentage);
  //    form.AddField("play_time", playertime);
  //    form.AddField("score", score);
  //    form.AddField("hmd_list", hmd_list);
  //    form.AddField("con_list", con_list);
  //    form.AddField("con_list2", con_list2);

  return (
    <DataGrid
      dataSource={userList}
      showBorders={true}
      showRowLines={true}
      columnAutoWidth={true}
      allowColumnReordering={true}
      rowAlternationEnabled={true}
      onExporting={onExporting}
      onCellClick={async data => {
        console.log(data.column.caption)

        if (data.column.caption == 'HMD list') {
          await getDataOne(data.row.data.id, 'hmd_list')

          // setUnparsedString(Papa.unparse(jsonData))
        }

        if (data.column.caption == 'Con list') {
          await getDataOne(data.row.data.id, 'con_list')
        }

        if (data.column.caption == 'Con list2') {
          await getDataOne(data.row.data.id, 'con_list2')
        }
      }}

      // useNative={false}
    >
      <Export enabled={true} />
      <Scrolling
        showScrollbar='always'

        // useNative={false}
      />
      <FilterRow visible={true} />
      <SearchPanel visible={true} />
      <Column dataField='id' caption='id' />
      <Column caption='게임명' calculateCellValue={() => '팔각정 섞어주스'} />
      <Column dataField='user_id' caption='유저 id' /> <Column dataField='user.user_name' caption='유저이름' />
      <Column dataField='user.user_no' caption='대상자번호' />
      <Column dataField='game_id' caption='게임 id' />
      <Column dataField='fail_count' caption='실패횟수' />
      <Column dataField='success_count' caption='성공횟수' />
      <Column dataField='success_percentage' caption='성공률' />
      {/* <Column dataField='play_time' caption='play_time' /> */}
      <Column dataField='score' caption='score' />
      <Column
        dataField='play_time'
        caption='play_time'
        calculateCellValue={e => {
          return e.play_time + '초'
        }}
      />
      <Column dataField='game_level' caption='game_level' />
      <Column
        caption='HMD list'
        cellRender={() => {
          return (
            <>
              <div>다운로드</div>
            </>
          )
        }}
      />
      <Column
        caption='Con list'
        cellRender={() => {
          return (
            <>
              <div>다운로드</div>
            </>
          )
        }}
      />
      <Column
        caption='Con list2'
        cellRender={() => {
          return (
            <>
              <div>다운로드</div>
            </>
          )
        }}
      />
      {/* <Column
        caption='con_ ist2'
        cellRender={() => {
          return <>다운로드</>
        }}
      /> */}
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
