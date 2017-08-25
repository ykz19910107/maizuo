import React, {Component} from 'react'
import shopService from '../../services/shopService.js'
import ContentList from '../../components/shop/ContentList.js'
import GoodChoiceList from '../../components/shop/GoodChoiceList.js'

import {Link} from 'react-router-dom'
import store from '../../store'

import'../../css/shop.css'

let mySwiper=null
let timer
var num=0


export default class Shop extends Component{
	constructor() {
	    super()
	    this.state={
	    	shopData:[],
	    	page:1,
	    	goodChoiceData:[]
	    }
	}
	
	render(){
		var data = this.state.shopData
		return (
			<div id="shop">
				<div class="main">
					<div class="wrap">
						{/*轮播图*/}
						<div class="swiper-container banner" >
							<div class="swiper-wrapper">
							    {data.length !=0 ? data[1][2].map((item,index)=>{
							    	return   <div class="swiper-slide" key={index}><img src={item.imageSrc} /></div>
							    }):null}
							</div>
							{/*轮播icon*/}
							<div class="swiper-pagination"></div>
						</div>
						{/*轮播图下的导航栏*/}
						{data.length !=0 ?
							<ul class="nave">
								{data[0][1].map((item,index)=>{
									var arr = item.url.split('/')
									return(
										<li key={index}>
											<Link to={'/shop-navedetails/'+arr[4]+'?id='+arr[5]} onClick={this.change.bind(this,item.name)}>
												<img src={item.imageSrc} />
												<span>{item.name}</span>
											</Link>
										</li>
									)
								})}
							</ul>
						:null}
						{/*导航栏下的小列表*/}
						{data.length !=0 ?
							<ul class="contain">
								{data[2][3].map((item,index)=>{
									return(
										<li key={index}>
											<a>
												<img src={item.imageSrc} />
											</a>
										</li>
									)
								})}
							</ul>
						:null}
						{/*有品专区*/}
						{data.length !=0 && data[3][4] !=0 ?
							<div class='prefecture'>
								<h3>－ 有品专区 －</h3>
								{data[3][4].map((item,index)=>{
									return <img src={item.imageSrc} key={index} />
								})}
							</div>
						:null}
						{/*商品列表内容*/}
						{data.length !=0 ?<ContentList data={data[4][5]} />:null}
						{/*好货精选*/}
						{this.state.goodChoiceData.length !=0 ?
							<GoodChoiceList data={this.state.goodChoiceData} />
						:
							<div class="none">
								<h3>－ 好货精选 －</h3>
								<p>暂无数据</p>
								<p>~貌似没有更多了~</p>
							</div>
						}
					</div>
				</div>
			</div>
		)
	}
	
	componentWillMount(){
		//商城首页列表数据请求
		shopService.getShoplist()
		.then((res)=>{
			this.setState({shopData:res})
			//创建轮播
			mySwiper = new Swiper('.swiper-container', {
				loop: true,
				autoplay: 2000,//可选选项，自动滑动
				autoplayDisableOnInteraction : false,
				pagination: '.swiper-pagination',
        		paginationClickable: true
			})
		})
		
		//商城首页好货精选数据请求
		shopService.getgoodChoice(this.state.page)
		.then((res)=>{
			this.setState({goodChoiceData:res})
		})
	}
	
	
	componentDidMount(){
		//监听页面滚动
		var that = this
		window.addEventListener('scroll', function(){
			if(window.scrollY>=(3410+2160*num) && window.scrollY<=(3838+2160*num)){
				num += 1
				that.state.page += 1
				shopService.getgoodChoice(that.state.page)
				.then((res)=>{
					res.map((item)=>{that.state.goodChoiceData.push(item)})
					that.setState({goodChoiceData:that.state.goodChoiceData})
				})
			};
		 })
	}
	
	
	change(name){
		store.dispatch({
			type:'changeShopTitle',
			val:name
		})
	}
}