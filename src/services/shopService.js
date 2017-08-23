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


//商城首页好货精选数据请求
function getgoodChoice(page){
	return new Promise((resolve,reject)=>{
		axios.get(API.goodChoice+'&page='+page)
		.then((res)=>{
			var newArr=res.data.data.list.map((item)=>{
					var s =(item.skuList[0].price/100).toString()
					if(s.indexOf('.')<0){
						s +=".00" 
					}else{
						var arr = s.split('.')
						s = arr[0]+ (arr[1]<10? '.'+arr[1]+'0':'.'+arr[1]+'00')
					}
					var obj={}
					obj.id = item.id
					obj.masterName = item.masterName
					obj.price = "￥"+s //价格
					obj.img = item.skuList[0].image//图片路径
					obj.displaySalesCount = "已售"+item.displaySalesCount//已售
					return obj
				})
			resolve(newArr)
		})
		.catch((error)=>{
			console.log(error)
		})
	})
}

export default{
	getShoplist,
	getgoodChoice
}



