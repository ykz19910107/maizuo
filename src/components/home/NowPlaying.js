import React, {Component} from 'react'

export default class NowPlaying extends Component{
	render(){
		return(
			<div class="noPlaying">
				{this.props.data.map((item,index)=>{
					return(
						<a key={index}>
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
						</a>
					)
				})}
				<div class="more">更多电影</div>
			</div>
		)
	}
}



















