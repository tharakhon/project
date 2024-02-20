import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Unstable_Grid2';
import Apple from '../src/image/a.jpg';
import hoe from '../src/image/จอบ.jpg';
import fertilizer from '../src/image/ปุ๋ย.png';
import banana from '../src/image/กล้วย.jpg';
import car from '../src/image/รถเกี่ยวข้าว.png';
import NavBarBank from './navBarBank';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { ReactSession } from 'react-client-session';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';


const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  borderRadius: 20,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(30),
    width: '35%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
  },
}));


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


export default function Bank() {
  const username = ReactSession.get("username");
  const codename = ReactSession.get("codename");
  const bank_name = ReactSession.get("bank_name");
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserInBank, setShowUserInBank] = useState([]);
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const productTypes = [
    'ทรัพยากรทั้งหมด',
    'ทรัพยากรเพื่อเช่าหรือยืม',
    'ทรัพยากรเพื่อการซื้อขาย',
    'ทรัพยากรเพื่อแลกเปลี่ยน',
    'สมาชิกทั้งหมด',
    'ทรัพยากรที่ทำรายการแล้ว',
  ];
  const handleNext = () => {
    navigate("/addproduct");
  }
  const handleNextListbank = () => {
    navigate("/listbank");
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpenBank = (id) => {
    ReactSession.set('username', username);
    ReactSession.set("id", id);
    ReactSession.set("codename", codename);
    ReactSession.set("bank_name", bank_name);
    navigate(`/openbank`);
  };


  useEffect(() => {

    Axios.get(`http://localhost:5000/showproduct/${username}`)
      .then((response) => {
        console.log("ข้อมูลที่ได้รับ:", response.data);

        if (Array.isArray(response.data)) {
          setResources(response.data);
        } else {
          console.error("Invalid response format. Expected an array.");
        }
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      });
  }, [username]);

  const filteredAndSearchedProducts = resources.filter((resource) =>
    (resource.product_name.toLowerCase().includes(searchInput.toLowerCase())) &&
    (value === 0 || (value === 1 && resource.product_type === 'ทรัพยากรเพื่อเช่าหรือยืม') || (value === 2 && resource.product_type2 === 'ทรัพยากรเพื่อการซื้อขาย') || (value === 3 && resource.product_type3 === 'ทรัพยากรเพื่อแลกเปลี่ยน'))
  );
  useEffect(() => {
    Axios.get(`http://localhost:5000/showUserInBank/${bank_name}`)
      .then((response) => {
        console.log("ข้อมูลที่ได้รับ:showUserInBank", response.data);

        if (Array.isArray(response.data)) {
          setShowUserInBank(response.data);
        } else {
          console.error("Invalid response format. Expected an array.");
        }
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      })

  }, []);
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <NavBarBank />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', marginTop: 10 }}>

          <List>
            {['ข้อมูลของธนาคาร'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton sx={{ backgroundColor: '#a2d2ff' }} onClick={handleNextListbank}>
                  <ListItemIcon>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500 }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderColor: 'divider', width: 200 }}
            >
              {productTypes.map((productType, index) => (
                <Tab label={productType} {...a11yProps(index)} key={index} />
              ))}
            </Tabs>
          </Box>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 10 }}>

        <DrawerHeader />
        {value !== 4 && (
          <>
            <Search sx={{ m: 2 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </Search>
            <Button variant="contained" color='error' sx={{ left: 1050, bottom: 35, borderRadius: 50 }} onClick={handleNext}>เพิ่มทรัพยากร</Button>
          </>
        )}
        {value === 4 && (
          <>
            {showUserInBank.length === 0 ? (
              <Typography variant="body1">ไม่มีสมาชิก</Typography>
            ) : (
              <Grid container spacing={2}>
                {showUserInBank.map((user) => (
                  <Grid item xs={3} key={user.id}>
                    <Card sx={{ maxWidth: 345, m: 1 }}>
                      <CardHeader
                        sx={{
                          display: 'flex',
                          flexDirection: 'row-reverse', // Move Avatar to the right
                          justifyContent: 'space-between', // Add space between Avatar and content
                          alignItems: 'center',
                          background: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)', // Customize background
                          color: 'white', // Customize text color
                        }}
                        avatar={
                          <Avatar
                            src={`http://localhost:5000/image/${user.rank_image}`}
                            alt=''
                            sx={{
                              backgroundColor: 'transparent', // Set a transparent background
                            }}
                          />
                        }
                      />
                      <CardMedia
                        component="img"
                        height="300"
                        image={user.image}
                        title="รูปภาพทรัพยากร"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {user.fullname}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          {`แรงค์ ${user.rank_name}`}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}

        {productTypes.map((productType, index) => (
          <TabPanel value={value} index={index} key={index}>
            <Grid container spacing={4}>
              {value === 0 ? (
                // Display all resources
                filteredAndSearchedProducts.map((resource) => (
                  <Grid item xs={3.75} key={resource.product_name}>
                    <Card sx={{ maxWidth: 345, m: 1 }} >
                      <CardMedia
                        component="img"
                        height="300"
                        image={`http://localhost:5000/image/${resource.product_image}`}
                        title="รูปภาพทรัพยากร"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {resource.product_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`จำนวนทรัพยากรที่เหลืออยู่ : ${resource.product_quantity} ${resource.product_unit}`}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={() => handleOpenBank(resource.product_id)}>
                          ดูทรัพยากร
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              ) : (
                // Display resources based on tab selection
                filteredAndSearchedProducts.
                  filter((resource) => {
                    if (value === 1) {
                      return resource.product_type === 'ทรัพยากรเพื่อเช่าหรือยืม';
                    } else if (value === 2) {
                      return resource.product_type2 === 'ทรัพยากรเพื่อการซื้อขาย';
                    } else if (value === 3) {
                      return resource.product_type3 === 'ทรัพยากรเพื่อแลกเปลี่ยน';
                    } else if (value === 4) {
                      // Handle 'สมาชิกทั้งหมด' based on your actual data structure
                      return true; // Placeholder, adjust as needed
                    } else if (value === 5) {
                      return resource.transactions.length > 0;
                    }
                    return false;
                  })
                  .map((resource) => (
                    <Grid key={resource.product_id} item xs={3.75}>
                      <Card sx={{ maxWidth: 345, m: 1 }}>
                        <CardMedia
                          component="img"
                          height="300"
                          image={`http://localhost:5000/image/${resource.product_image}`}
                          title="รูปภาพทรัพยากร"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {resource.product_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {`จำนวนทรัพยากรที่เหลืออยู่ : ${resource.product_quantity} ${resource.product_unit}`}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" onClick={() => handleOpenBank(resource.product_id)}>ดูทรัพยากร</Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))
              )}
            </Grid>
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
}