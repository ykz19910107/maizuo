import axios from 'axios'
import API from '../api'

//home页轮播图请求
function getHomeBanner(){
	return new Promise((resolve, reject)=>{
		axios.get('../../static/data/homeBanner.json')
		.then((response)=>{
			resolve(response.data.data.billboards);
		})
		.catch((error)=>{
			console.log(error)
		})
	})
}

//正在上映电影数据请求
function nowPlaying(){
	return new Promise((resolve,reject)=>{
		axios.get(`${API.nowPlaying}?__t=${new Date().getTime()}`)
		.then((response)=>{
			var newArr = response.data.data.films.map((item)=>{
				var obj ={}
				obj.name=item.name
				obj.cinemaCount = item.cinemaCount//上映影院数
				obj.grade = item.grade//评分
				obj.watchCount = item.watchCount//购票人数
				obj.path=item.cover.origin//图片
				return obj
			})
			resolve(newArr)
		})
		.catch((error)=>{
			console.log(error)
		})
	})
	
}

//即将上映电影数据请求
function getComingSoon(){
	return new Promise((resolve,reject)=>{
		axios.get(`${API.comingSoon}&__t=${new Date().getTime()}`)
		.then((res)=>{
			var newArr = res.data.data.films.map((item)=>{
				var obj ={}
				var day = new Date(item.premiereAt)
				var newday = day.getMonth()+1+"月"+day.getDate()+"日"
				obj.name=item.name
				obj.premiereAt = newday//购票人数
				obj.path=item.cover.origin//图片
				return obj
			})
			resolve(newArr)
		})
	})
}


export default {
	getHomeBanner,
	nowPlaying,
	getComingSoon
}
