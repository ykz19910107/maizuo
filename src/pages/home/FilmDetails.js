import React, {Component} from 'react'
import homeService from '../../services/homeService.js'
import'../../css/filmDetails.css'
//var detectBack = {
//
//  initialize: function() {
//      //监听hashchange事件
//      window.addEventListener('hashchange', function() {
//
//          //为当前导航页附加一个tag
//          this.history.replaceState('hasHash', '', '');
//
//      }, false);
//
//      window.addEventListener('popstate', function(e) {
//
//          if (e.state) {
//              //侦测是用户触发的后退操作, dosomething
//              //这里刷新当前url
//              this.location.reload();
//          }
//      }, false);
//  }
//}
//detectBack.initialize(); 

export default class FilmDetails extends Component{
	constructor({location}) {
	    super()
	    let pathname = location.pathname
	    pathname=pathname.split('/')[2]
	    this.state={
	    	id:pathname,
	    	filmDetails:[],
	    	detailsscroll:null
	    }
	}
	render(){
		let data = this.state.filmDetails ? this.state.filmDetails :"null"
		
		return(
			<div id="filmdetails" class="page">
				<div class='main'>
					<div class="wrap">
						<img src={data.path}/>
						<div class="filmmain">
							<h3><i></i>影片简介</h3>
							<p>导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演&nbsp;:&nbsp;&nbsp;{data.director}</p>
							<p>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演&nbsp;:&nbsp;&nbsp;{data.actors}</p>
							<p>地区语言&nbsp;:&nbsp;&nbsp;{data.areaLanguage}</p>
							<p>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型&nbsp;:&nbsp;&nbsp;{data.category}</p>
							<p>上映日期&nbsp;:&nbsp;&nbsp;{data.day}</p>
							<p>{data.synopsis}</p>
						</div>
					</div>
				</div>
				<div class="buyTicket">立即购票</div>
			</div>
		)
	}
	
	componentWillMount(){
		//请求电影详情数据
		homeService.getfilmDetailsData(this.state.id)
		.then((res)=>{
			this.setState({filmDetails:res})
		})
	}
	
	componentDidMount(){
		//创建滚动视图
		this.state.detailsscroll = new IScroll('#filmdetails .main',{
			probeType: 3,
			momentum:false,
			bounce:false
		})
		this.setState({detailsscroll:this.state.detailsscroll})
	}
	
	componentDidUpdate(){
		//刷新滚动视图
		this.state.detailsscroll.refresh()
	}
}
