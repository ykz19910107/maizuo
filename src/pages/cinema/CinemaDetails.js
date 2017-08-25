import React, {Component} from 'react'

import CinemaService from '../../services/cinemaservice.js'

import Bottomlist from '../../components/cinema/bottom-list.js'



import '../../css/cinema.css'

export default class CinemaDetails extends Component{
	constructor({location}) {
	    super()
	    let pathname = location.pathname
	    pathname = pathname.split('/')[2]
	    this.state = {
	    	id:pathname,
	    	data:[]
	    }
	}
	
	render(){
		let details = this.state.data ? this.state.data : null
		return(
			<div id="cinemadetails">
				<div>
					<img src="//static.m.maizuo.com/v4/static/app/asset/66461d1a02a9eaa64876c90952c42aed.png" />
					<ul>
						<li>
							<i class="iconfont icon-menu"></i>
							<div>
								<h3>订座票</h3>
								<p>选好场次及座位，到影院自助机取票</p>
								<span>立即订座</span>
							</div>
						</li>
						<li>
							<i class="iconfont icon-menu"></i>
							<div>
								<h3>通兑票</h3>
								<p>有效期内到影院前台兑换影票</p>
								<span>立即订座</span>
							</div>
						</li>
						<li>
							<i class="iconfont icon-menu"></i>
							<div>
								<h3>小卖品</h3>
								<span>购买</span>
							</div>
						</li>
						<li>
							<i class="iconfont icon-menu"></i>
							<div>
								<h3>{this.state.data.address}</h3>
							</div>
						</li>
						<li>
							<i class="iconfont icon-menu"></i>
							<div>
								<h3>{this.state.data.telephones}</h3>
							</div>
						</li>
					</ul>
					{/*底部列表*/}
					<Bottomlist data={details} />
				</div>
			</div>
		)
	}
	componentWillMount(){
		window.scrollTo(0,0)
		CinemaService.getCinemaDetails(this.state.id)
		.then((res)=>{
			this.setState({data:res})
		})
		
		
	}
	
}













