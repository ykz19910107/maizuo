import React, {Component} from 'react'

//路由引入
import {BrowserRouter, Route} from 'react-router-dom'

//引入App头部组件
import AppHeader from './views/common/AppHeader.js'
//引入侧边导航组件
import SilderBar from './views/common/SilderBar.js'

//引入全局数据
import store from './store'

//引入css样式
import './css/style.css'

//home页首页和子页面
import Home from './pages/home/Home.js'
import FilmDetails from './pages/home/FilmDetails.js'
import FilmList from './pages/home/FilmList.js'

//影院首页和子页面
import Cinema from './pages/cinema/Cinema.js'
import CinemaDetails from './pages/cinema/CinemaDetails.js'

//商城首页和子页面
import Shop from './pages/shop/Shop.js'
import ShopNaveDetails from './pages/shop/ShopNaveDetails.js'
import ShopDetails from './pages/shop/ShopDetails.js'

//登录页面
import Me from './pages/Me.js'

//卖座卡页面
import Card from './pages/Card.js'

//城市搜索页面
import City from './pages/city/City.js'




let unsubscribe;
let topTitle = "卖座电影";


export default class App extends Component{
	constructor() {
	    super()
	    this.state={
	    	show:false,
			hearderTitle:store.getState().title
			
	    }
	}
	
	render(){
		return(
			<BrowserRouter>
				<div>
					<AppHeader show={this.menuHandle.bind(this)} title={this.state.hearderTitle} change={this.changTitle.bind(this)} city={store.getState().city}/>
					<Route path="/" render={({history,location})=>{
						return <SilderBar history={history} 
										  ishow={this.state.show} 
										  pathname={location.pathname}
										  hideHandle={this.menuHandle.bind(this)}/>
					}}/>
					
					
					<Route path="/" exact component={Home}/>
					<Route path="/film-details/:id" component={FilmDetails}/>
					<Route path="/film-list/:category" component={FilmList}/>

					<Route path="/cinema" component={Cinema}/>
					<Route path="/cinema-details/:id" component={CinemaDetails}/>

					<Route path="/shop" component={Shop}/>
					<Route path='/shop-navedetails/:class?:id' component={ShopNaveDetails} />
					<Route path='/shop-details/:id' component={ShopDetails} />

					<Route path="/me" component={Me}/>

					<Route path="/card" component={Card}/>

					<Route path="/city-list" component={City}/>
					
					
				</div>
			</BrowserRouter>
		)
	}
	//控制侧边栏显示，更改头部信息
	menuHandle(title){
		topTitle = title 
		this.setState({show:!this.state.show})
		if(title){
			this.setState({hearderTitle:title})
		}
	}
	//更改头部信息
	changTitle(title){
		this.setState({hearderTitle:title})
	}
	
	componentWillMount(){
		//监听store上state的变化，监听多少次，就触发多少个函数
		//调用监听的方法，会返回一个异常监听的方法
		unsubscribe = store.subscribe(()=>{
			this.setState({hearderTitle: store.getState().title});
		});
			
	}
	componentWillUnmount(){
		//在组件将要销毁时，将监听移除。
		unsubscribe();
	}
}






















