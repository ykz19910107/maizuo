import React, {Component} from 'react'

import {Link} from 'react-router-dom'

export default class AppHeader extends Component{
	render(){
		return(
			<header id="header" onClick={this.showAction.bind(this)}>
				<i class="iconfont icon-meun" onClick={this.showAction.bind(this)}></i>
				<p class="title">{this.props.title}</p>
				<div class='header-right'>
					<Link to="/city-list">
						<span onClick={this.changeAction.bind(this,"选择城市")}>深圳</span>
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
	changeAction(val){
		this.props.change(val)
	}
}