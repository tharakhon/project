import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Autocomplete, FormControl, FormHelperText, InputAdornment, MenuItem, OutlinedInput } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material";
import NavBarBank from "./navBarBank";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

const currencies = [
  "ทรัพยากรทางการเกษตรใช้แล้วหมด เช่น ปุ๋ย ดิน",
  "อุปกรณ์หรือเครื่องมือทางการเกษตรขนาดเล็ก",
  "อุปกรณ์หรือเครื่องมือทางการเกษตรขนาดใหญ่",
];

const textStyle = {
  color: "black",
  fontSize: "50px",
  fontWeight: "normal",
};

function Resource() {
  const navigate = useNavigate();
  const [nameProduct, setNameProduct] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedResources, setSelectedResources] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [resourcePrice, setResourcePrice] = useState("");
  const [resourceForRent, setResourceForRent] = useState("");
  const [resourceForSale, setResourceForSale] = useState("");
  const [resourceForExchange, setResourceForExchange] = useState("");

  const handleCheckboxChange = (value, setter) => {
    // Toggle the checkbox value
    setter((prevValue) => (prevValue === value ? "" : value));
  };
  console.log(nameProduct)
  console.log(imagePreview)
  console.log(resourceForRent)
  console.log(resourceForSale)
  console.log(resourceForExchange)
  console.log(selectedCurrency)
  console.log(amount)
  console.log(additionalDetails)
  console.log(resourcePrice)
  const handleCurrencyChange = (event, value) => {
    setSelectedCurrency(value);
  };
  const handleAddData = () => {
    Axios.post('http://localhost:5000/bank_product', {
      product_name: nameProduct,
      product_image: image.name,
      product_type: resourceForRent,
      product_type2: resourceForSale,
      product_type3: resourceForExchange,
      product_type4: selectedCurrency,
      product_quantity: amount,
      product_details: additionalDetails,
      product_price: resourcePrice,

      // ... other data
    })
      .then((response) => {
        console.log(response.data);
        // Redirect to the bank page on successful registration

      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Server Error:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No Response from Server");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error:", error.message);
        }
      });
  }
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);
      const imageUrl = URL.createObjectURL(selectedImage);
      setImagePreview(imageUrl);
    }
  };

  const handleSubmit = () => {
    navigate("/bank");
  };

  return (
    <div>
      <NavBarBank />

      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <h1 style={textStyle}> เพิ่มทรัพยากรของคุณ</h1>
        {imagePreview ? (
          <div style={{ width: "150px", height: "150px", borderRadius: "50%", overflow: "hidden" }}>
            <img
              src={imagePreview}
              alt="Selected"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ) : (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button variant="outlined" component="span" sx={{ margin: 1 }}>
                Upload Image
              </Button>
            </label>
          </div>
        )}
        <div style={{ marginTop: 50 }}>
          <FormLabel component="legend" style={{ color: "black" }}>
            ชื่อทรัพยากร:
          </FormLabel>
          <TextField
            id="outlined-basic"
            label=""
            variant="outlined"
            sx={{ width: "50ch" }}
            value={nameProduct}
            onChange={(e) => setNameProduct(e.target.value)}
          />
        </div>
        <FormControl sx={{ marginTop: 5 }} component="fieldset" variant="standard">
          <FormLabel component="legend" style={{ color: "black" }}>
            เลือกประเภทบริการ
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={resourceForRent !== ""} onChange={() => handleCheckboxChange("ทรัพยากรเพื่อเช่าหรือยืม", setResourceForRent)} />}
              label="ทรัพยากรเพื่อเช่าหรือยืม"
            />
            <FormControlLabel
              control={<Checkbox checked={resourceForSale !== ""} onChange={() => handleCheckboxChange("ทรัพยากรเพื่อการซื้อขาย", setResourceForSale)} />}
              label="ทรัพยากรเพื่อการซื้อขาย"
            />
            <FormControlLabel
              control={<Checkbox checked={resourceForExchange !== ""} onChange={() => handleCheckboxChange("ทรัพยากรเพื่อแลกเปลี่ยน", setResourceForExchange)} />}
              label="ทรัพยากรเพื่อแลกเปลี่ยน"
            />
          </FormGroup>
        </FormControl>
        <div style={{ marginTop: 20 }}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          ></Box>
          <FormLabel component="legend" style={{ color: "black" }}>
            เลือกประเภททรัพยากรทางการเกษตร:
          </FormLabel>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={currencies}
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            sx={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="" />}
          />
        </div>
        <div style={{ marginTop: 30 }}>
          <FormLabel component="legend" style={{ color: "black" }}>
            จำนวนทรัพยากร:
          </FormLabel>
          <TextField sx={{ width: 220 }} value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div style={{ marginTop: 30 }}>
          <FormLabel component="legend" style={{ color: "black" }}>
            รายละเอียดเพิ่มเติม:
          </FormLabel>
          <TextField id="outlined-multiline-static" multiline rows={4} sx={{ width: "40ch" }} value={additionalDetails} onChange={(e) => setAdditionalDetails(e.target.value)} />
        </div>
        <div style={{ marginTop: 30 }}>
          <FormLabel component="legend" style={{ color: "black" }}>
            ราคาของทรัพยากร:
          </FormLabel>
          <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end">บาท</InputAdornment>}
            value={resourcePrice}
            onChange={(e) => setResourcePrice(e.target.value)}
          />
          <FormHelperText>หมายเหตุ : ถ้าเลือกบริการเช่ายืมหรือแลกเปลี่ยน</FormHelperText>
          <FormHelperText>ให้ใส่ราคา 0 บาท</FormHelperText>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
          <Button variant="contained" size="large" color="error" onClick={handleSubmit}>
            ยกเลิก
          </Button>
          <Button variant="contained" size="large" color="warning" onClick={handleAddData}>
            บันทึกข้อมูล
          </Button>
          <Button variant="contained" size="large" color="success" onClick={handleSubmit}>
            เสร็จสิ้น
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Resource;
