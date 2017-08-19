import React, {Component} from 'react'

//路由引入
import {BrowserRouter, Route} from 'react-router-dom'

//引入App头部组件
import AppHeader from './views/common/AppHeader.js'
//引入侧边导航组件
import SilderBar from './views/common/SilderBar.js'

//引入css样式
import './css/style.css'


import Home from './pages/home/Home.js'
import Movies from './pages/Movies.js'
import Cinema from './pages/Cinema.js'
import Shop from './pages/Shop.js'
import Me from './pages/Me.js'
import Card from './pages/Card.js'
import City from './pages/City.js'
import FilmDetails from './pages/home/FilmDetails.js'
import FilmList from './pages/home/FilmList.js'

export default class App extends Component{
	constructor() {
	    super()
	    this.state={
	    	show:false,
	    	hearderTitle:'卖座电影'
	    }
	}
	
	render(){
		return(
			<BrowserRouter>
				<div>
					<AppHeader show={this.menuHandle.bind(this)} title={this.state.hearderTitle} change={this.changTitle.bind(this)}/>
					<Route path="/" render={({history,location})=>{
						return <SilderBar history={history} 
										  ishow={this.state.show} 
										  pathname={location.pathname}
										  hideHandle={this.menuHandle.bind(this)}/>
					}}/>
					
					
					<Route path="/" exact component={Home}/>
					<Route path="/movies" component={Movies}/>
					<Route path="/cinema" component={Cinema}/>
					<Route path="/shop" component={Shop}/>
					<Route path="/me" component={Me}/>
					<Route path="/card" component={Card}/>
					<Route path="/city-list" component={City}/>
					<Route path="/film-details/:id" component={FilmDetails}/>
					<Route path="/film-list/:category" component={FilmList}/>
				</div>
			</BrowserRouter>
		)
	}
	//控制侧边栏显示，更改头部信息
	menuHandle(title){
		this.setState({show:!this.state.show})
		if(title){
			this.setState({hearderTitle:title})
		}
	}
	//更改头部信息
	changTitle(title){
		this.setState({hearderTitle:title})
	}
}






















