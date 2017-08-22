import React, {Component} from 'react'

import CinemaService from '../../services/cinemaservice.js'
import {Link} from 'react-router-dom'
import store from '../../store'

import '../../css/cinema.css'



var timer;

export default class Cinema extends Component{
	constructor() {
	    super()
	    this.state={
	    	title:[],
	    	ishow:0,
	    	contentcroll:null,
	    	putDown:[]
	    }
	}
	
	render(){
		let nowPutDown = this.state.putDown
		return (
			<div id="cinema" ref="scroll">
				<div class="main">
					<div class="wrap">
						<div class="title-list">
							{this.state.title.map((item,index)=>{
								for(var j in item){
									return(
										<dl key={index}>
											<dt onClick={this.changeAction.bind(this,index)}>{j}</dt>
											{nowPutDown[index].judge && this.state.ishow == index ? item[j].map((content,i)=>{
												return(<dd key={i}>
															<Link to={'/cinema-details/'+content.id} onClick={this.changeTitle.bind(this,content.name)}>
																<h3>
																	<span>{content.name}</span>
																	<em>座</em>
																	<em>通</em>
																	<i class="iconfont icon-menu"></i>
																</h3>
																{content.labels ? <strong>{content.labels}</strong> : null}
																<p>{content.address}</p>
																<p>{content.distance}</p>
															</Link>
														</dd>)
											}) : null}
										</dl>
									)
								}
							})}
						</div>
					</div>
				</div>
				<i class="iconfont icon-bottom" ref='icon' onClick={this.scrollTop.bind(this)}></i>
			</div>
		)
	}
	
	//请求影院数据
	componentWillMount(){
		CinemaService.getCinemaData()
		.then((res)=>{
			var arr=[]
			res.map((item)=>{
				arr.push({judge:false})
			})
			arr[0].judge = true
			
			this.setState({title:res,putDown:arr})
		})
	}
	
	componentDidMount(){
		var that = this
		window.addEventListener('scroll', function(){
		 
		 	if(window.scrollY>=180){
				that.refs.icon.style.transform="translateY(0px)"
			}else{
				that.refs.icon.style.transform="translateY(58px)"
			}
		 })
		//创建滚动视图
//		this.state.contentcroll = new IScroll('#cinema .main',{
//			probeType: 3,
//			momentum:false,
//			bounce:false
//		})
//		this.setState({contentcroll:this.state.contentcroll})
//		this.state.contentcroll.on('scroll',()=>{
//			if(this.state.contentcroll.y<=-180){
//				this.refs.icon.style.transform="translateY(0px)"
//			}else{
//				this.refs.icon.style.transform="translateY(58px)"
//			}
//		})
	}
	
	componentDidUpdate(){
		//刷新滚动视图
//		this.state.contentcroll.refresh()
		
	}
	
	//点击收起
	changeAction(index){
		this.state.putDown[index].judge=!this.state.putDown[index].judge
		this.setState({ishow:index,putDown:this.state.putDown})
		//this.state.contentcroll.refresh()
	}
	
	//滚动到顶部
	scrollTop(){
		clearInterval(timer)
		timer = setInterval(function(){
			var y = window.scrollY-100
			window.scrollTo(0,y)
			if(window.scrollY<=0){
				clearInterval(timer)
			}
		},10)
		
	}
	
	//改变页面头部信息
	changeTitle(title){
		store.dispatch({
			//事件名字
			type: 'changename',
			//参数
			val: title
		});
	}
}