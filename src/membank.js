import React, { useEffect } from "react";
import NavBarBank from "./navBarBank";
import { Autocomplete, Button, FormLabel, Select, TextField, InputLabel, FormControl } from "@mui/material";




function Member() {

  return (
    <div>
      <NavBarBank />
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginTop: 50 }}>
          <FormLabel component="legend" style={{ color: 'black' }}>ชื่อ นามสกุลจริง</FormLabel>
          <TextField id="outlined-basic" label="" variant="outlined" sx={{ width: '50ch' }} />
        </div>
        <div style={{ marginTop: 50 }}>
          <FormLabel component="legend" style={{ color: 'black' }}>จังหวัด</FormLabel>
          <TextField id="outlined-basic" label="" variant="outlined" sx={{ width: '50ch' }} />
        </div>
        <div style={{ marginTop: 50 }}>
          <FormLabel component="legend" style={{ color: 'black' }}>อำเภอ</FormLabel>
          <TextField id="outlined-basic" label="" variant="outlined" sx={{ width: '50ch' }} />
        </div>
        <div style={{ marginTop: 50 }}>
          <FormLabel component="legend" style={{ color: 'black' }}>รหัสไปรษณีย์</FormLabel>
          <TextField id="outlined-basic" label="" variant="outlined" sx={{ width: '30ch' }} />
        </div>
        <div style={{ marginTop: 50 }}>
          <FormLabel component="legend" style={{ color: 'black' }}>เบอร์โทร</FormLabel>
          <TextField id="outlined-basic" label="" variant="outlined" sx={{ width: '40ch' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 50 }}>
          <Button variant="contained" size="large" color="error" > ยกเลิก </Button>
          <Button variant="contained" size="large" color="success" >ต่อไป</Button>
        </div>
      </div>
    </div>
  )

}

export default Member;