import React from 'react';
import './profile.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSave
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Form,Col,Row} from 'react-bootstrap'
import {
  Typography,
  
  Avatar,
  Grid,
  Button,

  Box,

} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PublishIcon from '@material-ui/icons/Publish';
import {connect} from 'react-redux'
import {get} from 'lodash'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  forCenter:{
    display:'flex',alignItems:'center',
    flexDirection:'column',
    color:'#255852'
  },
  indicator:{backgroundColor:''},
  tab:{
    '&:focus':{
      outline:0
    }
  },
  containerAvatar:{
    width:'150px',
    height:'150px'
  },
  avatar:{
    width:'100%',
    height:'100%'
  }
});

function InfoUser({user}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [modeEdit,setModeEdit] = React.useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEnableEdit = () => {
    setModeEdit(!modeEdit)
    console.log(modeEdit)
  }

  return (
    <div className={classes.root}>
      
      <Grid container >
        <Grid item xs={12} className={classes.forCenter}>
          <div className={classes.containerAvatar}>
            <Avatar 
            alt={get(user,'displayName','')} 
            src={get(user,'avatar','')} 
              className={classes.avatar}
            />
          </div>
          <div>{get(user,'displayName')}</div>
          <label htmlFor="raised-button-file">
              <input
                accept="image/*"
                className={classes.input}
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
              />
              <Button
                variant="standard"
                fullWidth
                color="primary"
                component="span"
                style={{color:'#255852'}}
                className={classes.buttonAvatar}
              >
                <PublishIcon className={classes.uploadIcon} /> Cập nhật ảnh đại
                diện
              </Button>
            </label>
        </Grid>
        <Grid item xs={12} className={classes.forCenter}>
          <Tabs
            orientation="horizontal"
            TabIndicatorProps={{
                style: {backgroundColor:'#4aa112'}
              }}
            value={value}
            onChange={handleChange}
          >
            <Tab className={classes.tab} label="Cập nhật thông tin cá nhân"  {...a11yProps(0)} />
            <Tab className={classes.tab} label="Đổi mật khẩu" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0} style={{width:'80%'}} className='tabPabel'>
              {modeEdit ? 
              <span className='editButton' onClick={handleEnableEdit}>
                <FontAwesomeIcon
                icon={faSave}
                className={`icon-edit`}
                
                />Lưu
              </span>
              : 
              
              <span className='editButton' onClick={handleEnableEdit}>
                <FontAwesomeIcon
                icon={faEdit}
                className={`icon-edit`}
                
                />Chỉnh sửa thông tin
              </span>
              }
            <Form>
              <Form.Group as={Row} controlId="displayName">
                <Form.Label column sm="2">
                  Họ và tên
                </Form.Label>
                <Col sm="10">
                  <Form.Control disabled={!modeEdit}  type="text" defaultValue={get(user,'displayName')} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="email">
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="10">
                  <Form.Control disabled={!modeEdit}  type="text" defaultValue={get(user,'email')} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="email">
                <Form.Label column sm="2">
                  Giới tính
                </Form.Label>
                <Col sm="10">
                  <Form.Control as='select' disabled={!modeEdit}>
                    <option>Nam</option>
                    <option>Nữ</option>
                    <option>Khác</option>
                  </Form.Control>
                </Col>
              </Form.Group>
            </Form>
            
          </TabPanel>
          <TabPanel value={value} index={1} style={{width:'80%'}} className='tabPabel'>
            <Form style={{textAlign:'center'}}>
              <Form.Group as={Row} controlId="oldPassword">
                <Form.Label column sm="2">
                  Mật khẩu cũ
                </Form.Label>
                <Col sm="10">
                  <Form.Control  type="password"  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="newPassword">
                <Form.Label column sm="2">
                  Mật khẩu mới
                </Form.Label>
                <Col sm="10">
                  <Form.Control  type="password"  />
                </Col>
              </Form.Group>
              <Button variant='outlined' type="submit">Cập nhật</Button>
            </Form>
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
const mapStateToProps = state => ({
  user: get(state, "user")
});
export default connect(mapStateToProps,null)(InfoUser)