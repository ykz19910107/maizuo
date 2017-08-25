import {createStore} from 'redux'

//state(全局状态)
//	外部方法访问state，执行store.getState()

//action(操作全局状态的事件)
//	外部调用action，执行store.dispatch();

//外部监听state
//var unsubscribe = store.subscribe(function(){ 监听函数 });
//移除监听 unsubscribe();


let count = 0;

//会多次调用的，只有初始化时，state才是空
let reducer = function(state, action){
	if(state == null){
		state = {
			title: '卖座电影',
			city:'深圳',
			shoptitle:''
		};
	}
	
	if(action.type === 'changename'){
		state.title = action.val;
	}
	
	if(action.type === 'changecity'){
		state.city = action.val;
	}

	if(action.type === 'changeShopTitle'){
		state.shoptitle = action.val;
	}
	return state;
}


export default createStore(reducer);
