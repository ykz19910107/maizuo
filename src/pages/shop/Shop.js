import React, {Component} from 'react'
import shopService from '../../services/shopService.js'
import ContentList from '../../components/shop/ContentList.js'


import'../../css/shop.css'

let mySwiper=null
let timer

export default class Shop extends Component{
	constructor() {
	    super()
	    this.state={
	    	shopData:[]
	    }
	}
	
	render(){
		var data = this.state.shopData
		console.log(data)
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
									return(
										<li key={index}>
											<a>
												<img src={item.imageSrc} />
												<span>{item.name}</span>
											</a>
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
						{/*商品列表内容*/}
						{data.length !=0 ?<ContentList data={data[3][5]} />:null}
						{/*好货精选*/}
					</div>
				</div>
			</div>
		)
	}
	
	componentWillMount(){
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
	}
	
	
	componentDidMount(){
		//创建滚动视图
		
//		this.state.shopScroll = new IScroll('#shop .main',{
//			probeType: 3,
//			momentum:false,
//			bounce:false
//		})
//		this.setState({shopScroll:this.state.shopScroll})
	
		
	}
	
	
	componentDidUpdate(){
		//刷新滚动视图
//		clearTimeout(timer)
//		timer = setTimeout(()=>{
//			this.state.shopScroll.refresh()
//		},100)
//		
	}
}