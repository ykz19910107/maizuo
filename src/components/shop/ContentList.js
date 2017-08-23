import React, {Component} from 'react'

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
											<a key={i}>
												<img src={list.image} />
												<p>{list.name}</p>
												<span>￥{list.price/100+'.00'}</span>
											</a>
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


























