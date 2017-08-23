import React, {Component} from 'react'
import '../css/me.css'

export default class Me extends Component{
	
	render(){
		return (
			<div class="page" id="me">
				<form>
					<div class="username">
						<input type="text" placeholder="输入手机号/邮箱" />
					</div>
					<div class="pwd">
					<input type="password" placeholder="输入密码/验证码"  />
					</div>
					<button>登录</button>
				</form>
			</div>
		)
	}
	
}