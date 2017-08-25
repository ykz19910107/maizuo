import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class ContentList extends Component{
	render(){
		var data = this.props.data
		return(
			<div class="content">
				{data.map((item,index)=>{
						return(
							<dl key={index}>
								<dt>
									<img src={item.imageSrc} />
								</dt>
								<dd>
									{item.products.map((list,i)=>{
										return(
											<Link key={i} to={'/shop-details/'+list.id}>
												<img src={list.image} />
												<p>{list.name}</p>
												<span>￥{list.price/100+'.00'}</span>
											</Link>
										)
									})}
									<a>
										<i>全部</i>
									</a>
								</dd>
							</dl>
						)
					})
				}
			</div>
		)
	}
}


























