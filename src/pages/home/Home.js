import React, {Component} from 'react'
import'../../css/home.css'

import homeService from '../../services/homeService.js'
import NowPlaying from '../../components/home/NowPlaying.js'
import ComingSoon from '../../components/home/ComingSoon.js'

let mySwiper=null

export default class Home extends Component{
	constructor() {
	    super()
	    this.state={
	    	bannerData:[],
	    	nowPlaying:[],
	    	homeScroll:null,
	    	comingSoon:[]
	    }
	}
	
	render(){
		let banner = this.state.bannerData ? this.state.bannerData : []
		let noeplaying = this.state.nowPlaying
		return (
			<div id="home" class="page" >
				<div class='main'>
					<div class="wrap">
						{/*轮播图*/}
						<div class="swiper-container banner" >
							<div class="swiper-wrapper">
							    {banner.map((item,index)=>{
							    	return   <div class="swiper-slide" key={index}><img src={item.imageUrl} /></div>
							    })}
							</div>
						</div>
						
						{/*正在播放的影片*/}
						<NowPlaying data = {this.state.nowPlaying}/>
						
						{/*即将上映*/}
						<p class="line">
							<span class='coming-title'>即将上映</span>
						</p>
						<ComingSoon data ={this.state.comingSoon} />
					</div>
				</div>
				<i class="iconfont icon-bottom" ref='icon' onClick={this.scrollTop.bind(this)}></i>
			</div>
		)
	}
	
	
	componentWillMount(){//请求轮播图数据
		homeService.getHomeBanner()
		.then((res)=>{
			//将最后一张添加到第一位置
			this.setState({bannerData:res});
			
			//创建轮播
			mySwiper = new Swiper('.swiper-container', {
				loop: true,
				autoplay: 2000,//可选选项，自动滑动
				autoplayDisableOnInteraction : false
			})
			
		})
		
		//请求正在热映电影数据
		homeService.nowPlaying()
		.then((data)=>{
			this.setState({nowPlaying:data})
		})
		
		homeService.getComingSoon()
		.then((data)=>{
			this.setState({comingSoon:data})		
		})
		
	}
	
	//创建滚动视图
	componentDidMount(){
		this.state.homeScroll = new IScroll('#home .main',{
			probeType: 3,
			momentum:false,
			bounce:false
		})
		this.setState({homeScroll:this.state.homeScroll})
		this.state.homeScroll.on('scroll',()=>{
			if(this.state.homeScroll.y<=-180){
				this.refs.icon.style.transform="translateY(0px)"
			}else{
				this.refs.icon.style.transform="translateY(58px)"
			}
		})
	}
	
	
	componentDidUpdate(){
		//刷新滚动视图
		this.state.homeScroll.refresh()
	}
	
	//滚动到顶部
	scrollTop(){
		this.state.homeScroll.scrollTo(0,0,200)
	}
}
