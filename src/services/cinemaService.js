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


export default {
	getCinemaData
}






