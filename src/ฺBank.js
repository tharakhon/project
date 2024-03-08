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
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from "@mui/material/FormGroup";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';

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

function Label({ componentName, isProOnly }) {
  const content = (
    <span>
      <strong>{componentName}</strong>
    </span>
  );

  if (isProOnly) {
    return (
      <Stack direction="row" spacing={0.5} component="span">
        <Tooltip title="Included on Pro package">
          <a href="https://mui.com/x/introduction/licensing/#pro-plan">
            <ProSpan />
          </a>
        </Tooltip>
        {content}
      </Stack>
    );
  }

  return content;
}
const ProSpan = styled('span')({
  display: 'inline-block',
  height: '1em',
  width: '1em',
  verticalAlign: 'middle',
  marginLeft: '0.3em',
  marginBottom: '0.08em',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
});
export default function Bank() {
  const username = ReactSession.get("username");
  const codename = ReactSession.get("codename");
  const bank_name = ReactSession.get("bank_name");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [borrowDate, setBorrowDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(dayjs());
  const [showUserInBank, setShowUserInBank] = useState([]);
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [openOrder, setOpenOrder] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredProductInbox, setFilteredProductInbox] = useState([]);
  const [orderExchange_borrowDate, setOrderExchange_borrowDate] = useState(dayjs());
  const [openNextDialog, setOpenNextDialog] = React.useState(false);
  const [openOrder1, setOpenOrder1] = React.useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const productTypes = [
    'ทรัพยากรทั้งหมด',
    'ทรัพยากรเพื่อเช่าหรือยืม',
    'ทรัพยากรเพื่อการซื้อขาย',
    'ทรัพยากรเพื่อแลกเปลี่ยน',
    'สมาชิกทั้งหมด',
    'ทรัพยากรที่ทำรายการแล้ว',
    'ทรัพยากรที่รอการตรวจสอบ',
  ];
  const handleClickOpen = (product) => () => {
    setSelectedProduct(product);
    setBorrowDate(dayjs(product.order_borrowDate));
    setReturnDate(dayjs(product.order_returnDate));
    setOpenOrder(true);
    setScroll('body');
  };

  const handleClickOpen1 = (product) => () => {
    setSelectedProducts(product);
    setOrderExchange_borrowDate(dayjs(product.orderExchange_borrowDate));
    setOpenOrder1(true);
    setScroll('body');
  };

  const handleClose = () => {
    setOpenOrder(false);
  };

  const handleClose1 = () => {
    setOpenOrder1(false);
    setOpenNextDialog(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openOrder) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openOrder]);

  const descriptionElementRefs = React.useRef(null);
  React.useEffect(() => {
    if (openOrder1) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openOrder1]);

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
  useEffect(() => {
    Axios.get(`http://localhost:5000/notifications_bank/${bank_name}`)
      .then((response) => {
        console.log("ข้อมูลที่ได้รับ:", response.data);
        const fetchedProducts = response.data.map((item) => ({
          order_id: item.order_id,
          bank_name: item.bank_name,
          fullname: item.fullname,
          image: item.image,
          bank_image: item.bank_image,
          order_borrowDate: dayjs(item.order_borrowDate),
          order_returnDate: dayjs(item.order_returnDate),
          order_quantity: item.order_quantity,
          order_status: item.order_status,
          product_image: item.product_image,
          product_name: item.product_name,
          product_quantity: item.product_quantity,
          product_type: item.product_type,
          product_type2: item.product_type2,
          product_type3: item.product_type3,
          product_type4: item.product_type4,
          product_unit: item.product_unit,
          order_rental: item.order_rental,
          order_date: dayjs(item.order_date)
        }));

        setFilteredProducts(fetchedProducts);

      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      })

  }, [bank_name, filteredProducts]);
  const handleUpdate = (status) => {
    if (!selectedProduct) {
      console.error("Selected product not found");
      return;
    }
    Axios.put(`http://localhost:5000/updateStatus/${selectedProduct.order_id}`, {
      order_status: status,
    })
      .then((response) => {
        console.log("ข้อมูลที่ถูกอัปเดต:", response.data);
        setFilteredProducts((prevProducts) => {
          return prevProducts.map((item) =>
            item.order_id === selectedProduct.order_id ? response.data : item
          );
        });
        handleClose();
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
      });

  };

  const handleUpdate1 = (status) => {
    if (!selectedProducts) {
      console.error("Selected product not found");
      return;
    }
    Axios.put(`http://localhost:5000/updateStatus1/${selectedProducts.orderExchange_id}`, {
      userbank_status: status,
    })
      .then((response) => {
        console.log("ข้อมูลที่ถูกอัปเดต:", response.data);
        setFilteredProductInbox((prevProducts) => {
          return prevProducts.map((item) =>
            item.orderExchange_id === selectedProducts.orderExchange_id ? response.data : item
          );
        });
        handleClose1();
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
      });
  };


  useEffect(() => {
    Axios.get(`http://localhost:5000/notifications_bank1/${bank_name}`)
      .then((response) => {
        console.log("ข้อมูลที่ได้รับ:", response.data);
        const fetchedProduct = response.data.map((item) => ({
          orderExchange_id: item.orderExchange_id,
          bank_name: item.bank_name,
          fullname: item.fullname,
          image: item.image,
          product_name: item.product_name,
          product_image: item.product_image,
          product_type: item.product_type,
          product_type2: item.product_type2,
          product_type3: item.product_type3,
          product_type4: item.product_type4,
          product_unit: item.product_unit,
          product_details: item.product_details,
          orderExchange_borrowDate: dayjs(item.orderExchange_borrowDate),
          orderExchange_quantity: item.orderExchange_quantity,
          userbank_status: item.userbank_status,
          userbank_productname: item.userbank_productname,
          userbank_productimage: item.userbank_productimage,
          userbank_producttype1: item.userbank_producttype1,
          userbank_productquantity: item.userbank_productquantity,
          userbank_unit: item.userbank_unit,
          userbank_productdetails: item.userbank_productdetails,
          order_exchange: item.order_exchange,
          exchange_date: dayjs(item.exchange_date)
        }));

        setFilteredProductInbox(fetchedProduct);

      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      })

  }, [bank_name, filteredProductInbox]);
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
              sx={{ borderColor: 'divider', width: 240 }}
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
        {value !== 4 && value !== 5 && value !== 6 && (
          <>
            <Search sx={{ m: 2 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Products"
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
        {value === 5 && (
          <>
            <Grid container spacing={2} style={{ width: '95%', margin: 0 }}>
              {filteredProducts.length > 0 ? (
                <>
                  {filteredProducts.map((item) => (
                    item.order_status !== 'รอการตรวจสอบ' && (
                      <Grid item key={item.order_id} xs={12}>
                        <Card sx={{ display: 'flex', height: '100%', width: '100%' }}>
                          <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={item.image}
                            alt="รูป user"
                          />
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                              <Typography component="div" variant="h5">
                                {item.fullname}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                ได้ทำรายการของ ธนาคาร : {item.bank_name}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                สถานะปัจจุบัน : {item.order_status}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                สถานะการทำรายการ : {item.order_rental}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                เวลาที่ทำรายการ : {dayjs(item.order_date).format("DD-MM-YYYY HH:mm:ss")}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button onClick={handleClickOpen(item)} size="medium">เปิดอ่าน</Button>
                            </CardActions>
                          </Box>
                        </Card>
                      </Grid>
                    )
                  ))}
                </>
              ) : (
                <p>ไม่มีรายการที่ทำรายการแล้ว</p>
              )}
            </Grid>
            <Grid container spacing={2} style={{ width: '95%', margin: 0 }}>
              {filteredProductInbox.length > 0 ? (
                <>
                  {filteredProductInbox.map((item) => (
                    item.userbank_status !== 'รอการตรวจสอบ' && (
                      <Grid item key={item.orderExchange_id} xs={12}>
                        <Card sx={{ display: 'flex', height: '100%', width: '100%' }}>
                          <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={item.image}
                            alt="รูป user"
                          />
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                              <Typography component="div" variant="h5">
                                {item.fullname}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                ได้ทำรายการของ ธนาคาร : {item.bank_name}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                สถานะปัจจุบัน : {item.userbank_status}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                สถานะการทำรายการ : {item.order_exchange}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                เวลาที่ทำรายการ : {dayjs(item.exchange_date).format("DD-MM-YYYY HH:mm:ss")}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button onClick={handleClickOpen1(item)} size="medium">เปิดอ่าน</Button>
                            </CardActions>
                          </Box>
                        </Card>
                      </Grid>
                    )
                  ))}
                </>
              ) : (
                <p>filteredProductInbox is not an array.</p>
              )}
            </Grid>
          </>
        )}
        {value === 6 && (
          <>
            <Grid container spacing={2} style={{ width: '95%', margin: 0 }}>
              {filteredProducts.length > 0 ? (
                <>
                  {filteredProducts.map((item) => (
                    item.order_status === 'รอการตรวจสอบ' && (
                      <Grid item key={item.order_id} xs={12}>
                        <Card sx={{ display: 'flex', height: '100%', width: '100%' }}>
                          <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={item.image}
                            alt="รูป user"
                          />
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                              <Typography component="div" variant="h5">
                                {item.fullname}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                ได้ทำรายการของ ธนาคาร : {item.bank_name}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                สถานะปัจจุบัน : {item.order_status}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                สถานะการทำรายการ : {item.order_rental}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                เวลาที่ทำรายการ : {dayjs(item.order_date).format("DD-MM-YYYY HH:mm:ss")}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button onClick={handleClickOpen(item)} size="medium">เปิดอ่าน</Button>
                            </CardActions>
                          </Box>
                        </Card>
                      </Grid>
                    )
                  ))}
                </>
              ) : (
                <p>ไม่มีรายการที่รอการตรวจสอบ</p>
              )}
            </Grid>
            <Grid container spacing={2} style={{ width: '95%', margin: 0 }}>
              {filteredProductInbox.length > 0 ? (
                <>
                  {filteredProductInbox.map((item) => (
                    item.userbank_status === 'รอการตรวจสอบ' && (
                      <Grid item key={item.orderExchange_id} xs={12}>
                        <Card sx={{ display: 'flex', height: '100%', width: '100%' }}>
                          <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={item.image}
                            alt="รูป user"
                          />
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                              <Typography component="div" variant="h5">
                                {item.fullname}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                ได้ทำรายการของ ธนาคาร : {item.bank_name}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                สถานะปัจจุบัน : {item.userbank_status}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                สถานะการทำรายการ : {item.order_exchange}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                เวลาที่ทำรายการ : {dayjs(item.exchange_date).format("DD-MM-YYYY HH:mm:ss")}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button onClick={handleClickOpen1(item)} size="medium">เปิดอ่าน</Button>
                            </CardActions>
                          </Box>
                        </Card>
                      </Grid>
                    )
                  ))}
                </>
              ) : (
                <p>filteredProductInbox is not an array.</p>
              )}
            </Grid>
          </>
        )}

        <Dialog
          open={openOrder}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "center" }}>รายการที่ {selectedProduct ? selectedProduct.fullname : 'N/A'} ได้ทำรายการ</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              {selectedProduct ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card sx={{ maxWidth: 345, m: 1 }} >
                      <CardMedia
                        component="img"
                        height="300"
                        image={`http://localhost:5000/image/${selectedProduct.product_image}`}
                        title="รูปภาพทรัพยากร"
                      />
                    </Card>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                    <div style={{ marginTop: 50 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                      <TextField disabled id="outlined-disabled" label={selectedProduct.product_name} variant="outlined" sx={{ width: '50ch' }} />
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                      ></Box>
                      <FormLabel component="legend" style={{ color: 'black' }}>ประเภททรัพยากรทางการเกษตร:</FormLabel>
                      <TextField disabled id="outlined-disabled" label={selectedProduct.product_type4} variant="outlined" sx={{ width: '50ch' }} />

                    </div>
                    <div style={{ marginTop: 30 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>สถานะการทำรายการ : </FormLabel>
                      <TextField disabled id="outlined-disabled" label={`${selectedProduct.order_rental}`} variant="outlined" sx={{ width: '50ch' }} />
                    </div>
                    <div style={{ marginTop: 30 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากรที่ต้องการทำรายการ : </FormLabel>
                      <TextField disabled id="outlined-disabled" label={`${selectedProduct.order_quantity} ${selectedProduct.product_unit}`} variant="outlined" sx={{ width: '50ch' }} />
                    </div>
                    <div >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={[
                            'DatePicker',
                          ]}
                          sx={{ width: '50ch', marginTop: 3 }}
                        >
                          <DemoItem label={<Label componentName="วันที่จะมารับทรัพยากร" valueType="date" />} >
                            <DatePicker
                              disabled
                              value={borrowDate}
                              renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                    <div >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={[
                            'DatePicker',
                          ]}
                          sx={{ width: '50ch', marginTop: 3 }}
                        >
                          <DemoItem label={<Label componentName="วันที่จะนำทรัพยากรมาคืน" valueType="date" />} >
                            <DatePicker
                              disabled
                              value={returnDate}
                              renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                  </div>
                </>
              ) : (
                <p>Details not found.</p>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-around' }}>
            <Button onClick={() => handleUpdate('ไม่อนุมัติให้ทำรายการ')} color='error'>ไม่อนุมัติให้ทำรายการ</Button>
            <Button onClick={() => handleUpdate('อนุมัติให้ทำรายการ')} >อนุมัติให้ทำรายการ</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openOrder1}
          onClose={() => setOpenNextDialog(false)}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "center" }}>รายการที่ {selectedProducts ? selectedProducts.fullname : 'N/A'} ได้ทำรายการ</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRefs}
              tabIndex={-1}
            >
              {selectedProducts ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card sx={{ maxWidth: 345, m: 1 }} >
                      <CardMedia
                        component="img"
                        height="300"
                        image={`http://localhost:5000/image/${selectedProducts.product_image}`}
                        title="รูปภาพทรัพยากร"
                      />
                    </Card>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                    <div style={{ marginTop: 50 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                      <TextField disabled id="outlined-disabled" label={selectedProducts.product_name} variant="outlined" sx={{ width: '50ch' }} />
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                      ></Box>
                      <FormLabel component="legend" style={{ color: 'black' }}>ประเภททรัพยากรทางการเกษตร:</FormLabel>
                      <TextField disabled id="outlined-disabled" label={selectedProducts.product_type4} variant="outlined" sx={{ width: '50ch' }} />

                    </div>
                    <div style={{ marginTop: 30 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>สถานะการทำรายการ : </FormLabel>
                      <TextField disabled id="outlined-disabled" label={`${selectedProducts.order_exchange}`} variant="outlined" sx={{ width: '50ch' }} />
                    </div>
                    <div style={{ marginTop: 30 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากรที่ต้องการทำรายการ : </FormLabel>
                      <TextField disabled id="outlined-disabled" label={`${selectedProducts.orderExchange_quantity} ${selectedProducts.product_unit}`} variant="outlined" sx={{ width: '50ch' }} />
                    </div>
                    <div >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={[
                            'DatePicker',
                          ]}
                          sx={{ width: '50ch', marginTop: 3 }}
                        >
                          <DemoItem label={<Label componentName="วันที่จะมารับทรัพยากร :" valueType="date" />} >
                            <DatePicker
                              disabled
                              value={orderExchange_borrowDate}
                              renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                  </div>
                </>
              ) : (
                <p>Details not found.</p>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-around' }}>
            <Button onClick={() => handleClose1()} color='error'>ปิด</Button>
            <Button onClick={() => setOpenNextDialog(true)} >ถัดไป</Button>
          </DialogActions>
        </Dialog>


        <Dialog
          open={openNextDialog}
          onClose={handleClose1}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "center" }}>รายการที่ {selectedProducts ? selectedProducts.fullname : 'N/A'} จะนำมาแลกเปลี่ยน</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRefs}
              tabIndex={-1}
            >
              {selectedProducts ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card sx={{ maxWidth: 345, m: 1 }} >
                      <CardMedia
                        component="img"
                        height="300"
                        image={`http://localhost:5000/image/${selectedProducts.userbank_productimage}`}
                        title="รูปภาพทรัพยากร"
                      />
                    </Card>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                    <div style={{ marginTop: 50 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                      <TextField disabled id="outlined-disabled" label={selectedProducts.userbank_productname} variant="outlined" sx={{ width: '50ch' }} />
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                      ></Box>
                      <FormLabel component="legend" style={{ color: 'black' }}>ประเภททรัพยากรทางการเกษตร:</FormLabel>
                      <TextField disabled id="outlined-disabled" label={selectedProducts.userbank_producttype1} variant="outlined" sx={{ width: '50ch' }} />

                    </div>

                    <div style={{ marginTop: 30 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากรที่ต้องการทำรายการ : </FormLabel>
                      <TextField disabled id="outlined-disabled" label={`${selectedProducts.userbank_productquantity} ${selectedProducts.userbank_unit}`} variant="outlined" sx={{ width: '50ch' }} />
                    </div>
                  </div>
                </>
              ) : (
                <p>Details not found.</p>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-around' }}>
            <Button onClick={() => handleUpdate1('ไม่อนุมัติให้ทำรายการ')} color='error'>ไม่อนุมัติให้ทำรายการ</Button>
            <Button onClick={() => handleUpdate1('อนุมัติให้ทำรายการ')} >อนุมัติให้ทำรายการ</Button>
          </DialogActions>
        </Dialog>


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
                    else if (value === 6) {
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