import axios from 'axios'
import API from '../api'

//城市数据请求
function getCityData(){
	return new Promise((resolve,reject)=>{
		axios.get(`${API.CityData}?_t=${new Date().getTime()}`)
		.then((res)=>{
			var arr={}
			console.log(res.data.data.cities)
		})
		.catch((error)=>{
			console.log(error)
		})
	})
}



export default{
	getCityData
}




