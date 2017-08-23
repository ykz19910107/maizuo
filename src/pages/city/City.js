import React, {Component} from 'react'
import cityService from '../../services/cityService.js'

export default class City extends Component{
	
	render(){
		
		return (
			<div class="page">
				城市
			</div>
		)
	
	}
	
	componentWillMount(){
		//城市数据请求
		cityService.getCityData()
		.then((res)=>{
			
		})
		
	}
	
}