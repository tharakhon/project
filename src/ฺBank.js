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
import StarRateSharpIcon from '@mui/icons-material/StarRateSharp';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating'
import Swal from 'sweetalert2';
import {  InputLabel,MenuItem, Select } from "@mui/material";

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

function getLabelText(value) {
  return `${value}`;
}
export default function Bank() {
  const username = ReactSession.get('username');
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
  const [filteredProductInbox1, setFilteredProductInbox1] = useState([]);
  const [orderExchange_borrowDate, setOrderExchange_borrowDate] = useState(dayjs());
  const [orderSale_borrowDate, setOrderSale_borrowDate] = useState(dayjs());
  const [openNextDialog, setOpenNextDialog] = React.useState(false);
  const [openOrder1, setOpenOrder1] = React.useState(false);
  const [openOrder2, setOpenOrder2] = React.useState(false);
  const [openOrderApproved, setOpenOrderApproved] = React.useState(false);
  const [openOrderApproved1, setOpenOrderApproved1] = React.useState(false);
  const [openOrderApproved2, setOpenOrderApproved2] = React.useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [selectedProductss, setSelectedProductss] = useState(null);
  const [selectedProductApproved, setSelectedProductApproved] = useState(null);
  const [selectedProductApproved1, setSelectedProductApproved1] = useState(null);
  const [selectedProductApproved2, setSelectedProductApproved2] = useState(null);
  const [openNextDialogApproved, setOpenNextDialogApproved] = React.useState(false);
  const [reviews, setReviews] = useState([]);
  const [star, setStar] = React.useState('');
  console.log(reviews)
  const productTypes = [
    'ทรัพยากรทั้งหมด',
    'ทรัพยากรเพื่อเช่าหรือยืม',
    'ทรัพยากรเพื่อการซื้อขาย',
    'ทรัพยากรเพื่อแลกเปลี่ยน',
    'สมาชิกทั้งหมด',
    'ทรัพยากรที่ทำรายการแล้ว',
    'ทรัพยากรที่รอการตรวจสอบ',
  ];

  const handleOpenReviewsDialog = (product) => {
    if (product) {
      Axios.get(`http://localhost:5000/showReview/${product.product_id}`)
        .then((response) => {
          console.log("ข้อมูลรีวิวที่ได้รับ:", response.data);

          if (Array.isArray(response.data)) {
            const sortedReviews = response.data.sort((a, b) => {
              const timestampA = new Date(a.date).getTime();
              const timestampB = new Date(b.date).getTime();
              return timestampB - timestampA;
            });
  
            setReviews(sortedReviews);
          } else {
            Swal.fire({
              icon: 'info',
              title: 'ไม่พบรีวิว',
              text: 'ยังไม่มีรีวิวสำหรับทรัพยากรนี้',
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถดึงข้อมูลรีวิวได้ในขณะนี้',
          });
        });
    }
  };
  const handleCloseReviewsDialog = () => {
    setReviews([]); // เคลียร์ข้อมูลรีวิวเมื่อปิด dialog
  };
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

  const handleClickOpen2 = (product) => () => {
    setSelectedProductss(product);
    setOrderSale_borrowDate(dayjs(product.order_product_date));
    setOpenOrder2(true);
    setScroll('body');
  };

  const handleClickOpenApproved = (product) => () => {
    setSelectedProductApproved(product);
    setBorrowDate(dayjs(product.order_borrowDate));
    setReturnDate(dayjs(product.order_returnDate));
    setOpenOrderApproved(true);
    setScroll('body');
  };

  const handleClickOpenApproved1 = (product) => () => {
    setSelectedProductApproved1(product);
    setOrderExchange_borrowDate(dayjs(product.orderExchange_borrowDate));
    setOpenOrderApproved1(true);
    setScroll('body');
  };

  const handleClickOpenApproved2 = (product) => () => {
    setSelectedProductApproved2(product);
    setOrderSale_borrowDate(dayjs(product.order_product_date));
    setOpenOrderApproved2(true);
    setScroll('body');
  };

  const handleClose = () => {
    setOpenOrder(false);
  };

  const handleClose1 = () => {
    setOpenOrder1(false);
    setOpenNextDialog(false);
  };

  const handleClose2 = () => {
    setOpenOrder2(false);
  };

  const handleCloseApproved = () => {
    setOpenOrderApproved(false);
  };

  const handleCloseApproved1 = () => {
    setOpenOrderApproved1(false);
    setOpenNextDialogApproved(false);
  };

  const handleCloseApproved2 = () => {
    setOpenOrderApproved2(false);
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

  const descriptionElementRefss = React.useRef(null);
  React.useEffect(() => {
    if (openOrder2) {
      const { current: descriptionElement } = descriptionElementRefss;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openOrder2]);

  const descriptionElementRefApproved = React.useRef(null);
  React.useEffect(() => {
    if (openOrderApproved) {
      const { current: descriptionElement } = descriptionElementRefApproved;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openOrderApproved]);

  const descriptionElementRefApproved1 = React.useRef(null);
  React.useEffect(() => {
    if (openOrderApproved1) {
      const { current: descriptionElement } = descriptionElementRefApproved1;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openOrderApproved1]);

  const descriptionElementRefApproved2 = React.useRef(null);
  React.useEffect(() => {
    if (openOrderApproved2) {
      const { current: descriptionElement } = descriptionElementRefApproved2;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openOrderApproved2]);

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

  const handleUpdate = (status) => {
    if (!selectedProduct) {
      console.error("Selected product not found");
      return;
    }

    handleClose();

    Swal.fire({
      icon: 'warning',
      title: 'คุณแน่ใจหรือไม่?',
      text: `คุณต้องการอัปเดตสถานะเป็น "${status}" หรือไม่?`,
      showCancelButton: true,
      confirmButtonText: 'ใช่, อัปเดตสถานะ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.put(`http://localhost:5000/updateStatus/${selectedProduct.order_request_id}`, {
          order_status: status,
        })
          .then((response) => {
            console.log("ข้อมูลที่ถูกอัปเดต:", response.data);
            setFilteredProducts((prevProducts) => {
              return prevProducts.map((item) =>
                item.order_request_id === selectedProduct.order_request_id ? response.data : item
              );
            });
            Swal.fire({
              icon: 'success',
              title: 'อัปเดตสถานะสำเร็จ',
              text: `สถานะได้ถูกอัปเดตเป็น "${status}" เรียบร้อยแล้ว`
            });
          })
          .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'ไม่สามารถอัปเดตสถานะได้ โปรดลองอีกครั้งในภายหลัง'
            });
          });
      }
    });

  };

  const handleUpdate1 = (status) => {
    if (!selectedProducts) {
      console.error("Selected product not found");
      return;
    }
    handleClose1();

    Swal.fire({
      icon: 'warning',
      title: 'คุณแน่ใจหรือไม่?',
      text: `คุณต้องการอัปเดตสถานะเป็น "${status}" หรือไม่?`,
      showCancelButton: true,
      confirmButtonText: 'ใช่, อัปเดตสถานะ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.put(`http://localhost:5000/updateStatus1/${selectedProducts.exchange_id}`, {
          userbank_status: status,
        })
          .then((response) => {
            console.log("ข้อมูลที่ถูกอัปเดต:", response.data);
            setFilteredProductInbox((prevProducts) => {
              return prevProducts.map((item) =>
                item.exchange_id === selectedProducts.exchange_id ? response.data : item
              );
            });
            Swal.fire({
              icon: 'success',
              title: 'อัปเดตสถานะสำเร็จ',
              text: `สถานะได้ถูกอัปเดตเป็น "${status}" เรียบร้อยแล้ว`
            });
          })
          .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'ไม่สามารถอัปเดตสถานะได้ โปรดลองอีกครั้งในภายหลัง'
            });
          });
      }
    });
  };

  const handleUpdate2 = (status) => {
    if (!selectedProductss) {
      console.error("Selected product not found");
      return;
    }
    handleClose2();

    Swal.fire({
      icon: 'warning',
      title: 'คุณแน่ใจหรือไม่?',
      text: `คุณต้องการอัปเดตสถานะเป็น "${status}" หรือไม่?`,
      showCancelButton: true,
      confirmButtonText: 'ใช่, อัปเดตสถานะ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.put(`http://localhost:5000/updateStatus2/${selectedProductss.order_sale_id}`, {
          order_product_status: status,
        })
          .then((response) => {
            console.log("ข้อมูลที่ถูกอัปเดต:", response.data);
            setFilteredProductInbox1((prevProducts) => {
              return prevProducts.map((item) =>
                item.order_sale_id === selectedProductss.order_sale_id ? response.data : item
              );
            });
            Swal.fire({
              icon: 'success',
              title: 'อัปเดตสถานะสำเร็จ',
              text: `สถานะได้ถูกอัปเดตเป็น "${status}" เรียบร้อยแล้ว`
            });
          })
          .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'ไม่สามารถอัปเดตสถานะได้ โปรดลองอีกครั้งในภายหลัง'
            });
          });
      }
    });

  };

  const handleClicktoUpdateGetProduct = (status) => {
    if (!selectedProductApproved) {
      console.error("Selected product not found");
      return;
    }

    handleCloseApproved();

    Swal.fire({
      icon: 'warning',
      title: 'คุณแน่ใจหรือไม่?',
      text: `คุณต้องการอัปเดตสถานะเป็น "${status}" หรือไม่?`,
      showCancelButton: true,
      confirmButtonText: 'ใช่, อัปเดตสถานะ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.put(`http://localhost:5000/updateStatusGetproduct/${selectedProductApproved.order_request_id}`, {
          order_status_getproduct: status,
        })
          .then((response) => {
            console.log("ข้อมูลที่ถูกอัปเดต:", response.data);
            setFilteredProducts((prevProducts) => {
              return prevProducts.map((item) =>
                item.order_request_id === selectedProductApproved.order_request_id ? response.data : item
              );
            });
            Swal.fire({
              icon: 'success',
              title: 'อัปเดตสถานะสำเร็จ',
              text: `สถานะได้ถูกอัปเดตเป็น "${status}" เรียบร้อยแล้ว`
            });
          })
          .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'ไม่สามารถอัปเดตสถานะได้ โปรดลองอีกครั้งในภายหลัง'
            });
          });
      }
    });

  };

  const handleClicktoUpdateGetProduct1 = (status) => {
    if (!selectedProductApproved1) {
      console.error("Selected product not found");
      return;
    }
    handleCloseApproved1();

    Swal.fire({
      icon: 'warning',
      title: 'คุณแน่ใจหรือไม่?',
      text: `คุณต้องการอัปเดตสถานะเป็น "${status}" หรือไม่?`,
      showCancelButton: true,
      confirmButtonText: 'ใช่, อัปเดตสถานะ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.put(`http://localhost:5000/updateStatusGetproduct1/${selectedProductApproved1.exchange_id}`, {
          userbank_status_getproduct: status,
        })
          .then((response) => {
            console.log("ข้อมูลที่ถูกอัปเดต:", response.data);
            setFilteredProductInbox((prevProducts) => {
              return prevProducts.map((item) =>
                item.exchange_id === selectedProductApproved1.exchange_id ? response.data : item
              );
            });
            Swal.fire({
              icon: 'success',
              title: 'อัปเดตสถานะสำเร็จ',
              text: `สถานะได้ถูกอัปเดตเป็น "${status}" เรียบร้อยแล้ว`
            });
          })
          .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'ไม่สามารถอัปเดตสถานะได้ โปรดลองอีกครั้งในภายหลัง'
            });
          });
      }
    });
  };

  const handleClicktoUpdateGetProduct2 = (status) => {
    if (!selectedProductApproved2) {
      console.error("Selected product not found");
      return;
    }
    handleCloseApproved2();

    Swal.fire({
      icon: 'warning',
      title: 'คุณแน่ใจหรือไม่?',
      text: `คุณต้องการอัปเดตสถานะเป็น "${status}" หรือไม่?`,
      showCancelButton: true,
      confirmButtonText: 'ใช่, อัปเดตสถานะ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.put(`http://localhost:5000/updateStatusGetproduct2/${selectedProductApproved2.order_sale_id}`, {
          order_product_getproduct : status,
        })
          .then((response) => {
            console.log("ข้อมูลที่ถูกอัปเดต:", response.data);
            setFilteredProductInbox1((prevProducts) => {
              return prevProducts.map((item) =>
                item.order_sale_id === selectedProductApproved2.order_sale_id ? response.data : item
              );
            });
            Swal.fire({
              icon: 'success',
              title: 'อัปเดตสถานะสำเร็จ',
              text: `สถานะได้ถูกอัปเดตเป็น "${status}" เรียบร้อยแล้ว`
            });
          })
          .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'ไม่สามารถอัปเดตสถานะได้ โปรดลองอีกครั้งในภายหลัง'
            });
          });
      }
    });

  };

  useEffect(() => {
    Axios.get(`http://localhost:5000/notifications_bank/${bank_name}`)
      .then((response) => {
        console.log("ข้อมูลที่ได้รับ:", response.data);
        const fetchedProducts = response.data.map((item) => ({
          order_request_id: item.order_request_id,
          order_id: item.order_id,
          bank_name: item.bank_name,
          fullname: item.fullname,
          email: item.email,
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
          order_date: dayjs(item.order_date),
          order_rental_pickup: item.order_rental_pickup,
          customer_status: item.customer_status,
          order_status_getproduct : item.order_status_getproduct
        }));
        const sortedProducts = fetchedProducts.sort((a, b) => b.order_date - a.order_date);
        setFilteredProducts(sortedProducts);


      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      })

  }, [bank_name, filteredProducts]);

  useEffect(() => {
    Axios.get(`http://localhost:5000/notifications_bank1/${bank_name}`)
      .then((response) => {
        console.log("ข้อมูลที่ได้รับ:", response.data);
        const fetchedProduct = response.data.map((item) => ({
          exchange_id: item.exchange_id,
          orderExchange_id: item.orderExchange_id,
          bank_name: item.bank_name,
          fullname: item.fullname,
          image: item.image,
          email: item.email,
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
          exchange_date: dayjs(item.exchange_date),
          order_exchange_pickup: item.order_exchange_pickup,
          customer_status_exchange: item.customer_status_exchange,
          userbank_status_getproduct : item.userbank_status_getproduct
        }));
        const sortedProduct = fetchedProduct.sort((a, b) => b.exchange_date - a.exchange_date);
        setFilteredProductInbox(sortedProduct);

      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      })

  }, [bank_name, filteredProductInbox]);

  useEffect(() => {
    Axios.get(`http://localhost:5000/notifications_bank2/${bank_name}`)
      .then((response) => {
        console.log("ข้อมูลที่ได้รับ:", response.data);
        const fetchedProducts = response.data.map((item) => ({
          order_sale_id: item.order_sale_id,
          order_product_id: item.order_product_id,
          order_sale_bankname: item.order_sale_bankname,
          fullname: item.fullname,
          email: item.email,
          image: item.image,
          product_name: item.product_name,
          product_image: item.product_image,
          product_type4: item.product_type4,
          order_product_date: dayjs(item.order_product_date),
          order_product_status: item.order_product_status,
          order_product_quantity: item.order_product_quantity,
          order_product_unit: item.order_product_unit,
          order_product_price: item.order_product_price,
          order_sale: item.order_sale,
          order_product_datetime: dayjs(item.order_product_datetime),
          order_sale_pickup: item.order_sale_pickup,
          customer_status_sale: item.customer_status_sale,
          order_product_getproduct	: item.order_product_getproduct	
        }));

        const sortedProductInbox1 = fetchedProducts.sort((a, b) => b.order_product_datetime - a.order_product_datetime);
        setFilteredProductInbox1(sortedProductInbox1);

      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      })

  }, [bank_name, filteredProductInbox1]);

  function calculateAverageRating(reviews) {
    if (reviews.length === 0) {
      return 0; // ถ้าไม่มีรีวิว ให้คะแนนเฉลี่ยเป็น 0
    }

    // คำนวณผลรวมของคะแนนทั้งหมด
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

    // หารด้วยจำนวนรีวิวเพื่อคำนวณคะแนนเฉลี่ย
    const averageRating = totalRating / reviews.length;

    return averageRating;
  }

  const handleClicktoReview = (product_id) => {
    ReactSession.set("product_id", product_id);
    ReactSession.set("username", username);
    ReactSession.set("emailuserbank", selectedProductApproved.email);
    navigate("/reviewcustom")
  }

  const handleClicktoReview1 = (product_id) => {
    ReactSession.set("product_id", product_id);
    ReactSession.set("username", username);
    ReactSession.set("emailuserbank", selectedProductApproved1.email);
    navigate("/reviewcustomexchange")
  }

  const handleClicktoReview2 = (product_id) => {
    ReactSession.set("product_id", product_id);
    ReactSession.set("username", username);
    ReactSession.set("emailuserbank", selectedProductApproved2.email);
    navigate("/reviewcustomsale")
  }
 
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
                placeholder="ค้นหาทรัพยากร"
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
              {(filteredProducts.length > 0 || filteredProductInbox.length > 0 || filteredProductInbox1.length > 0) ? (
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
                                สถานะการรีวิวของผู้ใช้ : {item.order_rental_pickup}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                สถานะการรีวิวของธนาคารคุณ : {item.customer_status}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                เวลาที่ทำรายการ : {dayjs(item.order_date).format("DD-MM-YYYY HH:mm:ss")}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button onClick={handleClickOpenApproved(item)} size="medium">เปิดอ่าน</Button>
                            </CardActions>
                          </Box>
                        </Card>
                      </Grid>
                    )
                  ))}
                  {filteredProductInbox.map((item) => (
                    item.userbank_status !== 'รอการตรวจสอบ' && (
                      <Grid item key={item.exchange_id} xs={12}>
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
                                สถานะการรีวิวของผู้ใช้ : {item.order_exchange_pickup}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                สถานะการรีวิวของธนาคารคุณ : {item.customer_status_exchange}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                เวลาที่ทำรายการ : {dayjs(item.exchange_date).format("DD-MM-YYYY HH:mm:ss")}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button onClick={handleClickOpenApproved1(item)} size="medium">เปิดอ่าน</Button>
                            </CardActions>
                          </Box>
                        </Card>
                      </Grid>
                    )
                  ))}
                  {filteredProductInbox1.map((item) => (
                    item.order_product_status !== 'รอการตรวจสอบ' && (
                      <Grid item key={item.order_product_id} xs={12}>
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
                                ได้ทำรายการของ ธนาคาร : {item.order_sale_bankname}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                สถานะปัจจุบัน : {item.order_product_status}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                สถานะการทำรายการ : {item.order_sale}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                สถานะการรีวิวของผู้ใช้ : {item.order_sale_pickup}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                สถานะการรีวิวของธนาคารคุณ : {item.customer_status_sale}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                เวลาที่ทำรายการ : {dayjs(item.order_product_datetime).format("DD-MM-YYYY HH:mm:ss")}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button onClick={handleClickOpenApproved2(item)} size="medium">เปิดอ่าน</Button>
                            </CardActions>
                          </Box>
                        </Card>
                      </Grid>
                    )
                  ))}
                </>
              ) : (
                <p>ไม่มีรายการ</p>
              )}
            </Grid>
          </>
        )}
        {value === 6 && (
          <>
            <Grid container spacing={2} style={{ width: '95%', margin: 0 }}>
              {(filteredProducts.length > 0 || filteredProductInbox.length > 0 || filteredProductInbox1.length > 0) ? (
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
                  {filteredProductInbox.map((item) => (
                    item.userbank_status === 'รอการตรวจสอบ' && (
                      <Grid item key={item.exchange_id} xs={12}>
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
                  {filteredProductInbox1.map((item) => (
                    item.order_product_status === 'รอการตรวจสอบ' && (
                      <Grid item key={item.order_product_id} xs={12}>
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
                                ได้ทำรายการของ ธนาคาร : {item.order_sale_bankname}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                สถานะปัจจุบัน : {item.order_product_status}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                สถานะการทำรายการ : {item.order_sale}
                              </Typography>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                เวลาที่ทำรายการ : {dayjs(item.order_product_datetime).format("DD-MM-YYYY HH:mm:ss")}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button onClick={handleClickOpen2(item)} size="medium">เปิดอ่าน</Button>
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

        <Dialog
          open={openOrder2}
          onClose={handleClose2}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "center" }}>คุณได้ทำรายการของธนาคาร {selectedProductss ? selectedProductss.order_sale_bankname : 'N/A'} </DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRefss}
              tabIndex={-1}
            >
              {selectedProductss ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card sx={{ maxWidth: 345, m: 1 }} >
                      <CardMedia
                        component="img"
                        height="300"
                        image={`http://localhost:5000/image/${selectedProductss.product_image}`}
                        title="รูปภาพทรัพยากร"
                      />
                    </Card>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                    <div style={{ marginTop: 50 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                      <TextField disabled id="outlined-disabled" label={selectedProductss.product_name} variant="outlined" sx={{ width: '50ch' }} />
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
                      <TextField disabled id="outlined-disabled" label={selectedProductss.product_type4} variant="outlined" sx={{ width: '50ch' }} />

                    </div>
                    <div style={{ marginTop: 30 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>สถานะการทำรายการ : </FormLabel>
                      <TextField disabled id="outlined-disabled" label={`${selectedProductss.order_sale}`} variant="outlined" sx={{ width: '50ch' }} />
                    </div>
                    <div style={{ marginTop: 30 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากรที่ต้องการทำรายการ : </FormLabel>
                      <TextField disabled id="outlined-disabled" label={`${selectedProductss.order_product_quantity} ${selectedProductss.order_product_unit}`} variant="outlined" sx={{ width: '50ch' }} />
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
                              value={orderSale_borrowDate}
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
            <Button onClick={() => handleUpdate2('ไม่อนุมัติให้ทำรายการ')} color='error'>ไม่อนุมัติให้ทำรายการ</Button>
            <Button onClick={() => handleUpdate2('อนุมัติให้ทำรายการ')} >อนุมัติให้ทำรายการ</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={calculateAverageRating(reviews) > 0} // เปิด dialog เมื่อมีรีวิว
          onClose={handleCloseReviewsDialog}
          scroll="paper"
          aria-labelledby="reviews-dialog-title"
          aria-describedby="reviews-dialog-description"
          PaperProps={{ style: { maxWidth: '900px', margin: 'auto' } }}
        >
          {reviews.length > 0 ? (
            <>
              <DialogTitle id="reviews-dialog-title" sx={{ textAlign: "center" }}>
                รีวิวสินค้า
                <Box sx={{ ml: 2, fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {`คะแนนเฉลี่ย : `}
                  <Rating
                    name="average-rating"
                    value={calculateAverageRating(reviews)}
                    precision={0.5}
                    readOnly
                    emptyIcon={<StarRateSharpIcon fontSize="inherit" />}
                  />
                  <Box sx={{ ml: 1 }}>
                    {calculateAverageRating(reviews).toFixed(2)}
                  </Box>
                </Box>
              </DialogTitle>
              <DialogContent dividers>
                {/* แสดงรีวิวของสินค้า */}
                <Grid container spacing={2}>
                  {reviews.map((review, index) => (
                    <Grid item xs={12} key={index}>
                      <Card style={{ width: '100%', display: 'flex', marginBottom: '10px' }}>
                        <CardMedia
                          component="img"
                          height="280"
                          image={review.image}
                          title="รูปภาพคนรีวิว"
                          style={{ width: '300px' }}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {review.fullname}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Rating
                              name="text-feedback"
                              value={review.rating}
                              readOnly
                              precision={0.5}
                              emptyIcon={<StarRateSharpIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                            <Typography variant="body1" sx={{ ml: 1 }}>
                              {review.rating.toFixed(1)} ดาว
                            </Typography>
                          </Box>
                          <Typography gutterBottom variant="body1" component="div">
                            ความคิดเห็น : {review.detail}
                          </Typography>
                          <Typography gutterBottom variant="body2" component="div">
                            วันเวลาที่ได้รีวิว : {dayjs(review.date).format('DD/MM/YYYY HH:mm:ss')}
                          </Typography>
                          <CardMedia
                            component="img"
                            height="280"
                            image={`http://localhost:5000/image/${review.bank_review_image}`}
                            title="รูปภาพทรัพยากรที่รีวิว"
                            style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </DialogContent>
            </>
          ) : (
            <DialogContent>
              <Typography variant="body1" component="div" align="center">
                ยังไม่มีรีวิวสำหรับสินค้านี้
              </Typography>
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={handleCloseReviewsDialog} color="primary">
              ปิด
            </Button>
          </DialogActions>
        </Dialog>

        {/* approved */}
        <Dialog
          open={openOrderApproved}
          onClose={handleCloseApproved}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "center" }}>คุณได้ทำรายการของธนาคาร {selectedProductApproved ? selectedProductApproved.bank_name : 'N/A'} </DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRefApproved}
              tabIndex={-1}
            >
              {selectedProductApproved ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card sx={{ maxWidth: 345, m: 1 }} >
                      <CardMedia
                        component="img"
                        height="300"
                        image={`http://localhost:5000/image/${selectedProductApproved.product_image}`}
                        title="รูปภาพทรัพยากร"
                      />
                    </Card>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                    <div style={{ marginTop: 50 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                      <TextField disabled id="outlined-disabled" label={selectedProductApproved.product_name} variant="outlined" sx={{ width: '50ch' }} />
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
                      <TextField disabled id="outlined-disabled" label={selectedProductApproved.product_type4} variant="outlined" sx={{ width: '50ch' }} />

                    </div>
                    <div style={{ marginTop: 30 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>สถานะการทำรายการ : </FormLabel>
                      <TextField disabled id="outlined-disabled" label={`${selectedProductApproved.order_rental}`} variant="outlined" sx={{ width: '50ch' }} />
                    </div>
                    <div style={{ marginTop: 30 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากรที่ต้องการทำรายการ : </FormLabel>
                      <TextField disabled id="outlined-disabled" label={`${selectedProductApproved.order_quantity} ${selectedProductApproved.product_unit}`} variant="outlined" sx={{ width: '50ch' }} />
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
          {(selectedProductApproved && selectedProductApproved.order_status_getproduct === 'ยังไม่ได้มารับทรัพยากร' &&  selectedProductApproved.order_status === 'อนุมัติให้ทำรายการ'
          ) && (
            <DialogActions sx={{ justifyContent: 'center' }}>
            <Button onClick={() => handleClicktoUpdateGetProduct("ส่งทรัพยากรเรียบร้อยแล้ว")}>ส่งทรัพยากรเรียบร้อยแล้ว</Button>
          </DialogActions>
          )}
          {(selectedProductApproved && selectedProductApproved.order_rental_pickup === 'รีวิวทรัพยากรเรียบร้อย' && selectedProductApproved.customer_status !== 'รีวิวผู้ใช้เรียบร้อย' && selectedProductApproved.order_status_getproduct === 'รับทรัพยากรเรียบร้อยแล้ว') && (
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button onClick={() => handleClicktoReview(selectedProductApproved.order_request_id)}>รีวิวผู้ใช้ที่ได้เช่าหรือยืมทรัพยากรในธนาคารของคุณ</Button>
            </DialogActions>
          )}
        </Dialog>

        <Dialog
          open={openOrderApproved1}
          onClose={() => setOpenNextDialogApproved(false)}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "center" }}>รายการที่ {selectedProductApproved1 ? selectedProductApproved1.fullname : 'N/A'} ได้ทำรายการ</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRefApproved1}
              tabIndex={-1}
            >
              {selectedProductApproved1 ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card sx={{ maxWidth: 345, m: 1 }} >
                      <CardMedia
                        component="img"
                        height="300"
                        image={`http://localhost:5000/image/${selectedProductApproved1.product_image}`}
                        title="รูปภาพทรัพยากร"
                      />
                    </Card>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                    <div style={{ marginTop: 50 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                      <TextField disabled id="outlined-disabled" label={selectedProductApproved1.product_name} variant="outlined" sx={{ width: '50ch' }} />
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
                      <TextField disabled id="outlined-disabled" label={selectedProductApproved1.product_type4} variant="outlined" sx={{ width: '50ch' }} />

                    </div>
                    <div style={{ marginTop: 30 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>สถานะการทำรายการ : </FormLabel>
                      <TextField disabled id="outlined-disabled" label={`${selectedProductApproved1.order_exchange}`} variant="outlined" sx={{ width: '50ch' }} />
                    </div>
                    <div style={{ marginTop: 30 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากรที่ต้องการทำรายการ : </FormLabel>
                      <TextField disabled id="outlined-disabled" label={`${selectedProductApproved1.orderExchange_quantity} ${selectedProductApproved1.product_unit}`} variant="outlined" sx={{ width: '50ch' }} />
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
            <Button onClick={() => handleCloseApproved1()} color='error'>ปิด</Button>
            <Button onClick={() => setOpenNextDialogApproved(true)} >ถัดไป</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openNextDialogApproved}
          onClose={handleCloseApproved1}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "center" }}>รายการที่ {selectedProductApproved1 ? selectedProductApproved1.fullname : 'N/A'} จะนำมาแลกเปลี่ยน</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRefApproved1}
              tabIndex={-1}
            >
              {selectedProductApproved1 ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card sx={{ maxWidth: 345, m: 1 }} >
                      <CardMedia
                        component="img"
                        height="300"
                        image={`http://localhost:5000/image/${selectedProductApproved1.userbank_productimage}`}
                        title="รูปภาพทรัพยากร"
                      />
                    </Card>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                    <div style={{ marginTop: 50 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                      <TextField disabled id="outlined-disabled" label={selectedProductApproved1.userbank_productname} variant="outlined" sx={{ width: '50ch' }} />
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
                      <TextField disabled id="outlined-disabled" label={selectedProductApproved1.userbank_producttype1} variant="outlined" sx={{ width: '50ch' }} />

                    </div>

                    <div style={{ marginTop: 30 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากรที่ต้องการทำรายการ : </FormLabel>
                      <TextField disabled id="outlined-disabled" label={`${selectedProductApproved1.userbank_productquantity} ${selectedProductApproved1.userbank_unit}`} variant="outlined" sx={{ width: '50ch' }} />
                    </div>

                  </div>
                </>
              ) : (
                <p>Details not found.</p>
              )}
            </DialogContentText>
          </DialogContent>
          {(selectedProductApproved1 && selectedProductApproved1.userbank_status_getproduct === 'ยังไม่ได้มารับทรัพยากร' && selectedProductApproved1.userbank_status === 'อนุมัติให้ทำรายการ'
          ) && (
            <DialogActions sx={{ justifyContent: 'center' }}>
            <Button onClick={() => handleClicktoUpdateGetProduct1("ส่งทรัพยากรเรียบร้อยแล้ว")}>ส่งทรัพยากรเรียบร้อยแล้ว</Button>
          </DialogActions>
          )}
          {(selectedProductApproved1 && selectedProductApproved1.order_exchange_pickup === 'รีวิวทรัพยากรเรียบร้อย' && selectedProductApproved1.customer_status_exchange !== 'รีวิวผู้ใช้เรียบร้อย' && selectedProductApproved1.userbank_status_getproduct === 'รับทรัพยากรเรียบร้อยแล้ว') && (
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button onClick={() => handleClicktoReview1(selectedProductApproved1.exchange_id)}>รีวิวผู้ใช้ที่ได้นำทรัพยากรมาแลกเปลี่ยนในธนาคารของคุณ</Button>
            </DialogActions>
          )}
        </Dialog>

        <Dialog
          open={openOrderApproved2}
          onClose={handleCloseApproved2}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "center" }}>คุณได้ทำรายการของธนาคาร {selectedProductApproved2 ? selectedProductApproved2.order_sale_bankname : 'N/A'} </DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRefApproved2}
              tabIndex={-1}
            >
              {selectedProductApproved2 ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card sx={{ maxWidth: 345, m: 1 }} >
                      <CardMedia
                        component="img"
                        height="300"
                        image={`http://localhost:5000/image/${selectedProductApproved2.product_image}`}
                        title="รูปภาพทรัพยากร"
                      />
                    </Card>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                    <div style={{ marginTop: 50 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>ชื่อทรัพยากร :</FormLabel>
                      <TextField disabled id="outlined-disabled" label={selectedProductApproved2.product_name} variant="outlined" sx={{ width: '50ch' }} />
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
                      <TextField disabled id="outlined-disabled" label={selectedProductApproved2.product_type4} variant="outlined" sx={{ width: '50ch' }} />

                    </div>
                    <div style={{ marginTop: 30 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>สถานะการทำรายการ : </FormLabel>
                      <TextField disabled id="outlined-disabled" label={`${selectedProductApproved2.order_sale}`} variant="outlined" sx={{ width: '50ch' }} />
                    </div>
                    <div style={{ marginTop: 30 }}>
                      <FormLabel component="legend" style={{ color: 'black' }}>จำนวนทรัพยากรที่ต้องการทำรายการ : </FormLabel>
                      <TextField disabled id="outlined-disabled" label={`${selectedProductApproved2.order_product_quantity} ${selectedProductApproved2.order_product_unit}`} variant="outlined" sx={{ width: '50ch' }} />
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
                              value={orderSale_borrowDate}
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
          {(selectedProductApproved2 && selectedProductApproved2.order_product_getproduct === 'ยังไม่ได้มารับทรัพยากร' && selectedProductApproved2.order_product_status === 'อนุมัติให้ทำรายการ'
          ) && (
            <DialogActions sx={{ justifyContent: 'center' }}>
            <Button onClick={() => handleClicktoUpdateGetProduct2("ส่งทรัพยากรเรียบร้อยแล้ว")}>ส่งทรัพยากรเรียบร้อยแล้ว</Button>
          </DialogActions>
          )}
          {(selectedProductApproved2 && selectedProductApproved2.order_sale_pickup === 'รีวิวทรัพยากรเรียบร้อย' && selectedProductApproved2.customer_status_sale !== 'รีวิวผู้ใช้เรียบร้อย' && selectedProductApproved2.order_product_getproduct === 'รับทรัพยากรเรียบร้อยแล้ว') && (
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button onClick={() => handleClicktoReview2(selectedProductApproved2.order_sale_id)}>รีวิวผู้ใช้ที่ซื้อทรัพยากรในธนาคารของคุณ</Button>
            </DialogActions>
          )}
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
                      <CardActions sx={{ justifyContent: 'space-around' }}>
                        <Button size="small" onClick={() => handleOpenBank(resource.product_id)}>
                          ดูทรัพยากร
                        </Button>
                        <Button size="small" onClick={() => handleOpenReviewsDialog(resource)}>
                          ดูรีวิว
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
                        <CardActions sx={{ justifyContent: 'space-around' }}>
                          <Button size="small" onClick={() => handleOpenBank(resource.product_id)}>ดูทรัพยากร</Button>
                          <Button size="small" onClick={() => handleOpenReviewsDialog(resource)}>
                            ดูรีวิว
                          </Button>
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