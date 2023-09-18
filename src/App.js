import { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {
  totalNews = 15;
  api = process.env.REACT_APP_NOT_SECRET_CODE;
  state = {
    progress: 0
  }
  setProgress = (progress)=>{
    this.setState({progress: progress})
  }

  render() {
    
    return (
      <>
      <Navbar />
      <LoadingBar
        color='#f11946'
        height={4}
        progress={this.state.progress}
      />
      <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} api={this.api} key="general" pageSize={this.totalNews} country={"in"} category={"general"}/>} />
          <Route exact path="/business" element={<News setProgress={this.setProgress} api={this.api} key="business" pageSize={this.totalNews} country={"in"} category={"business"}/>} />
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} api={this.api} key="entertainment" pageSize={this.totalNews} country={"in"} category={"entertainment"}/>} />
          <Route exact path="/health" element={<News setProgress={this.setProgress} api={this.api}  key="health" pageSize={this.totalNews} country={"in"} category={"health"}/>} />
          <Route exact path="/science" element={<News setProgress={this.setProgress} api={this.api}  key="science" pageSize={this.totalNews} country={"in"} category={"science"}/>} />
          <Route exactpath="/sports" element={<News setProgress={this.setProgress} api={this.api}  key="sports" pageSize={this.totalNews} country={"in"} category={"sports"}/>} />
          <Route exact path="/technology" element={<News setProgress={this.setProgress} api={this.api} key="technology" pageSize={this.totalNews} country={"in"} category={"technology"}/>} />
        </Routes>
        </>
    );
  }
}
