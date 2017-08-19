import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class ComingSoon extends Component{
	render(){
		return(
			<div class="comingSoon">
				{this.props.data.map((item,index)=>{
					return(
						<Link key={index} to={"/film-details/"+item.id}>
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
}











