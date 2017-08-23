//参数 __t 当前时间戳
const homeBannerApi = "/v4/api/billboard/home"

//正在热映影片
const nowPlaying = '/v4/api/film/now-playing'

//即将上映
const comingSoon = '/v4/api/film/coming-soon'

//请求电影详情数据
const filmDetailsData = '/v4/api/film'

/////////////////////////////////////////////////////

//影院数据请求
const cinemaData = '/v4/api/cinema'

////////////////////////////////////////////////////

//商城数据请求
const shopList = '/api/ad/list'

//商城好货精选数据请求
const goodChoice = '/api/recommend/home?num=20'

//////////////////////////////////////////////////////
//城市数据请求
const CityData='/v4/api/city'


export default {
	homeBannerApi,
	nowPlaying,
	comingSoon,
	filmDetailsData,
	cinemaData,
	shopList,
	goodChoice,
	CityData
}



