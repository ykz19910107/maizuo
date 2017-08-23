import axios from 'axios'
import API from '../api'

//城市数据请求
function getCityData(){
	return new Promise((resolve,reject)=>{
		axios.get(`${API.CityData}?_t=${new Date().getTime()}`)
		.then((res)=>{
			var arr=["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","W","X","Y","Z"]
			var newArr=[]
			arr.map((item)=>{
				var obj = {}
				obj[item] = []
				res.data.data.cities.map((pinyin)=>{
					var str = pinyin.pinyin.charAt(0).toUpperCase()
					if(item == str){
						obj[item].push(pinyin)
					}
				})
				newArr.push(obj)
			})
			console.log(newArr)
		})
		.catch((error)=>{
			console.log(error)
		})
	})
}



export default{
	getCityData
}




