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
import $ from "jquery";
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const JobApplicants = () => {

  const initialFilters = {
    positions: [],
    languages: [],
    experience: [],
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
      experience: 'Entry Level',
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
      experience: 'Internship',
      workType: 'Part-time',
    },
    // Add more example data here
  ]);
  const experiencesList = [
   { name:"Entry Level"},
    {name:"Internship"},
    {name:"Associate"},
    {name:"Mid-Senior"},
    {name:"Contract"},
   { name:"Director"},
   { name:"Executive"},
    {name:"Senior"},
    {name:"Junior"}];

  const [filters, setFilters] = useState(initialFilters);
  const [hideSidebar, setHideSidebar] = useState(false);

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      if (name === 'experience') {
        const updatedPositions = checked
        ? [...filters.experience, value]
        : filters.experience.filter((experience) => experience !== value);

      setFilters((prevFilters) => ({
        ...prevFilters,
        experience: updatedPositions,
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

    if (experience.length > 0 && !experience.includes(applicant.experience)) {
      return false;
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
            <span className='black-text' style={{ fontSize: "17px" }}>{params.value.name}</span><br />
            <small className='text-secondary'>{params.value.email}</small>
          </div>
        </div>

      )
    },
    { field: 'age', headerName: 'Age', width: 120 },
    {
      field: 'phoneNumber', headerName: 'Phone Number', width: 200,
      renderCell: (params) => (
        <div style={{ lineHeight: "15px" }}>
          <img src={united_state} className='circled me-2' style={{ width: "15px" }} />
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
          <span className='black-text' style={{ fontSize: "17px" }}>${number_format(params.value, 2)}/year</span><br />
          <small className='text-secondary'>Average</small>
        </div>

      )
    },
    { field: 'experience', headerName: 'Experience', width: 200 },
    { field: 'workType', headerName: 'Work Type', width: 200 }];

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
  const handleSelectAllExperience = (event) => {
    const isChecked = event.target.checked;
    const updatedSelectAllExperience = isChecked ? ['experienceUnder5', 'experience5Plus'] : [];

    setFilters((prevFilters) => ({
      ...prevFilters,
      selectAllExperience: updatedSelectAllExperience,
      experienceUnder5: isChecked,
      experience5Plus: isChecked,
    }));
  };
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

              <NavDropdown title={<><span className='lang'>EN</span></>} id="lang-dropdown">
                <NavDropdown.Item href="#">FR</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section className='pt-5'>
        <Container fluid >
          <Row>
            <Col className={hideSidebar ? "d-none" : "col-md-3"}>
              <div className="row mb-3">
                <div className="col-7">
                  {
                    hideSidebar ? (
                      ""
                    ) : (
                      <button className='btn btn-primary me-2 hide-btn' onClick={() => {
                        setHideSidebar(true);
                      }}>
                        <i class='bx bx-chevrons-left'></i>
                      </button>
                    )
                  }
                  <h4 className='display-inline'>Filters</h4>
                </div>
                <div className="col-5">
                  <Button variant="outline-primary filter-btn" className="outline-primary w-100" onClick={handleResetFilters}>
                    <i class='bx bx-trash me-2 text-primary'></i>
                    Clear Filter
                  </Button>
                </div>
              </div>


              <Form>

                <Accordion defaultActiveKey={defaultActiveKeys}>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header><i class='bx bx-network-chart bx-rotate-90 me-2' ></i> Job Title</Accordion.Header>
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
                    <Accordion.Header><i class='bx bx-network-chart me-2' ></i>Known Languages</Accordion.Header>
                    <Accordion.Body>
                      <div>
                        <Select
                          placeholder="Select any language.."
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
                    <Accordion.Header>
                      <i className="bx bx-rocket me-2"></i>Experience
                    </Accordion.Header>
                    <Accordion.Body>
                      <div>
                      {experiencesList.map((item, index) => (
                          <FormGroup controlId={`exp-${index}`} key={index}>
                            <Form.Check
                              type="checkbox"
                              label={item.name}
                              name="experience"
                              value={item.name}
                              onChange={handleFilterChange}
                              checked={filters.experience.includes(item.name)}
                            />
                          </FormGroup>
                        ))}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>


                  <Accordion.Item eventKey="3">
                    <Accordion.Header><i class='bx bx-dollar-circle me-2' ></i>Salary Range</Accordion.Header>
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
            <Col className={hideSidebar ? "col-md-12" : "col-md-9"}>
              <div className="row">
                <div className="col-12">
                  <span>Home</span>
                  <i class='bx bx-chevron-right px-3'></i>
                  <span className="text-primary">Candidates</span>
                </div>
                <div className="col-12">
                  {
                    hideSidebar ? (
                      <button className='btn btn-primary me-2 hide-btn' onClick={() => {
                        setHideSidebar(false);
                      }}>

                        <i class='bx bx-chevrons-right' ></i>
                      </button>
                    ) : (
                      ""
                    )
                  }

                  <h2 className='black-text py-3 display-inline'>Candidates</h2>
                </div>
              </div>
              <div className="row my-2 search">
                <div className="col-md-6">
                  <InputGroup className="mb-3 search-box">
                    <InputGroup.Text id="Search" className='search-inputs'>
                      <i class='bx bx-search'></i>
                    </InputGroup.Text>
                    <Form.Control className='search-inputs'
                      placeholder="Search any user.."
                      aria-label="search"
                      aria-describedby="Search"
                      onChange={handleSearchChange}
                    />
                  </InputGroup>
                </div>
                <div className="col">
                  <ButtonGroup aria-label="Basic example" id='filter-btns-group'>
                    <Button variant="" onClick={() => {
                      $("button.MuiButton-root:nth-child(2)").click();
                    }
                    }>
                      <span className="material-symbols-outlined me-2">tune</span>
                      <span>Filter</span>
                    </Button>
                    <Button variant="" onClick={() => {
                      $("button.MuiButton-root:nth-child(3)").click();
                    }
                    }>
                      <span class="material-symbols-outlined me-2">
                        density_medium
                      </span>
                      <span>Density</span>
                    </Button>
                  </ButtonGroup>


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
