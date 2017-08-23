import React, {Component} from 'react'


export default class GoodChoice extends Component{
	render(){
		return (
			<div class="goodChoice">
				<h3>－ 好货精选 －</h3>
				<div>
					{this.props.data.map((item,index)=>{
						return(
							<dl key={index}>
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
							</dl>
						)
					})}
				</div>
			</div>
		)
	}
}
