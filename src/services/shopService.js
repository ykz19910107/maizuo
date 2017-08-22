import axios from 'axios'
import API from '../api'

//获取商城列表，轮播数据
function getShoplist(){
	return new Promise((resolve,reject)=>{
		axios.get(API.shopList)
		.then((res)=>{
			var arr = []
			res.data.data.map((item)=>{
				if(arr.indexOf(item.type) == -1){
					return arr.push(item.type)
				}
			})
			
			var newArr=[]
			arr.map((item,index)=>{
				var obj={};
				obj[item]=[];
				res.data.data.map((num)=>{
					if(arr[index] == num.type){
						obj[item].push(num)
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


export default{
	getShoplist
}



