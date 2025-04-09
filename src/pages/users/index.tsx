// ** MUI Imports
// import Card from '@mui/material/Card'
// import Grid from '@mui/material/Grid'

// import Typography from '@mui/material/Typography'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'
import React, { useState, useEffect } from 'react'

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
import { Button, TextField } from '@mui/material'
import { Popup } from 'devextreme-react'

const Users = () => {
  const [userList, setUserList] = useState([])
  const [isPopup, setIspopup] = useState(false)
  const [userData, setUserData] = useState({
    user_name: '',
    user_sex: 0,
    user_age: 30
  })

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
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'users.xlsx')
      })
    })
  }

  const getUserList = async () => {
    console.log(process.env.NEXT_PUBLIC_API_URL + 'userirb/list')
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'userirb/list', {
      headers: { authorization: 'Bearer ' + 'fsdfsdfkljdklfjksldf' },
      method: 'GET'
    })

    if (response.status === 200) {
      response.json().then(jsonData => {
        setUserList(jsonData)
      })
    }
  }

  // const updateUserData = async () => {
  //   console.log(process.env.NEXT_PUBLIC_API_URL + 'userirb/update')
  //   console.log(userData)
  //   const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'userirb/update', {
  //     headers: { 'Content-Type': 'application/json' },
  //     method: 'PUT',
  //     body: JSON.stringify(userData)
  //   })

  //   if (response.status === 200) {
  //     response.json().then(jsonData => {
  //       console.log('jsonData')
  //       console.log(jsonData)

  //       setIspopup(false)
  //       getUserList()
  //     })
  //   }
  // }

  const createUserData = async () => {
    console.log(process.env.NEXT_PUBLIC_API_URL + 'userirb/create')
    console.log(userData)
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'userirb/create', {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(userData)
    })

    if (response.status === 200) {
      response.json().then(jsonData => {
        console.log('jsonData')
        console.log(jsonData)

        setIspopup(false)
        getUserList()
      })
    }
  }

  return (
    <>
      <h2>유저아이디를 이용하여 VR 컨텐츠에 로그인 하세요</h2>
      <Button
        variant='contained'
        onClick={() => {
          setUserData({ user_name: '', user_sex: 0, user_age: 30 })
          setIspopup(true)
        }}
      >
        사용자 추가
      </Button>
      {isPopup && (
        <Popup
          visible={isPopup}
          showTitle={true}
          title='사용자 추가'
          onVisibleChange={value => {
            setIspopup(value)
          }}
          width={600}
        >
          <TextField
            id='outlined-basic'
            label='사용자 이름'
            variant='outlined'
            fullWidth
            defaultValue={userData.user_name}
            onBlur={e => {
              setUserData({ ...userData, user_name: e.target.value })
              console.log(userData)
            }}
          />

          <Button
            variant='contained'
            fullWidth
            sx={{ marginTop: 5 }}
            onClick={() => {
              createUserData()
            }}
          >
            등록
          </Button>
        </Popup>
      )}
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
        <Column dataField='user_id' caption='유저아이디' />
        <Column dataField='user_name' caption='대상자이름' />
        <Column dataField='user_no' caption='대상자번호' />
        {/* <Column
        caption='성별'
        calculateCellValue={e => {
          if (e.user_sex) return '여성'
          else return '남성'
        }}
      /> */}
        {/* <Column dataField='user_height' caption='키' />
      <Column dataField='user_weight' caption='몸무게' /> */}
        {/* <Column dataField="userTelNoFormat" caption="전화번호2" /> */}
        {/* <Column dataField='user_bmi' caption='BMI' />
      <Column dataField='user_birth' caption='생년' />
      <Column dataField='user_age' caption='나이' />

      <Column dataField='user_tel' caption='전화(선택)' />
      <Column dataField='user_comment' caption='비고' /> */}
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
    </>
  )
}

export default Users
