import React, {Component} from 'react'



export default class ListContent extends Component{
	render(){
		return(
			<ul>
				{this.props.data.map((item,index)=>{
					return(
						<li key={index}>
							<a>
								<img src={item.path} />
								<div>
									<h3>
										{item.name}
										<span>{item.grade}<i class="iconfont icon-menu"></i></span>
									</h3>
									<p>{item.intro}</p>
									<p><span>{item.cinemaCount}家影院上映</span><span>{item.watchCount}人购票</span></p>
								</div>
							</a>
						</li>
					)
				})}
			</ul>
		)
	}
}
