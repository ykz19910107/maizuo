import React, {Component} from 'react'

import CinemaService from '../../services/cinemaservice.js'
import {Link} from 'react-router-dom'

import '../../css/cinema.css'

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false)
export default class Cinema extends Component{
	constructor() {
	    super()
	    this.state={
	    	title:[],
	    	contentcroll:null,
	    	ishow:0,
	    	putDown:[]
	    }
	}
	
	render(){
		let nowIshow = this.state.ishow
		let nowPutDown = this.state.putDown
		return (
			<div class="page" id="cinema">
				<div class="main">
					<div class="wrap">
						<div class="title-list">
							{this.state.title.map((item,index)=>{
								for(var j in item){
									return(
										<dl key={index}>
											<dt onClick={this.changeAction.bind(this,index)}>{j}</dt>
											{nowIshow==index && nowPutDown[index].judge  ? item[j].map((content,i)=>{
												return(<dd key={i}>
															<Link to={'/cinema-details/'+content.id}>
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
		//创建滚动视图
		this.state.contentcroll = new IScroll('#cinema .main',{
			probeType: 3,
			momentum:false,
			bounce:false
		})
		this.setState({contentcroll:this.state.contentcroll})
		this.state.contentcroll.on('scroll',()=>{
			if(this.state.contentcroll.y<=-180){
				this.refs.icon.style.transform="translateY(0px)"
			}else{
				this.refs.icon.style.transform="translateY(58px)"
			}
		})
	}
	
	componentDidUpdate(){
		//刷新滚动视图
		this.state.contentcroll.refresh()
	}
	
	//点击收起
	changeAction(index){
		this.state.putDown[index].judge=!this.state.putDown[index].judge
		this.setState({ishow:index,putDown:this.state.putDown})
		this.state.contentcroll.refresh()
	}
	
	//滚动到顶部
	scrollTop(){
		this.state.contentcroll.scrollTo(0,0,200)
	}
}