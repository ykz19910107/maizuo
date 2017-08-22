import axios from 'axios'
import API from '../api'

//影院请求数据
function getCinemaData(){
	return new Promise((resolve,reject)=>{
		axios.get(`${API.cinemaData}?_t=${new Date().getTime()}`)
		.then((res)=>{
			var arr = []
			res.data.data.cinemas.map((item)=>{
				if(arr.indexOf(item.district.name) == -1){
					return arr.push(item.district.name)
				}
			})
			
			var newArr=[]
			arr.map((item,index)=>{
				var obj={};
				obj[item]=[];
				res.data.data.cinemas.map((num)=>{
					if(arr[index] == num.district.name){
						var newObj = {}
						newObj.name = num.name //名字
						newObj.address = num.address//地址
						newObj.id = num.id
						newObj.geocode = num.geocode//坐标
						newObj.labels = num.labels.length>0 ? "可乐爆米花" : null
						newObj.distance = "距离未知"
						obj[item].push(newObj)
					}
				})
				newArr.push(obj)
			})
			resolve(newArr)
		})
		.catch((error)=>{
			console.log(error)
		})
	})
}

//影院详情数据请求
function getCinemaDetails(id){
	return new Promise((resolve,reject)=>{
		axios.get(`${API.cinemaData}/${id}?_t=${new Date().getTime()}`)
		.then((res)=>{
			var arr=[{"取票":null},{"3D":null},{"停车":null},{"优惠":null},{"交通":null}]
			arr.map((item)=>{
				for(var key in item){
					res.data.data.cinema.services.map((n)=>{
						if(key==n.name){
							item[key]=n
						}
					})
				}
			})
			var obj = {}
			obj.id = res.data.data.cinema.id
			obj.name = res.data.data.cinema.name
			obj.address = res.data.data.cinema.address//地址
			obj.telephones = res.data.data.cinema.telephones//电话
			obj.services = arr//取票、3D、停车、优惠、交通
			resolve(obj)
		})
		.catch((error)=>{
			console.log(error)
		})
	})
}




export default {
	getCinemaData,
	getCinemaDetails
}






