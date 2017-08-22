import React, {Component} from 'react'
import shopService from '../../services/shopService.js'

export default class Shop extends Component{
	
	render(){
		return (
			<div class="page" id="shop">
				商城
			</div>
		)
	}
	
	componentWillMount(){
		shopService.getShoplist()
		.then((res)=>{
			console.log(res)
		})
	}
}