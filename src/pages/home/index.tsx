// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

const Home = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='VR게임 에스와이이노테크 관리자 페이지'></CardHeader>
          <CardContent>
            <h2>사용자 List의 유저아이디(숫자)를 이용하여 VR 컨텐츠에 로그인 하세요</h2>
            {/* <Typography sx={{ mb: 2 }}>All the best for your new project.</Typography> */}
            <Typography>
              VR게임 에스와이이노테크과 관련자 임상데이터와 관리자 기능을 제공하는 사이트입니다. 현재 계속 개발
              진행중입니다.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* <Grid item xs={12}>
        <Card>
          <CardHeader title='ACL and JWT 🔒'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              Access Control (ACL) and Authentication (JWT) are the two main security features of our template and are
              implemented in the starter-kit as well.
            </Typography>
            <Typography>Please read our Authentication and ACL Documentations to get more out of them.</Typography>
          </CardContent>
        </Card>
      </Grid> */}
    </Grid>
  )
}

export default Home
