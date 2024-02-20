import React, { useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import Axios from 'axios';
import { ReactSession } from 'react-client-session';
import Select from '@mui/material/Select';
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
const UnitDropdown = ({ selectedUnit, handleUnitChange }) => {
  const units = ['กรัม', 'กิโลกรัม', 'ชิ้น', 'คัน', 'ถุง', 'กระสอบ', 'ลูก', 'หวี']; // เพิ่มหน่วยตามที่ต้องการ

  return (
    <FormControl fullWidth>
      <Select
        labelId="unit-dropdown-label"
        id="unit-dropdown"
        value={selectedUnit}
        onChange={handleUnitChange}
      >
        {units.map((unit) => (
          <MenuItem key={unit} value={unit}>
            {unit}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

function Resource() {
  const username = ReactSession.get("username");
  const codename = ReactSession.get("codename")
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
  const [isDataSaved, setIsDataSaved] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('กรัม');
  console.log(selectedUnit)

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

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
    const formData = new FormData()
    formData.append("bank_codename", codename);
    formData.append("product_name", nameProduct);
    formData.append("product_image", image);
    formData.append('product_type', resourceForRent);
    formData.append("product_type2", resourceForSale);
    formData.append("product_type3", resourceForExchange);
    formData.append("product_type4", selectedCurrency);
    formData.append('product_quantity', amount);
    formData.append('product_unit', selectedUnit);
    formData.append('product_details', additionalDetails);
    formData.append('product_price', resourcePrice)

    Axios.post('http://localhost:5000/bank_product', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => {
        console.log(response.data);
        setIsDataSaved(true);
        if (response.data.Status === 'Success') {
          console.log("File Successfully Uploaded");
          alert('บันทึกข้อมูลสำเร็จ')
        } else {
          console.error("Error");
        }
      })
      .catch(er => console.log(er))
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
    navigate(-1);
  };
  const handleReture = () => {
    setNameProduct("");
    setImage(null);
    setImagePreview(null);
    setSelectedResources([]);
    setSelectedCurrency("");
    setAmount("");
    setAdditionalDetails("");
    setResourcePrice("");
    setResourceForRent("");
    setResourceForSale("");
    setResourceForExchange("");
    setSelectedUnit("กรัม");
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
            sx={{ width: 400 }}
            value={nameProduct}
            onChange={(e) => setNameProduct(e.target.value)}
          />
        </div>
        <FormControl sx={{ marginTop: 5 }} component="fieldset" variant="standard">
          <FormLabel component="legend" style={{ color: "black" }}>
            เลือกประเภทบริการ
          </FormLabel>
          <FormGroup sx={{ display: 'flex', flexDirection: 'column' }}>
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
          <TextField sx={{ width: 400 }}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <UnitDropdown
                    selectedUnit={selectedUnit}
                    handleUnitChange={handleUnitChange}
                  />
                </InputAdornment>
              ),
            }} />
        </div>
        <div style={{ marginTop: 30 }}>
          <FormLabel component="legend" style={{ color: "black" }}>
            รายละเอียดเพิ่มเติม:
          </FormLabel>
          <TextField id="outlined-multiline-static" sx={{ width: 400 }} value={additionalDetails} onChange={(e) => setAdditionalDetails(e.target.value)} />
        </div>
        <div style={{ marginTop: 30 }}>

          {resourceForSale === "" ? null : (
            <>
              <FormLabel component="legend" style={{ color: "black" }}>
                ราคาของทรัพยากร:
              </FormLabel>
              <OutlinedInput
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">บาท</InputAdornment>}
                value={resourcePrice}
                sx={{ width: 400 }}
                onChange={(e) => setResourcePrice(e.target.value)}
              />
            </>
          )}

        </div>

      </div>
      <div style={{ display: "flex", justifyContent: 'space-around', marginTop: 30 }}>
        <Button variant="contained" size="large" color="error" onClick={handleSubmit}>ย้อนกลับ</Button>
        <Button variant="contained" size="large" color="error" onClick={handleReture}>ลบข้อมูลที่กรอกเพื่อเพิ่มทรัพยากรใหม่</Button>
        <Button variant="contained" size="large" color="warning" onClick={handleAddData}>บันทึกข้อมูล</Button>
      </div>
    </div>
  );
}
export default Resource;
