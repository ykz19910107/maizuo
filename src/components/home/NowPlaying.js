import React, {Component} from 'react'

import {Link} from 'react-router-dom'

import store from '../../store'


export default class NowPlaying extends Component{
	
	render(){
		return(
			<div class="noPlaying">
				{this.props.data.map((item,index)=>{
					return(
						<Link key={index} to={"/film-details/"+item.id} onClick={this.modify.bind(this,item)}>
							<img src={item.path} />
							<div>
								<h3>{item.name}</h3>
								<p>
									<span>{item.cinemaCount}家影院上映</span>
									<span>{item.watchCount}人购票</span>
								</p>
							</div>
							<div>
								{item.grade}
							</div>
						</Link>
					)
				})}
				<Link class="more" to="/film-list/now-playing">更多电影</Link>
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



















