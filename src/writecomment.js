import { Avatar, Box, Button, Card, CardContent, CardMedia, FormLabel, Grid, Rating, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBarBank from "./navBarBank";
import { blue } from "@mui/material/colors";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Axios from "axios";
import { ReactSession } from 'react-client-session';
import { useNavigate } from "react-router-dom";
import AllReviewcstom from "./Allreviewcustom";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Swal from 'sweetalert2';

const labels = {
  0.5: '0.5',
  1: '1.0',
  1.5: '1.5',
  2: '2.0',
  2.5: '2.5',
  3: '3.0',
  3.5: '3.5',
  4: '4.0',
  4.5: '4.5',
  5: '5.0',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function getLabelTexts(values) {
  return `${values} Star${values !== 1 ? 's' : ''}, ${labels[values]}`;
}

export default function Reviewcustom() {
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const [values, setValues] = React.useState(0);
  const [hovers, setHovers] = React.useState(-1);
  const [commentuser, setCommentuser] = useState("");
  const [commentusers, setCommentusers] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const username = ReactSession.get("username");
  const product_id = ReactSession.get("product_id");
  const emailuserbank = ReactSession.get("emailuserbank");
  const [user, setUser] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDataSaved, setIsDataSaved] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);
      const imageUrl = URL.createObjectURL(selectedImage);
      setImagePreview(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  useEffect(() => {
    Axios.get(`http://localhost:5000/readimage/${emailuserbank}`)
      .then((response) => {
        console.log("image:", response.data[0]);
        // Assuming the image data is present in the response data
        setUser(response.data[0]);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      })

  }, [emailuserbank, user]);

  useEffect(() => {
    Axios.get(`http://localhost:5000/showProductUser5/${product_id}`)
      .then((response) => {
        console.log("ข้อมูลที่ได้รับ:", response.data);
        if (response.data.length > 0) {
          setFilteredProducts(response.data[0]);
        }
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
      })

  }, []);
  const handleSubmit = (status) => {

    if (!value || !commentuser || !image) {
      Swal.fire({
        icon: 'error',
        title: 'โปรดกรอกข้อมูลให้ครบถ้วน',
        text: 'กรุณาตรวจสอบและกรอกข้อมูลให้ครบทุกช่อง',
      });
      return;
    }

    const formData = new FormData()
    formData.append("user_email", emailuserbank);
    formData.append("bank_codename", filteredProducts.bank_codename);
    formData.append("rating", value);
    formData.append('detail', commentuser);
    formData.append("ratings", values);
    formData.append('details', commentusers);
    formData.append("product_id", filteredProducts.order_id);
    formData.append("customer_review_image", image);

    Swal.fire({
      icon: 'warning',
      title: 'คุณแน่ใจหรือไม่ว่าต้องการบันทึกข้อมูล?',
      showCancelButton: true,
      confirmButtonText: 'บันทึก',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post('http://localhost:5000/Reviewcustom', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
          .then((response) => {
            console.log(response.data);
            setIsDataSaved(true);
            if (response.data.Status === 'Success') {
              Swal.fire({
                icon: 'success',
                title: 'บันทึกข้อมูลสำเร็จ',
                text: 'File Successfully Uploaded',
              }).then(() => {
                Axios.put(`http://localhost:5000/updateStatusRentalCustomer/${filteredProducts.order_request_id}`, {
                  customer_status: status,
                })
                  .then((response) => {
                    console.log("ข้อมูลที่ถูกอัปเดต:", response.data);
                    setFilteredProducts((prevProducts) => {
                      return prevProducts.map((item) =>
                        item.order_request_id === filteredProducts.order_request_id ? response.data : item
                      );
                    });
                    navigate("/bank")
                  })
                  .catch((error) => {
                    console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
                  });
              });
            } else {
              console.error("Error");
            }
          })
          .catch(error => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'มีบางอย่างผิดพลาด กรุณาลองอีกครั้ง',
            });
          });
      }
    });
  }
  return (
    <div>
      <NavBarBank />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography sx={{ fontSize: "48px", marginTop: 3, fontWeight: "normal" }}>แสดงความคิดเห็นให้ผู้ใช้บริการ</Typography>
      </div>

      <Grid2 container spacing={0} columns={16} >
        <Grid xs={6} container spacing={0}
          justifyContent="center"
          alignItems="center"
          direction="column"
          marginTop={5}
        >
          <Typography sx={{ fontSize: "30px" }}>ผู้ทำรายการ</Typography>
          <Card sx={{ maxWidth: 345, m: 1 }} >
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
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={6} container spacing={0}
          justifyContent="center"
          alignItems="center"
          direction="column"
          marginTop={5}
        >
          <Typography sx={{ fontSize: "30px" }}>ทรัพยากรที่ใช้ทำรายการ</Typography>
          <Card sx={{ maxWidth: 345, m: 1 }} >
            <CardMedia
              component="img"
              height="300"
              image={`http://localhost:5000/image/${filteredProducts.product_image}`}
              title="รูปภาพทรัพยากร"
            />
            <CardContent >
              <Typography gutterBottom variant="h4" component="div">
                {filteredProducts.product_name}
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                สถานะการทำรายการ : {filteredProducts.order_rental}
              </Typography>
            </CardContent>

          </Card>
        </Grid>
      </Grid2>

      <Stack direction="row" justifyContent="center" spacing={3} marginTop={5}>
        <Typography sx={{ fontSize: "30px" }}>ให้คะแนนผู้ใช้บริการต่อความตรงต่อเวลา</Typography>
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => { setValue(newValue); }}
          onChangeActive={(event, newHover) => { setHover(newHover); }}
          size="large"
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>)}
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        marginTop={5}
      >
        <FormLabel component="legend" style={{ color: "black", fontSize: '20px' }}>เขียนรีวิวของคุณต่อความตรงต่อเวลา</FormLabel>
        <TextField

          id="outlined-multiline-static"
          multiline
          rows={7}
          sx={{ width: 600, marginTop: 3 }}
          value={commentuser}
          onChange={(e) => setCommentuser(e.target.value)}
        />
      </Stack>
      <Stack direction="row" justifyContent="center" spacing={3} marginTop={5}>
        <Typography sx={{ fontSize: "30px" }}>ให้คะแนนผู้ใช้บริการต่อทรัพยากร</Typography>
        <Rating
          name="hover-feedback"
          value={values}
          precision={0.5}
          getLabelText={getLabelTexts}
          onChange={(event, newValue) => { setValues(newValue); }}
          onChangeActive={(event, newHover) => { setHovers(newHover); }}
          size="large"
        />
        {values !== null && (
          <Box sx={{ ml: 2 }}>{labels[hovers !== -1 ? hovers : values]}</Box>)}
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        marginTop={5}
      >
        <FormLabel component="legend" style={{ color: "black", fontSize: '20px' }}>เขียนรีวิวของคุณต่อทรัพยากร</FormLabel>
        <TextField

          id="outlined-multiline-static"
          multiline
          rows={7}
          sx={{ width: 600, marginTop: 3 }}
          value={commentusers}
          onChange={(e) => setCommentusers(e.target.value)}
        />
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        marginTop={5}
      >
        <FormLabel component="legend" style={{ color: "black", fontSize: '20px' }}>เพิ่มรูปภาพของคุณ</FormLabel>
        {imagePreview ? (
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={imagePreview}
              alt="Selected"
              style={{
                width: '30ch',
                height: '30ch',
                objectFit: 'cover',
              }}
            />
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={handleRemoveImage}
              sx={{ marginTop: 1 }}
            >
              Remove Image
            </Button>
          </div>
        ) : (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<AddAPhotoIcon />}
                style={{ width: '120px', height: '120px' }}
              >
                Upload Image
              </Button>
            </label>
          </div>
        )}
      </Stack>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="success" sx={{ marginTop: 5 }} onClick={() => handleSubmit("รีวิวผู้ใช้เรียบร้อย")} >ยืนยันความคิดเห็น</Button>
      </div>

    </div>
  );



}