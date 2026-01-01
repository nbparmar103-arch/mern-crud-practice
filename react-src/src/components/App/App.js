import React, { Component } from 'react';
import { Container, Segment, Header, Icon, Grid, Divider, List, Label, Message, Card, Image } from 'semantic-ui-react';
import axios from 'axios';
import io from 'socket.io-client';

import TableUser from '../TableUser/TableUser';
import ModalUser from '../ModalUser/ModalUser';

import logo from '../../mern-logo.png';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.server = process.env.REACT_APP_API_URL || '';
    this.socket = io(this.server);

    this.state = {
      users: [],
      online: 0
    }

    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleUserAdded = this.handleUserAdded.bind(this);
    this.handleUserUpdated = this.handleUserUpdated.bind(this);
    this.handleUserDeleted = this.handleUserDeleted.bind(this);
  }

  // Place socket.io code inside here
  componentDidMount() {
    this.fetchUsers();
    this.socket.on('visitor enters', data => this.setState({ online: data }));
    this.socket.on('visitor exits', data => this.setState({ online: data }));
    this.socket.on('add', data => this.handleUserAdded(data));
    this.socket.on('update', data => this.handleUserUpdated(data));
    this.socket.on('delete', data => this.handleUserDeleted(data));
  }

  // Fetch data from the back-end
  fetchUsers() {
    axios.get(`${this.server}/api/users/`)
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleUserAdded(user) {
    let users = this.state.users.slice();
    users.push(user);
    this.setState({ users: users });
  }

  handleUserUpdated(user) {
    let users = this.state.users.slice();
    
    let i = users.findIndex(u => u._id === user._id)

    if (users.length > i) { users[i] = user }

    this.setState({ users: users });
  }

  handleUserDeleted(user) {
    let users = this.state.users.slice();
    users = users.filter(u => { return u._id !== user._id; });
    this.setState({ users: users });
  }

  render() {
    let peopleOnline = this.state.online - 1;
    let onlineText = "";

    if (peopleOnline < 1) {
      onlineText = 'No one else is online';
    } else {
      onlineText = peopleOnline > 1 ? `${this.state.online - 1} people are online` : `${this.state.online - 1} person is online`;
    }

    return (
      <div>
        <div className='App'>
          <div className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h1 className='App-intro'>MERN CRUD Application</h1>
            <p className='App-subtitle'>
              Developed by Nikhil Parmar
            </p>
            <Label.Group size='medium' style={{ marginTop: '10px' }}>
                <Label basic color='blue' content='GitHub Copilot' icon='github' />
                <Label basic color='teal' content='ChatGPT' icon='talk' />
                <Label basic color='violet' content='Trae IDE' icon='code' />
            </Label.Group>
          </div>
        </div>
        <Container>
          
          <Segment style={{ padding: '4em 0em', border: 'none', boxShadow: 'none' }} vertical>
            <Container text>
              <Header as='h2' content='Project Practice Summary' subheader='Developed by: Nikhil Parmar' style={{ fontSize: '2em' }} />
              <p style={{ fontSize: '1.2em' }}>
                This project is a full-stack MERN (MongoDB, Express, React, Node.js) CRUD application built as a hands-on practice to understand real-world frontend and backend integration.
              </p>
              <p style={{ fontSize: '1.2em' }}>
                The application allows users to add, view, and edit records through a clean and interactive user interface. All data is securely stored in MongoDB Atlas (cloud database) and managed through a Node.js + Express REST API.
              </p>

              <Divider horizontal section>
                 <Header as='h4'>
                    <Icon name='tag' />
                    Key Functionalities
                 </Header>
              </Divider>

              <Card.Group itemsPerRow={3} stackable>
                <Card>
                  <Card.Content>
                    <Icon name='add user' size='large' color='green' style={{ float: 'right' }} />
                    <Card.Header>Add User Records</Card.Header>
                    <Card.Meta>Create</Card.Meta>
                    <Card.Description>
                      Users can add new records with name, email, age, and gender using a validated form.
                    </Card.Description>
                  </Card.Content>
                </Card>
                <Card>
                  <Card.Content>
                    <Icon name='table' size='large' color='blue' style={{ float: 'right' }} />
                    <Card.Header>View Records</Card.Header>
                    <Card.Meta>Read</Card.Meta>
                    <Card.Description>
                      All records are displayed in a structured table with real-time updates.
                    </Card.Description>
                  </Card.Content>
                </Card>
                <Card>
                  <Card.Content>
                    <Icon name='edit' size='large' color='yellow' style={{ float: 'right' }} />
                    <Card.Header>Edit Records</Card.Header>
                    <Card.Meta>Update</Card.Meta>
                    <Card.Description>
                      Existing user data can be updated instantly via modal-based forms.
                    </Card.Description>
                  </Card.Content>
                </Card>
                <Card>
                  <Card.Content>
                    <Icon name='lock' size='large' color='red' style={{ float: 'right' }} />
                    <Card.Header>Delete</Card.Header>
                    <Card.Meta>Role-based / Demo</Card.Meta>
                    <Card.Description>
                      Delete functionality is implemented at API level and intentionally hidden for demo safety.
                    </Card.Description>
                  </Card.Content>
                </Card>
                <Card>
                  <Card.Content>
                    <Icon name='shield' size='large' color='violet' style={{ float: 'right' }} />
                    <Card.Header>Backend Validation</Card.Header>
                    <Card.Meta>Security</Card.Meta>
                    <Card.Description>
                      Strong validation at database and API level to ensure clean and accurate data.
                    </Card.Description>
                  </Card.Content>
                </Card>
                <Card>
                  <Card.Content>
                    <Icon name='cloud' size='large' color='teal' style={{ float: 'right' }} />
                    <Card.Header>Cloud DB</Card.Header>
                    <Card.Meta>MongoDB Atlas</Card.Meta>
                    <Card.Description>
                      Uses MongoDB Atlas for secure and scalable data storage.
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Card.Group>

              <Divider horizontal section>
                 <Header as='h4'>
                    <Icon name='cogs' />
                    Technology Stack
                 </Header>
              </Divider>

              <Label.Group size='large' color='blue'>
                <Label color='teal' image size='large'>
                  <Icon name='react' /> React.js
                  <Label.Detail>Frontend</Label.Detail>
                </Label>
                <Label color='green' image size='large'>
                  <Icon name='node' /> Node.js
                  <Label.Detail>Backend</Label.Detail>
                </Label>
                <Label color='olive' image size='large'>
                  <Icon name='server' /> Express.js
                  <Label.Detail>API</Label.Detail>
                </Label>
                <Label color='green' image size='large'>
                  <Icon name='database' /> MongoDB Atlas
                  <Label.Detail>Database</Label.Detail>
                </Label>
              </Label.Group>

              <Divider horizontal section>
                 <Header as='h4'>
                    <Icon name='microchip' />
                    AI Power & Tools
                 </Header>
              </Divider>

              <Card.Group itemsPerRow={3} stackable>
                 <Card>
                    <Card.Content>
                       <Icon name='github' size='large' color='black' style={{ float: 'right' }} />
                       <Card.Header>GitHub Copilot</Card.Header>
                       <Card.Meta>AI Pair Programmer</Card.Meta>
                       <Card.Description>
                          Used for intelligent code completion and suggestions.
                       </Card.Description>
                    </Card.Content>
                 </Card>
                 <Card>
                    <Card.Content>
                       <Icon name='talk' size='large' color='teal' style={{ float: 'right' }} />
                       <Card.Header>ChatGPT</Card.Header>
                       <Card.Meta>AI Assistant</Card.Meta>
                       <Card.Description>
                          Assisted in problem-solving, documentation, and logic refinement.
                       </Card.Description>
                    </Card.Content>
                 </Card>
                 <Card>
                    <Card.Content>
                       <Icon name='code' size='large' color='violet' style={{ float: 'right' }} />
                       <Card.Header>Trae IDE</Card.Header>
                       <Card.Meta>Modern Editor</Card.Meta>
                       <Card.Description>
                          The powerful AI-native IDE used to build and manage this project.
                       </Card.Description>
                    </Card.Content>
                 </Card>
              </Card.Group>

              <Divider horizontal section>
                 <Header as='h4'>
                    <Icon name='target' />
                    Purpose
                 </Header>
              </Divider>

              <Message info size='large'>
                <Message.Header>Purpose of This Project</Message.Header>
                <List bulleted>
                  <List.Item>Practice real-world full-stack development</List.Item>
                  <List.Item>Understand data validation and API integration</List.Item>
                  <List.Item>Work with cloud databases</List.Item>
                  <List.Item>Prepare for client demos, interviews, and production-level thinking</List.Item>
                </List>
              </Message>

              <Message positive size='big' icon>
                <Icon name='quote left' />
                <Message.Content>
                  <Message.Header>One-Line Demo Explanation</Message.Header>
                  <p>“This is a MERN stack user management system built by Nikhil Parmar, featuring validated CRUD operations with a cloud-based MongoDB backend.”</p>
                </Message.Content>
              </Message>

            </Container>
          </Segment>

          <Divider horizontal section>
            <Header as='h4'>
              <Icon name='table' />
              User Database
            </Header>
          </Divider>

          <Segment raised>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <ModalUser
                  headerTitle='Add User'
                  buttonTriggerTitle='Add New User'
                  buttonSubmitTitle='Add'
                  buttonColor='green'
                  onUserAdded={this.handleUserAdded}
                  server={this.server}
                  socket={this.socket}
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                   <Icon name='circle' color={peopleOnline > 0 ? 'green' : 'grey'} />
                   <em id='online' style={{ marginLeft: '5px' }}>{onlineText}</em>
                </div>
             </div>
             
             <TableUser
               onUserUpdated={this.handleUserUpdated}
               onUserDeleted={this.handleUserDeleted}
               users={this.state.users}
               server={this.server}
               socket={this.socket}
             />
          </Segment>

        </Container>
        
        <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '2em 0em' }}>
            <Container textAlign='center'>
                <p>
                  MERN CRUD Application &copy; 2026
                  <span style={{ marginLeft: '10px' }}>
                     | Developed by <span style={{ color: '#00b5ad', fontWeight: 'bold' }}>Nikhil Parmar</span>
                  </span>
                </p>
                <p>
                  <a href='https://github.com/nbparmar103-arch/mern-crud-practice' target='_blank' rel='noopener noreferrer' style={{ color: 'white' }}>
                    <Icon name='github' size='large' /> View on GitHub
                  </a>
                </p>
            </Container>
        </Segment>
      </div>
    );
  }
}

export default App;
