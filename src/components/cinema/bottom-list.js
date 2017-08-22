import React,{Component} from 'react'



export default class Bottomlist extends Component{
	constructor() {
	    super()
	    this.state={
	    	ishow:0
	    }
	}
	
	render(){
		let content = this.props.data
		let services = content.length !=0 ? content.services[this.state.ishow] : null
		return(
			<div class="bottom-list">
				<ul>
					{content.length !=0 ? content.services.map((item,index)=>{
						for(var i in item){
							return (
								<li key={index} onClick = {this.change.bind(this,index)} class={this.state.ishow==index?"active":''}>
									<i class="iconfont icon-menu" style={this.state.ishow==index?{color:"#fe8233",borderColor:"#fe8233"}:{color:"#cdcdcd",borderColor:"#cdcdcd"}}></i>
									<span>{i}</span>
								</li>
							)
						}
					}) : null}
				</ul>
				<p>
					{services ? (function (){for(var j in services){
						return (services[j]!=null ? services[j].description : "暂无信息")
					}})(): null}
				</p>
			</div>
		)
	}
	
	//改变列表显示
	change(index){
		this.setState({ishow:index})
	}
}
















