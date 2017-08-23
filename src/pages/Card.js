import React, {Component} from 'react'
import '../css/card.css'

export default class Card extends Component{
	constructor() {
	    super()
	    this.state={
	    	ishow:true
	    }
	}
	
	render(){
		let active1 = this.state.ishow ? "active" : ""
		let active2 = this.state.ishow ? "" : "active"
		return (
			<div class="page" id="card">
				{/*头部导航*/}
				<nav class="nave">
					<a class={active1} onClick={this.changeAction.bind(this,1)}>卖座卡</a>
					<a class={active2} onClick={this.changeAction.bind(this,2)}>电子卖座卡</a>
				</nav>
				{/*卡号密码输入*/}
				<form>
					{this.state.ishow ?
						<div>
							<div class="username">
								<span>卡号  : </span>
								<input type="text" placeholder="请输入卡号" />
							</div>
							<div class="pwd">
								<span>密码 : </span>
								<input type="text" placeholder="请输入密码" />
							</div>
						</div>
						:
						<div>
							<div class="username">
								<span>卡号 : </span>
								<input type="text" placeholder="请输入15位电子卖座卡号" />
							</div>
						</div>
					}
					<button>查询</button>
				</form>
			</div>
		)
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