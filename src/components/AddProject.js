import React, { Component } from 'react';
import axios from 'axios';
// import '../stylesheets/components/addProject.css';
import '../stylesheets/main.css'; // for dev
import Button from './Button.js';
import Input from './Input'

// const ProjectsSchema = new Schema({
//   id: String, 
//   title: String,        //title of the project
//   owner: String,        //username of the post creator
//   category: String,     //category of the project
//   description: String,  //project description
//   stack: [String],      //array of technologies used in the project
//   status: String,       //status of project, why it's stuck
//   repoUrl: String,      //GitHub repo URL
//   img: [String]         //image URLs of screenshots
// });

class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: "",
          owner: "",
          category: "",
          description: "",
          stack: "",
          status: "",
          repoUrl: "",
          img: []
        };
    }
    componentDidMount() {
      // if user is not logged in and therefore user info is null, redirect to home
      // redirect to login page in the future
      if (!this.props.user) {
          setTimeout(() => {
              this.props.history.push('/');
          }, 3000);
      } else {
        this.setState({
          owner: this.props.user.displayName
        });
      }
    }
    shouldComponentUpdate() {
      return true;
    }
    onInputChange = (name, value) => {
      const newValue = {};
      if (name === 'img') {
        newValue[name] = value.split(',');
      } else {
        newValue[name] = value;
      }
      this.setState(...this.state, newValue);
    }
    onFormSubmit = (e) => {
      e.preventDefault();
      this.props.createPoll(this.state);
      this.props.history.push('/');
    }
    onFormReset = () => {
      this.setState({
          title: "",
          owner: "",
          category: "",
          description: "",
          stack: "",
          status: "",
          repoUrl: "",
          img: []
        });
    }
    render() {
      if (!this.props.user) {
          return <h3>ERROR: Not logged in. Redirecting...</h3>;
      } else {
        let inputFields = [
          {
            label: 'Project Title',
            name: 'title',
            placeholder: 'e.g. the Ninja project',
            value: this.state.title,
            required: true
          },
          {
            label: 'Category',
            name: 'category',
            type: 'text',
            placeholder: 'e.g. Social, Games, Productivity, etc.',
            value: this.state.category
          },
          {
            label: 'Description',
            tag: 'textarea',
            name: 'description',
            placeholder: 'e.g. This is the coolest project ever',
            value: this.state.description,
            required: true
          },
          {
            label: 'Project Status',
            tag: 'textarea',
            name: 'status',
            placeholder: 'e.g. Explain what is the current state of the project, why you need help and what roles you might need',
            value: this.state.status,
            required: true
          },
          {
            label: 'Stack',
            name: 'stack',
            type: 'text',
            placeholder: 'Languages, frameworks, libraries... separate by comma',
            value: this.state.stack
          },
          {
            label: 'Code Repository',
            name: 'repoUrl',
            placeholder: 'http://github.com/username/github-repo',
            value: this.state.repoUrl,
            required: true
          },
          {
            label: 'Screenshots URL',
            name: 'img',
            placeholder: 'e.g. http://via.placeholder.com/400x300',
            value: this.state.img
          }
        ];
        return (
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="material-card">
                  <h1>Add a project </h1>
                  <form onSubmit={this.onFormSubmit}>
                    <fieldset>
                      {inputFields.map(item => {
                        return <Input onChange={this.onInputChange} data={item}/>;
                      })}
                      <div className='d-flex justify-content-around'>
                        <input type='submit' className='btn' value='Submit' />
                        <input type='reset' className='btn' value='Reset' onClick={this.onFormReset} />
                      </div>
                    </fieldset>
                  </form>
                </div>
              <Button label="Back to home" />
            </div>
          </div>
        </div>
        );
    
      }
    }
}

export default AddProject;