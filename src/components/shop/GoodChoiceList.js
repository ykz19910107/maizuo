import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class GoodChoice extends Component{
	render(){
		return (
			<div class="goodChoice">
				<h3>－ 好货精选 －</h3>
				<div>
					{this.props.data.map((item,index)=>{
						return(
							<dl key={index}>
								<Link to={'/shop-details/'+item.id}>
									<dt>
										<img src={item.img} />
									</dt>
									<dd>
										<p>{item.masterName}</p>
									</dd>
									<dd>
										<span>{item.price}</span>
										<i>{item.displaySalesCount}</i>
									</dd>
								</Link>
							</dl>
						)
					})}
				</div>
			</div>
		)
	}
}
