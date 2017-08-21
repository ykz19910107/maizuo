import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import store from '../../store'

export default class ComingSoon extends Component{
	render(){
		return(
			<div class="comingSoon">
				{this.props.data.map((item,index)=>{
					return(
						<Link key={index} to={"/film-details/"+item.id} onClick={this.modify.bind(this,item)}>
							<img src={item.path} />
							<div>
								<h3>{item.name}<span>{item.premiereAt}</span></h3>
							</div>
						</Link>
					)
				})}
				<Link class="more" to="/film-list/coming-soon">更多即将上映电影</Link>
			</div>
		)
	}
	
	//更改页面头部信息
	modify(item){
		store.dispatch({
			//事件名字
			type: 'changename',
			//参数
			val: item.name
		});
	}
}











