import React, {Component} from 'react'
import cityService from '../../services/cityService.js'
import '../../css/city.css'

import {Link} from 'react-router-dom'

import store from '../../store'

let distance = [] 
export default class City extends Component{
	constructor(){
		super()
		this.state={
			citydata:[],
			hotcity:['北京','上海','广州','深圳']
		}
	}
	
	render(){
		
		return (
			<div id="city">
				<div>
					{/*Gps定位城市*/}
					<div>
						<p>GPS定位你所在城市</p>
						<ul>
							<li>深圳</li>
						</ul>
					</div>
					{/*热门城市*/}
					<div>
						<p>热门城市</p>
						<ul>
							{this.state.hotcity.map((item,index)=>{
								return(
									<li key={index}>
										<Link to="/" onClick={this.change.bind(this,item)}>{item}</Link>
									</li>
								)
							})}
						</ul>
					</div>
					{/*按字母排序*/}
					<div>
						<p>按字母排序</p>
						<ul>
							{this.state.citydata.map((item,index)=>{
								for(var i in item){
									return(
										<li key={index}>
											<a onClick={this.scrollTo.bind(this,index)}>{i}</a>
										</li>
									)
								}
							})}
						</ul>
					</div>
					{/*显示各个字母开头的城市*/}
					
					{this.state.citydata.map((item,index)=>{
						for(var i in item){
							return(
								<div key={index}>
									<p id={index}>{i}</p>
									<ul>
										{item[i].map((k,j)=>{
											return(
												<li key={j}>
													<Link to="/" onClick={this.change.bind(this,k.name)}>{k.name}</Link>
												</li>
											)
										})}
									</ul>
								</div>
							)
						}
					})}
				</div>
			</div>
		)
	
	}
	
	componentWillMount(){
		//城市数据请求
		cityService.getCityData()
		.then((res)=>{
			this.setState({citydata:res})
		})
		
	}
	componentDidUpdate(){
		var arr=[]
		this.state.citydata.map((item,index)=>{
			var p = document.getElementById(index).offsetTop-47
			arr.push(p)
		})
		distance=arr
	}
	//点击页面滚动到相应位置
	scrollTo(index){
		window.scrollTo(0,distance[index])
	}

	change(name){
		store.dispatch({
			//事件名字
			type: 'changecity',
			//参数
			val:name
		});
	}
}