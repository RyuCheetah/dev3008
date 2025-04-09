// ** MUI Imports
// import Card from '@mui/material/Card'
// import Grid from '@mui/material/Grid'
// import Typography from '@mui/material/Typography'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'

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

const Games = () => {
  const [userList, setUserList] = useState([])
  useEffect(() => {
    getUserList()

    return
  }, [])

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
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'game.xlsx')
      })
    })
  }

  const getUserList = async () => {
    console.log(process.env.NEXT_PUBLIC_API_URL + 'game/list')
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'game/list', {
      method: 'GET'
    })

    if (response.status === 200) {
      response.json().then(jsonData => {
        setUserList(jsonData)
      })
    }
  }

  return (
    <DataGrid
      dataSource={userList}
      showBorders={true}
      showRowLines={true}
      columnAutoWidth={true}
      allowColumnReordering={true}
      rowAlternationEnabled={true}
      onExporting={onExporting}

      // useNative={false}
    >
      <Export enabled={true} />
      <Scrolling
        showScrollbar='always'

        // useNative={false}
      />
      <FilterRow visible={true} />
      <SearchPanel visible={true} />

      <Column dataField='game_id' caption='게임id' />
      <Column dataField='user_id' caption='유저id' />
      <Column dataField='user_no' caption='대상자번호' />
      <Column dataField='user_name' caption='대상자이름' />

      <Column dataField='game_table_name' caption='게임이름' />

      <Column
        dataField='game_start_date'
        calculateCellValue={e => {
          return moment(e.game_start_date).format('YYYY-MM-DD HH:mm:ss')
        }}
      />

      {/* <Column dataField='create_date' caption='생성일' /> */}

      {/* <ColumnChooser enabled={true} /> */}

      {/* <Column dataField="babyName" caption="아기이름" width={400} /> */}
    </DataGrid>
  )
}

export default Games
