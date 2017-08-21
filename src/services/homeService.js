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
				obj.id=item.id
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
		axios.get(`${API.comingSoon}?page=1&count=3&__t=${new Date().getTime()}`)
		.then((res)=>{
			var newArr = res.data.data.films.map((item)=>{
				var obj ={}
				var day = new Date(item.premiereAt)
				var newday = day.getMonth()+1+"月"+day.getDate()+"日"
				obj.name=item.name
				obj.id=item.id
				obj.premiereAt = newday//上映日期
				obj.path=item.cover.origin//图片
				return obj
			})
			resolve(newArr)
		})
	})
}

//请求电影详情数据
function getfilmDetailsData(id){
	return new Promise((resolve,reject)=>{
		axios.get(`${API.filmDetailsData}/${id}?__t=${new Date().getTime()}`)
		.then((res)=>{
			var item = res.data.data.film
			var newArr=item.actors.map((item)=>{
				return item.name
			})
			var actors=newArr.join(" | ")
			var day = new Date(item.premiereAt)
			var newday = day.getMonth()+1+"月"+day.getDate()+"日上映"
			var obj = {}
			obj.name=item.name
			obj.director=item.director//导演
			obj.areaLanguage = item.nation+"("+item.language+")"//地区语言
			obj.actors=actors//主演
			obj.premiereAt = newday//购票人数
			obj.path=item.cover.origin//图片
			obj.day = newday//上映日期
			obj.category=item.category//类型
			obj.synopsis = item.synopsis//介绍
			resolve(obj)
		})
		.catch((error)=>{
			console.log(error)
		})
	})
}


//请求正在热映电影或即将上映电影列表数据

function getFilmList(mold,page){
	return new Promise((resolve,reject)=>{
		axios.get(`${API.filmDetailsData}/${mold}?page=${page}&count=7`)
		.then((res)=>{
			var newArr=res.data.data.films.map((item)=>{
				var obj = {}
				obj.name = item.name
				obj.id = item.id
				obj.cinemaCount = item.cinemaCount//上映影院数
				obj.grade = mold == "coming-soon" ? null : item.grade //评分
				obj.watchCount = item.watchCount//购票人数
				obj.path = item.poster.thumbnail//图片路径
				obj.intro = item.intro//评价
				return obj
			})
			resolve(newArr)
		})
		.catch((error)=>{
			console.log(error)
		})
	})
}


export default {
	getHomeBanner,
	nowPlaying,
	getComingSoon,
	getfilmDetailsData,
	getFilmList
}
