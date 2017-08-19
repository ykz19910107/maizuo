import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import menu from '../../services/silderBarInfo.js'

let coverStyle;
let timer;

export default class SilderBar extends Component{
	render(){
		let active=null
		coverStyle = {
			background: this.props.ishow?"null" : "rgba(0,0,0,0)",
		}
		if(this.props.ishow==false){
			active = {transform: 'translateX(-100%)'}
			clearTimeout(timer)
			timer=setTimeout(()=>{
				document.getElementsByClassName('siderbar')[0].style.display='none';
			},500)
		}else{
			document.getElementsByClassName('siderbar')[0].style.display='block';
			
			setTimeout(()=>{
				
				document.getElementsByClassName('siderbar')[0].style.background="rgba(0,0,0,0.5)";
				document.getElementsByClassName('nav')[0].style.transform="translateX(0%)"
			})
		}
		let data = this.props.pathname === "/shop" ? menu.shopSilderBarData : menu.homeSilderBarData
		return(
			<div>
				<div class="siderbar" style={coverStyle} onClick={this.show.bind(this)}>
					<nav style={active} class="nav">
						{data.map((item,index)=>{
							return (<a key={index} class="bottom-1px" onClick={this.getLink.bind(this,item)}>
										{item.title}
										<i class="iconfont icon-right"></i>
									</a>)
						})}
					</nav>
				</div>
			</div>
		)
	}
	
	getLink(item){
		this.props.history.push(item.path)
		this.props.hideHandle(item.header)
	}
	
	show(){
		this.props.hideHandle()
	}
}
