import React, {Component} from 'react'
import homeService from '../../services/homeService.js'
import'../../css/filmList.css'

import ListContent from '../../components/home/ListContent.js'

let num = 0;
let page = 1
export default class FilmList extends Component{
	constructor({location}) {
	    super()
	    let pathname = location.pathname
	    pathname=pathname.split('/')[2]
	    this.state={
	    	ishow:true,
	    	list:[],
	    	getData:pathname,
	    	listscroll:null
	    }
	}
	
	
	render(){
		let active1 = this.state.ishow ? "active" : ""
		let active2 = this.state.ishow ? "" : "active"
		return(
			<div id="filmList" class="page">
				<div class="main">
					<div class="wrap">
						<nav class="nave">
							<a class={active1} onClick={this.changeAction.bind(this,1)}>正在热映</a>
							<a class={active2} onClick={this.changeAction.bind(this,2)}>即将上映</a>
						</nav>
						{/****列表***/}
						<ListContent data={this.state.list} />
					</div>
				</div>
				<i class="iconfont icon-bottom" ref='icon' onClick={this.scrollTop.bind(this)}></i>
			</div>
		)
	}
	
	componentWillMount(){
		if(this.state.getData == "coming-soon"){
			this.setState({ishow:false})
		}
		
		homeService.getFilmList(this.state.getData,page)
		.then((res)=>{
			this.setState({list:res})
		})
		
	}
	componentDidMount(){
		//创建滚动视图
		this.state.listscroll = new IScroll('#filmList .main',{
			probeType: 3,
			momentum:false,
			bounce:false
		})
		this.setState({listscroll:this.state.listscroll})
		
		this.state.listscroll.on("scroll",()=>{
			if(this.state.listscroll.y<=(-295-896*num) && this.state.listscroll.y>=(-419-896*num)){
				num += 1
				page += 1
				homeService.getFilmList(this.state.getData,page)
				.then((res)=>{
					res.map((item)=>{this.state.list.push(item)})
					this.setState({list:this.state.list})
				})
			};
			
			if(this.state.listscroll.y<=-180){
				this.refs.icon.style.transform="translateY(0px)"
			}else{
				this.refs.icon.style.transform="translateY(58px)"
			}
		})
	}
	
	componentDidUpdate(){
		//刷新滚动视图
		this.state.listscroll.refresh()
	}
	
	
	changeAction(val){
		if(val=="1"){
			num = 0;
			page = 1
			this.setState({ishow:true,list:[],getData:"now-playing"})
			homeService.getFilmList("now-playing",1)
			.then((res)=>{
				this.setState({list:res})
			})
		}
		else if(val=="2"){
			num = 0;
			page = 1
			this.setState({ishow:false,list:[],getData:"coming-soon"})
			homeService.getFilmList("coming-soon",1)
			.then((res)=>{
				this.setState({list:res})
			})
		}
	}
	
	//滚动到顶部
	scrollTop(){
		this.state.listscroll.scrollTo(0,0,200)
	}
}
