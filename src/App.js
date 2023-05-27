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

const JobApplicants = () => {

  const initialFilters = {
    positions: [],
    languages: [],
    experience: false,
    minSalary: '',
    maxSalary: '',
  };
  const [applicants, setApplicants] = useState([
    {
      id: 1,
      fullName: 'John Doe',
      email: 'john@example.com',
      age: 30,
      phoneNumber: '1234567890',
      position: 'Software Engineer',
      language: 'JavaScript',
      salary: 100000,
      experience: '5 years',
      workType: 'Full-time',
    },
    {
      id: 2,
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      age: 25,
      phoneNumber: '0987654321',
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
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? (name === 'experience' ? checked : getUpdatedCheckboxValue(prevFilters[name], value, checked)) : value,
    }));
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
    const { positions, languages, experience, minSalary, maxSalary, search } = filters; // Add search to destructuring
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
    if (experience && parseInt(applicant.experience) < 5) {
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
      !applicant.fullName.toLowerCase().includes(search.toLowerCase()) && // Filter by full name
      !applicant.email.toLowerCase().includes(search.toLowerCase()) // Filter by email
    ) {
      return false;
    }
    return true;
  });


  const columns = [
    { field: 'fullName', headerName: 'Full Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'age', headerName: 'Age', width: 120 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
    { field: 'position', headerName: 'Position', width: 150 },
    { field: 'language', headerName: 'Language', width: 150 },
    { field: 'salary', headerName: 'Salary', width: 120 },
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
    fullName: applicant.fullName,
    email: applicant.email,
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
                <div className="col-6">
                  <h4>Filters</h4>
                </div>
                <div className="col-6">
                  <Button variant="outline-primary" className="outline-primary w-100" onClick={handleResetFilters}>
                    <i class='bx bx-trash me-2'></i>
                    Clear Filter</Button>
                </div>
              </div>


              <Form>

                <Accordion defaultActiveKey={defaultActiveKeys}>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Position</Accordion.Header>
                    <Accordion.Body>
                      <div>

                        {positions.map((item,index) => (
                          <FormGroup controlId={"pos-"+index}>
                            <Form.Check
                              controlId="formBasicCheckbox"
                              type="checkbox"
                              label={item.name}
                              name="positions"
                              value={item.name}
                              onChange={handleFilterChange}
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
                        
                          {[5].map((item,index) => (
                            <FormGroup controlId={"exp-"+index}>
                            <Form.Check
                              type="checkbox"
                              label={item + "+ years of experience"}
                              name="experience"
                              checked={filters.experience}
                              onChange={handleFilterChange}
                            />
                             </FormGroup> 
                          ))}

                      
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
              <h4>Candidates</h4>
              <div style={{ height: 400, width: '100%' }}>
                {/* Add GridToolbar component to display search field */}
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  checkboxSelection
                  disableSelectionOnClick
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

export default JobApplicants;
