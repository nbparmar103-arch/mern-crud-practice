import React, { Component } from 'react';
import { Container, Segment, Header, Icon, Grid, Divider, List, Label, Message } from 'semantic-ui-react';
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

              <List relaxed size='large'>
                <List.Item>
                  <List.Icon name='check circle' color='green' verticalAlign='middle' />
                  <List.Content>
                    <List.Header>Add User Records</List.Header>
                    <List.Description>Users can add new records with name, email, age, and gender using a validated form.</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='check circle' color='green' verticalAlign='middle' />
                  <List.Content>
                    <List.Header>View Records (Read)</List.Header>
                    <List.Description>All records are displayed in a structured table with real-time updates.</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='check circle' color='green' verticalAlign='middle' />
                  <List.Content>
                    <List.Header>Edit Records (Update)</List.Header>
                    <List.Description>Existing user data can be updated instantly via modal-based forms.</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='lock' color='red' verticalAlign='middle' />
                  <List.Content>
                    <List.Header>Delete (Role-based / Disabled for Demo)</List.Header>
                    <List.Description>Delete functionality is implemented at API level and intentionally hidden for demo safety.</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='check circle' color='green' verticalAlign='middle' />
                  <List.Content>
                    <List.Header>Backend Validation</List.Header>
                    <List.Description>Strong validation at database and API level to ensure clean and accurate data.</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='cloud' color='blue' verticalAlign='middle' />
                  <List.Content>
                    <List.Header>Cloud Database Integration</List.Header>
                    <List.Description>Uses MongoDB Atlas for secure and scalable data storage.</List.Description>
                  </List.Content>
                </List.Item>
              </List>

              <Divider horizontal section>
                 <Header as='h4'>
                    <Icon name='cogs' />
                    Technology Stack
                 </Header>
              </Divider>

              <Label.Group size='large' color='blue'>
                <Label>Frontend: React.js, Semantic UI</Label>
                <Label>Backend: Node.js, Express.js</Label>
                <Label>Database: MongoDB Atlas</Label>
                <Label>Architecture: RESTful API</Label>
                <Label>Tools: Axios, Mongoose, Socket-ready structure</Label>
              </Label.Group>

              <Divider horizontal section>
                 <Header as='h4'>
                    <Icon name='target' />
                    Purpose
                 </Header>
              </Divider>

              <p style={{ fontSize: '1.2em' }}>This project was built by <strong>Nikhil Parmar</strong> to:</p>
              <List bulleted size='large'>
                <List.Item>Practice real-world full-stack development</List.Item>
                <List.Item>Understand data validation and API integration</List.Item>
                <List.Item>Work with cloud databases</List.Item>
                <List.Item>Prepare for client demos, interviews, and production-level thinking</List.Item>
              </List>

              <Message info size='large'>
                <Message.Header>One-Line Demo Explanation (Client / Interview)</Message.Header>
                <p>“This is a MERN stack user management system built by <strong>Nikhil Parmar</strong>, featuring validated CRUD operations with a cloud-based MongoDB backend.”</p>
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
                <p>MERN CRUD Application &copy; 2025</p>
            </Container>
        </Segment>
      </div>
    );
  }
}

export default App;
