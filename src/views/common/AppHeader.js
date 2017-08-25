import React, {Component} from 'react'

import {Link} from 'react-router-dom'

export default class AppHeader extends Component{
	render(){
		return(
			<header id="header">
				<i class="iconfont icon-meun" onClick={this.showAction.bind(this)}></i>
				<p class="title" onClick={this.showAction.bind(this)}>{this.props.title}</p>
				<div class='header-right'>
					<Link to="/city-list" onClick={this.changeAction.bind(this,"选择城市")}>
						<span>{this.props.city}</span>
						<i class="iconfont icon-down"></i>
					</Link>
					<Link class="iconfont icon-me" to="/me" onClick={this.changeAction.bind(this,"登录")}></Link>
				</div>
			</header>
		)
	}
	
	//控制测边栏显示
	showAction(){
		this.props.show()
	}
	//更改头部信息
	changeAction(val,e){
		this.props.change(val)
	}
}