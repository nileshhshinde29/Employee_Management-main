import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Autocomplete, Button, Card, CardContent, Checkbox, Container, FormControl, Box, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, Radio, RadioGroup, Slider, Stack, TextareaAutosize, Typography } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import { LocalizationProvider , DatePicker} from '@mui/lab'

function AddEmployee() {

  const navigate = useNavigate()

  
  const [AllEmployeData, setEmployee] = useState({
    
    name: '',
    email: '',
    mobile: '',
    address: '',
    state: '',
    city: '',
    DOB: null,
    gender: '',
    password: '',
    hobbies: { Reading_books: false, Swimming: false, Treaking: false , Travel:false},
    cs: ''
  })
  const [auth_token, setAuth_token] = useState()
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])

  useEffect(() => {

    axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
      headers: {
        "Accept": "application/json",
        "api-token": "fhMkJuqVB4Ph8adRLNY7YlVbDpPTCrxua4FMM_Uq9je5ef8qDIubCw3KVMxb0INVI-g",
        "user-email": "shrikantnale17071999@gmail.com"
      }
    })
      .then(res => {
        setAuth_token(res.data.auth_token)
        getStates(res.data.auth_token)
      })
  }, [])
  useEffect(() => {
    if (AllEmployeData.state !== '') {
      getCities()

    }

  }, [AllEmployeData.state])

  const getStates = async (auth_token) => {
    const res = await axios.get('https://www.universal-tutorial.com/api/states/India', {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        "Accept": "application/json"
      }
    })
    setStates(res.data)
  }

  const getCities = async () => {
    const res = await axios.get(`https://www.universal-tutorial.com/api/cities/${AllEmployeData.state}`, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        "Accept": "application/json"
      }
    })
    setCities(res.data)
  }

  const handleChange = (e) => {
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let arr = localStorage.getItem('empList') ? JSON.parse(localStorage.getItem('empList')) : []
  //   arr.push(AllEmployeData)
  //   localStorage.setItem('empList', JSON.stringify(arr))
  //   // console.log(e)
  //   navigate('/')
    
  // }

  const myObj = AllEmployeData  // data is our object of values that we want to validate
const [formValues, setFormValues] = React.useState(myObj);
const [formErrors, setformErrors] = useState({});
const [isSubmit, setIsSubmit] = useState(false);

useEffect(() => {
  setFormValues(myObj);
  // console.log(myObj)
}, [AllEmployeData]);

useEffect(() => {
  if (Object.keys(formErrors).length == 0 && isSubmit) {
    //  e.preventDefault();
     let arr = localStorage.getItem("empList")
       ? JSON.parse(localStorage.getItem("empList"))
       : [];
     arr.push(AllEmployeData);
     localStorage.setItem("empList", JSON.stringify(arr));
    //  setIsSubmit(false); 
    navigate("/");
  }
}, [formErrors]);

const AddQuestionIntoArray = (e, data) => {
  // pass this function onSubmit with paramiter Obj e,g onClick={(e)=>AddQuestionIntoArray(e, Obj)}

  e.preventDefault();
  setIsSubmit(true);
  setformErrors(validate(data));
};

const validate = (values) => {
  const errors = {};



  if (!values.name) {
    errors.name = "question text is require";
  }

  if (!values.mobile) {
    errors.mobile = "Mobile no required";
  }
  if (values.mobile.length > 10) {
    errors.mobile = "Mobile no must be less than 11 ";
  }
  if (values.mobile < 0) {
    errors.mobile = "Mobile no must be greater than 0 ";
  }
  if (!values.email.includes("@gmail.com")) {
    errors.email = "Please enter valid email";
  }
  // if (!values.name) {
  //   errors.name = "question text is require";
  // }
  // if (!values.password) {
  //   errors.password = "password is require";
  // }
  // if (!values.mobile )
  // {
  //   errors.mobile="Mobile no required"
  // }
  // if (values.mobile.length > 10) {
  //   errors.mobile = "Mobile no must be less than 11 ";
  // }
  // if (!values.DOB) {
  //   errors.DOB = "date is required";
  // }
  // if (!values.state ) {
  //   errors.state = "State is required";
  // }
  //  if (!values.city) {
  //    errors.city = 'city no required';
  // }
  //  if (!values.email.includes('@gmail.com')) {
  //    errors.email = "please Enter valid Email";
  // }
  





  return errors;
  };
  

  return (
    <Box border={1} margin={'0px 230px  ' }>
      <Card sx={{ minWidth: 800, maxWidth: 700, margin: "0 auto" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Add Employee
        </Typography>

        <CardContent>
          <form onSubmit={(e) => AddQuestionIntoArray(e, AllEmployeData)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  error={formErrors.name}
                  type="text"
                  id="outlined-error"
                  label="Name"
                  placeholder="Enter name"
                  value={AllEmployeData.name}
                  onChange={(e) =>
                    setEmployee({ ...AllEmployeData, name: e.target.value })
                  }
                  fullWidth
                  helperText={formErrors.name}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  error={formErrors.email}
                  type="email"
                  id="outlined-error"
                  label="Email"
                  placeholder="Enter your email Id"
                  value={AllEmployeData.email}
                  onChange={(e) =>
                    setEmployee({ ...AllEmployeData, email: e.target.value })
                  }
                  helperText={formErrors.email}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  error={formErrors.mobile}
                  type="number"
                  id="outlined-error"
                  label="Mobile"
                  placeholder="Enter your mobile number"
                  value={AllEmployeData.mobile}
                  onChange={(e) =>
                    setEmployee({ ...AllEmployeData, mobile: e.target.value })
                  }
                  helperText={formErrors.mobile}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="outlined-multiline-flexible"
                  type="text"
                  label="Address"
                  placeholder="Enter your address"
                  value={AllEmployeData.address}
                  onChange={(e) =>
                    setEmployee({ ...AllEmployeData, address: e.target.value })
                  }
                  multiline
                  fullWidth
                  minRows={2}
                  maxRows={4}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={states.map((states) => ({
                    ...states,
                    label: states.state_name,
                  }))}
                  value={AllEmployeData.state ? AllEmployeData.state : ""}
                  onChange={(e, val) =>
                    setEmployee({ ...AllEmployeData, state: val.state_name })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select State" />
                  )}
                  helperText={formErrors.state}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={cities.map((city) => ({
                    ...city,
                    label: city.city_name,
                  }))}
                  // sx={{ width: 300 }}
                  value={AllEmployeData.city ? AllEmployeData.city : ""}
                  onChange={(e, val) =>
                    setEmployee({ ...AllEmployeData, city: val.city_name })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select City" />
                  )}
                  helperText={formErrors.city}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                {/* <TextField
                  id="date"
                  label="Date of Birth"
                  type="date"
                  // defaultValue="1999-04-16"
                  // sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) =>
                    setEmployee({ ...AllEmployeData, DOB: e.target.value })
                  }
                  fullWidth
                /> */}

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    disableFuture
                    label="Date Of Birth"
                    openTo="year"
                    views={["year", "month", "day"]}
                    value={AllEmployeData.DOB}
                    onChange={(newValue) => {
                      // console.log(newValue.getDate()+'/'+newValue.getMonth()+'/'+newValue.getFullYear());
                      setEmployee({ ...AllEmployeData, DOB: newValue });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    helperText={formErrors.date}
                  />
                  <p> {formErrors.DOB}</p>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={AllEmployeData.gender}
                    onChange={(e) =>
                      setEmployee({ ...AllEmployeData, gender: e.target.value })
                    }
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  error={false}
                  type="password"
                  id="outlined-error"
                  label="Password"
                  placeholder="Enter password"
                  value={AllEmployeData.password}
                  onChange={(e) =>
                    setEmployee({ ...AllEmployeData, password: e.target.value })
                  }
                  fullWidth
                  helperText={formErrors.password}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl component="" variant="standard">
                  <FormLabel component="">Hobbies:-</FormLabel>
                  <FormGroup sx={{ margin: "0 30px" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={AllEmployeData.hobbies.Swimming}
                          onChange={() =>
                            setEmployee({
                              ...AllEmployeData,
                              hobbies: {
                                ...AllEmployeData.hobbies,
                                Swimming: !AllEmployeData.hobbies.Swimming,
                              },
                            })
                          }
                          name="Swimming"
                        />
                      }
                      label="Swimming"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={AllEmployeData.hobbies.Reading_books}
                          onChange={() =>
                            setEmployee({
                              ...AllEmployeData,
                              hobbies: {
                                ...AllEmployeData.hobbies,
                                Reading_books:
                                  !AllEmployeData.hobbies.Reading_books,
                              },
                            })
                          }
                          name="Reading_books"
                        />
                      }
                      label="Reading Books"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={AllEmployeData.hobbies.Treaking}
                          onChange={() =>
                            setEmployee({
                              ...AllEmployeData,
                              hobbies: {
                                ...AllEmployeData.hobbies,
                                Treaking: !AllEmployeData.hobbies.Treaking,
                              },
                            })
                          }
                          name="Treaking"
                        />
                      }
                      label="Treaking"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={AllEmployeData.hobbies.Travel}
                          onChange={() =>
                            setEmployee({
                              ...AllEmployeData,
                              hobbies: {
                                ...AllEmployeData.hobbies,
                                Travel: !AllEmployeData.hobbies.Travel,
                              },
                            })
                          }
                          name="Travel"
                        />
                      }
                      label="Travel"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormLabel>Rate your communication skills:-</FormLabel>
                <Slider
                  sx={{ margin: "20px 0" }}
                  aria-label="CS"
                  defaultValue={0}
                  // getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  onChange={(e) =>
                    setEmployee({ ...AllEmployeData, cs: e.target.value })
                  }
                  step={1}
                  marks
                  min={0}
                  max={5}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AddEmployee