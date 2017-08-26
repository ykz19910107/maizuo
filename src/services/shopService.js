import axios from 'axios'
import API from '../api'

//获取商城列表，轮播数据
function getShoplist(){
	return new Promise((resolve,reject)=>{
		axios.get(API.shopList)
		.then((res)=>{
			var arr = [1,2,3,4,5]
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

//商品演出票详情数据请求
function getNaveActive(path){
	var str = '&page=1&pageSize=20'
	return new Promise((resolve,reject)=>{
		axios.get(API.naveActive+'/'+path+str)
		.then((res)=>{
			res.data.data.products.map((item)=>{
				var s =(item.price/100).toString()
				if(s.indexOf('.')<0){
					s +=".00" 
				}else{
					var arr = s.split('.')
					s = arr[0]+ (arr[1]<10? '.'+arr[1]+'0':'.'+arr[1]+'00')
				}
				item.price = '￥'+s
			})
			resolve(res.data.data)
		})
		.catch((error)=>{
			console.log(error)
		})
	})
}

//除演出票外其他的导航数据请求
function getNaveActive2(path){
	var str = '&page=1&num=20'
	var a = path.split('?')
	var newPath = a[0]+'/items?'+a[1]
	return new Promise((resolve,reject)=>{
		axios.get(API.naveActive+'/'+path)
		.then((res)=>{
			var obj={}
			obj.imageSrc=res.data.data.image
			obj.name = res.data.data.name 
			obj.products = []
			axios.get(API.naveActive+'/'+newPath+str)
			.then((res)=>{
				res.data.data.list.map((item)=>{
					var s =(item.skuList[0].price/100).toString()
					if(s.indexOf('.')<0){
						s +=".00" 
					}else{
						var arr = s.split('.')
						s = arr[0]+ (arr[1]<10? '.'+arr[1]+'0':'.'+arr[1]+'00')
					}
					var obj1={}
					obj1.id = item.id
					obj1.image = item.skuList[0].image
					obj1.name = item.masterName
					obj1.price = '￥'+s
					obj1.salesCount = item.displaySalesCount
					obj.products.push(obj1)
				})
				resolve(obj)
			})
			.catch((error)=>{
				console.log(error)
			})
			
		})
		.catch((error)=>{
			console.log(error)
		})
	})
}

//商品详情页数据请求
//商品详情列表数据请求
function getShopDetailsTitle(id){
	return new Promise((resolve,reject)=>{
		axios.get(API.shopDetailsTitle+'?id='+id)
		.then((res)=>{
			resolve(res.data.data.desc)
		})
		.catch((error)=>{
			console.log(error)
		})
	})
}
//商品详情页头部结构数据请求
function getShopDetails(id){
	return new Promise((resolve,reject)=>{
		axios.get(API.shopDetails+'?id='+id)
		.then((res)=>{
			var obj = {}
			obj.id = res.data.data.id
			obj.masterName = res.data.data.masterName
			obj.options = res.data.data.options
			obj.skuList = []
			res.data.data.skuList.map((item)=>{
			
				var s =(item.marketPrice/100).toString()
				if(s.indexOf('.')<0){
					s +=".00" 
				}else{
					var arr = s.split('.')
					s = arr[0]+ (arr[1]<10? '.'+arr[1]+'0':'.'+arr[1]+'00')
				}
				item.marketPrice = '￥'+s
				obj.skuList.push(item)
			})
			obj.slaveName = res.data.data.slaveName
			resolve(obj)
		})
		.catch((error)=>{
			console.log(error)
		})
	})
}

export default{
	getShoplist,
	getgoodChoice,
	getNaveActive,
	getNaveActive2,
	getShopDetailsTitle,
	getShopDetails
}



