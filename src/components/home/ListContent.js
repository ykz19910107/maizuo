import React, {Component} from 'react'

import {Link} from 'react-router-dom'

import store from '../../store'

export default class ListContent extends Component{
	render(){
		return(
			<ul class="list">
				{this.props.data.map((item,index)=>{
					return(
						<li key={index}>
							<Link to={"/film-details/"+item.id} onClick={this.modify.bind(this,item)}>
								<img src={item.path} />
								<div>
									<h3>
										{item.name}
										<span>{item.grade}<i class="iconfont icon-menu"></i></span>
									</h3>
									<p>{item.intro}</p>
									{this.props.pathname=="now-playing" ?<p><span>{item.cinemaCount}</span>家影院上映<span>{item.watchCount}</span>人购票</p>
									:<p class="date"><span>{item.day}</span><span>{item.week}</span></p>}
								</div>
							</Link>
						</li>
					)
				})}
			</ul>
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
