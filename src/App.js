import React, { Component } from 'react'
import { Helmet } from "react-helmet";

import { NavigationBar } from './Components/navigation-bar/navigation-bar.component'
import { Header } from './Components/header/header.component'
import { SocialBar } from './Components/social-bar/social-bar.component'
import { Contact } from './Components/contact-about/contact.component'
import { Collection } from './Components/collection/collection.component'
import { Footer } from './Components/footer/footer.component'

import user from './info'

import './App.css'

/* 
  Designs: 
    wall2
    wall3 
    list 
*/

class App extends Component {
  constructor(){
    super()
    this.state = {
      personal: {},
      experience: {},
      projects: {},
      education: {},
    }
  }

  componentDidMount() {
    fetch('') // API endpoint 
    .then(response => response.json())
    .then(userAPI => this.setState({ 
      personal: userAPI.personal[0],
      experience: userAPI.groups[0].experience,
      projects: userAPI.groups[1].projects,
      education: userAPI.groups[2].education, 
    }))
    .catch(err => {
      console.log(err)
      this.setState({
        personal: user.personal[0],
        experience: user.groups[0].experience,
        projects: user.groups[1].projects,
        education: user.groups[2].education,
      })
    })
  }

  render() {
    const { personal, experience, projects, education } = this.state
    return (
      <div>
        { personal.name ? 
        <div>
          <Helmet>
            <title> {personal.name} | {personal.headline} </title>
            <link 
              rel="canonical" 
              href={personal.domain} />
            <meta 
              name="description" 
              content={personal.description} />
            <meta 
              name="keywords" 
              content={personal.keywords} />
          </Helmet>
          <NavigationBar />
          <Header personal={personal} />
          <SocialBar icons={personal.social}/>
          <Contact personal={personal} />

          {/* 
            Begin Edit
            • 'section' may be named any string
            • 'design' must be wall2, wall3, or list
            • 'groups' must be named in accordance with info.js
          */}

          <Collection 
            section={'projects'} 
            design={'wall2'} 
            groups={projects} />

          <Collection  
            section={'experience'} 
            design={'wall3'} 
            groups={experience} />

          <Collection 
            section={'education'} 
            design={'list'} 
            groups={education} />

          {/* 
            End Edit
          */}

          <Footer />
        </div>

        : <div className='loading'> Loading... </div>
      }
      </div>
    )
  }
}

export default App;
