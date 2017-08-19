import React, {Component} from 'react'
import homeService from '../../services/homeService.js'
import'../../css/filmList.css'

import ListContent from '../../components/home/ListContent.js'

export default class FilmList extends Component{
	constructor({location}) {
	    super()
	    let pathname = location.pathname
	    pathname=pathname.split('/')[2]
	    console.log(pathname)
	    this.state={
	    	ishow:true,
	    	list:[],
	    	getData:pathname
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
			</div>
		)
	}
	
	componentWillMount(){
		if(this.state.getData=="now-playing"){
			homeService.getHotshowing(1)
			.then((res)=>{
				this.setState({list:res})
			})
		}
		else if(this.state.getData=="coming-soon"){
			homeService.getAboutto(1)
			.then((res)=>{
				this.setState({list:res})
			})
		}
	}
	
	
	
	changeAction(val){
		if(val=="1"){
			this.setState({ishow:true})
		}
		else if(val=="2"){
			this.setState({ishow:false})
		}
	}
}
