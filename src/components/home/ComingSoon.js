import React, {Component} from 'react'

export default class ComingSoon extends Component{
	render(){
		return(
			<div class="comingSoon">
				{this.props.data.map((item,index)=>{
					return(
						<a key={index}>
							<img src={item.path} />
							<div>
								<h3>{item.name}<span>{item.premiereAt}</span></h3>
							</div>
						</a>
					)
				})}
				<div class="more">更多即将上映电影</div>
			</div>
		)
	}
}











