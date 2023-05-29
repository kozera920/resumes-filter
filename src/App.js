import React, { useState } from 'react';
import { Row, Col, Form, FormGroup } from 'react-bootstrap';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import Select from 'react-select';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import avatar from "./images/avatar.png";
import logo from "./images/logo.png";
import united_kingdom from "./images/united-kingdom.png";
import united_state from "./images/united-states.png";

import InputGroup from 'react-bootstrap/InputGroup';

const JobApplicants = () => {

  const initialFilters = {
    positions: [],
    languages: [],
    experience: false,
    experienceUnder5: false,
    experience5Plus: false,
    selectAllExperience: [],
    minSalary: '',
    maxSalary: '',
  };
  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name_mail: { name: 'John Doe', email: 'john@example.com', image: "" },
      age: 30,
      phoneNumber: '+1 (545) 914 53 12',
      position: 'Software Engineer',
      language: 'JavaScript',
      salary: 100000,
      experience: '5 years',
      workType: 'Full-time',
    },
    {
      id: 2,
      name_mail: { name: 'Jane Smith', email: 'jane@example.com', image: "" },
      age: 25,
      phoneNumber: '+1 (566) 966 53 14',
      position: 'UI/UX Designer',
      language: 'HTML, CSS, JavaScript',
      salary: 80000,
      experience: '3 years',
      workType: 'Part-time',
    },
    // Add more example data here
  ]);


  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      if (name === 'experience') {
        setFilters((prevFilters) => ({
          ...prevFilters,
          experience: checked,
        }));
      } else if (name === 'experienceUnder5') {
        setFilters((prevFilters) => ({
          ...prevFilters,
          experienceUnder5: checked,
          selectAllExperience: checked ? ['experienceUnder5', 'experience5Plus'] : [],
        }));
      } else if (name === 'experience5Plus') {
        setFilters((prevFilters) => ({
          ...prevFilters,
          experience5Plus: checked,
          selectAllExperience: checked ? ['experienceUnder5', 'experience5Plus'] : [],
        }));
      } else if (name === 'positions') {
        // Get the updated positions array based on the checkbox status
        const updatedPositions = checked
          ? [...filters.positions, value]
          : filters.positions.filter((position) => position !== value);

        setFilters((prevFilters) => ({
          ...prevFilters,
          positions: updatedPositions,
        }));
      }
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  const handleSearchChange = (event) => { // Handle search field change
    const { value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: value,
    }));
  };

  const getUpdatedCheckboxValue = (prevValue, checkboxValue, isChecked) => {
    if (isChecked) {
      return [...prevValue, checkboxValue];
    } else {
      return prevValue.filter((value) => value !== checkboxValue);
    }
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  const filteredApplicants = applicants.filter((applicant) => {
    const {
      positions,
      languages,
      experience,
      experienceUnder5,
      experience5Plus,
      minSalary,
      maxSalary,
      search,
      selectAllExperience,
    } = filters;

    if (positions.length > 0 && !positions.includes(applicant.position)) {
      return false;
    }



    if (
      languages.length > 0 &&
      !languages.some((selectedLanguage) =>
        applicant.language.split(',').map(lang => lang.trim()).includes(selectedLanguage.value)
      )
    ) {
      return false;
    }

    if (selectAllExperience.length === 0) {
      if (experience && parseInt(applicant.experience) < 5) {
        return false;
      }

      if (experienceUnder5 && parseInt(applicant.experience) >= 5) {
        return false;
      }

      if (experience5Plus && parseInt(applicant.experience) < 5) {
        return false;
      }
    }

    if (
      minSalary !== '' &&
      parseInt(applicant.salary) < parseInt(minSalary)
    ) {
      return false;
    }

    if (
      maxSalary !== '' &&
      parseInt(applicant.salary) > parseInt(maxSalary)
    ) {
      return false;
    }

    if (
      search &&
      !applicant.name_mail.name.toLowerCase().includes(search.toLowerCase()) && // Filter by full name
      !applicant.name_mail.email.toLowerCase().includes(search.toLowerCase()) // Filter by email
    ) {
      return false;
    }

    return true;
  });


  const columns = [
    {
      field: 'name_mail', headerName: 'Name & Email',
      width: 250,
      renderCell: (params) => (
        <div className='row' style={{ lineHeight: "15px" }}>
          <div className="col-3">
            <img src={avatar} className='img-fluid circled' />
          </div>
          <div className="col">
            <span style={{ fontSize: "17px" }}>{params.value.name}</span><br />
            <small className='text-secondary'>{params.value.email}</small>
          </div>
        </div>

      )
    },
    { field: 'age', headerName: 'Age', width: 120 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 200,
  renderCell: (params) => (
        <div style={{ lineHeight: "15px" }}>
          <img src={united_state} className='circled me-2' style={{width:"15px"}}/>
          <span>{params.value}</span> 
        </div>

      )
  },
    { field: 'position', headerName: 'Position', width: 150 },
    { field: 'language', headerName: 'Language', width: 200 },
    {
      field: 'salary', headerName: 'Salary', width: 230,
      renderCell: (params) => (
        <div style={{ lineHeight: "15px" }}>
          <span style={{ fontSize: "17px" }}>${number_format(params.value, 2)}/year</span><br />
          <small className='text-secondary'>Average</small>
        </div>

      )
    },
    { field: 'experience', headerName: 'Experience', width: 120 },
    { field: 'workType', headerName: 'Work Type', width: 120 }];

  const languages = [
    {
      name: "JavaScript"
    },
    {
      name: "HTML"
    },
    {
      name: "CSS"
    }
  ];
  const positions = [
    {
      name: "Software Engineer"
    },
    {
      name: "UI/UX Designer"
    },
    {
      name: "Graphic Designer"
    },
    {
      name: "Backend Developer"
    },
  ];
  const rows = filteredApplicants.map((applicant) => ({
    id: applicant.id,
    name_mail: applicant.name_mail,
    age: applicant.age,
    phoneNumber: applicant.phoneNumber,
    position: applicant.position,
    language: applicant.language,
    salary: applicant.salary,
    experience: applicant.experience,
    workType: applicant.workType,
  }));
  const defaultActiveKeys = ['0', '1', '2', '3'];
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light">
        <Container fluid >
          <Navbar.Brand href="#home">
            <img src={logo} className='logo' alt='logo' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto menu">
              <Nav.Link href="#" active="true">Homepage</Nav.Link>
              <Nav.Link href="#">Candidates</Nav.Link>
              <Nav.Link href="#">Posistions</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title={<><img src={avatar} alt='avatar' /> <span className='username'>John Doe</span></>} id="profile-dropdown">
                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Logout</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title={<><span className='lang'>ENG</span></>} id="lang-dropdown">
                <NavDropdown.Item href="#action/3.1">FR</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section className='pt-5'>
        <Container fluid >
          <Row>
            <Col sm={3}>
              <div className="row mb-3">
                <div className="col-7">
                  <h4>Filters</h4>
                </div>
                <div className="col-5">
                  <Button variant="outline-primary filter-btn" className="outline-primary w-100" onClick={handleResetFilters}>
                    <i class='bx bx-trash me-2'></i>
                    Clear Filter
                  </Button>
                </div>
              </div>


              <Form>

                <Accordion defaultActiveKey={defaultActiveKeys}>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Position</Accordion.Header>
                    <Accordion.Body>
                      <div>

                        {positions.map((item, index) => (
                          <FormGroup controlId={`pos-${index}`} key={index}>
                            <Form.Check
                              type="checkbox"
                              label={item.name}
                              name="positions"
                              value={item.name}
                              onChange={handleFilterChange}
                              checked={filters.positions.includes(item.name)}
                            />
                          </FormGroup>
                        ))}

                      </div>
                    </Accordion.Body>
                  </Accordion.Item>


                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Language</Accordion.Header>
                    <Accordion.Body>
                      <div>
                        <Select
                          placeholder="Select.."
                          isSearchable={true}
                          isMulti={true}
                          name='languages'
                          onChange={(selectedOptions) =>
                            handleFilterChange({ target: { name: 'languages', value: selectedOptions } })
                          }
                          options={languages.map((q) => ({ value: q.name, label: q.name }))}
                        />
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>


                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Experience</Accordion.Header>
                    <Accordion.Body>
                      <div>
                        <FormGroup controlId="selectAllExperience">
                          <Form.Check
                            type="checkbox"
                            label="Select All"
                            name="selectAllExperience"
                            checked={filters.selectAllExperience.length === 2}
                            onChange={handleFilterChange}
                          />
                        </FormGroup>
                        <FormGroup controlId="experienceUnder5">
                          <Form.Check
                            type="checkbox"
                            label="Under 5 years of experience"
                            name="experienceUnder5"
                            checked={filters.experienceUnder5}
                            onChange={handleFilterChange}
                          />
                        </FormGroup>
                        <FormGroup controlId="experience5Plus">
                          <Form.Check
                            type="checkbox"
                            label="5+ years of experience"
                            name="experience5Plus"
                            checked={filters.experience5Plus}
                            onChange={handleFilterChange}
                          />
                        </FormGroup>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>


                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Salary Range</Accordion.Header>
                    <Accordion.Body>
                      <div>
                        <FormGroup className='row'>
                          <div className="col-6">
                            <Form.Control
                              type="number"
                              placeholder="Min Salary"
                              name="minSalary"
                              value={filters.minSalary}
                              onChange={handleFilterChange}
                            />
                          </div>
                          <div className="col-6">
                            <Form.Control
                              type="number"
                              placeholder="Max Salary"
                              name="maxSalary"
                              value={filters.maxSalary}
                              onChange={handleFilterChange}
                            />
                          </div>

                        </FormGroup>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                </Accordion>
              </Form>
            </Col>
            <Col sm={9}>
              <div className="row my-2 search">
                <div className="col-md-6">
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="Search">
                      <i class='bx bx-search'></i>
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Search any user.."
                      aria-label="search"
                      aria-describedby="Search"
                      onChange={handleSearchChange}
                    />
                  </InputGroup>
                </div>
              </div>


              <div style={{ height: 900, width: '100%' }}>
                {/* Add GridToolbar component to display search field */}
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  checkboxSelection
                  disableSelectionOnClick
                  getRowHeight={() => 'auto'}
                  components={{
                    Toolbar: GridToolbar, // Use GridToolbar component
                  }}
                  componentsProps={{
                    toolbar: {
                      // Add search field to the GridToolbar
                      searchPlaceholder: 'Search',
                      onSearchChange: handleSearchChange,
                    },
                  }}

                />
              </div>
            </Col>
          </Row>
        </Container>

      </section>

    </div>
  );
};
function number_format(number, decimals, dec_point, thousands_point) {

  if (number == null || !isFinite(number)) {
    throw new TypeError("number is not valid");
  }

  if (!decimals) {
    var len = number.toString().split('.').length;
    decimals = len > 1 ? len : 0;
  }

  if (!dec_point) {
    dec_point = '.';
  }

  if (!thousands_point) {
    thousands_point = ',';
  }

  number = parseFloat(number).toFixed(decimals);

  number = number.replace(".", dec_point);

  var splitNum = number.split(dec_point);
  splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
  number = splitNum.join(dec_point);

  return number;
}

export default JobApplicants;
