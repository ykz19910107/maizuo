import React,{Component} from 'react'
import shopService from '../../services/shopService.js'

let mySwiper=null

export default class ShopDetails extends Component{
    constructor({location}){
        super()
        var pathname = location.pathname.split('/')[2]
        this.state={
            id:pathname,
            list:false,
            data:[],
            index:0,
            num:1
        }
    }
    render(){
        var content = this.state.data.length != 0 ? this.state.data.skuList[this.state.index] : null
        return(
            <div id='shopdetails'>
                {this.state.data.length != 0 ?
                    <div class='title'>
                        {/*轮播图*/}
                        <div class="swiper-container banner" >
                            <div class="swiper-wrapper">
                                    {content.images.map((item,index)=>{
                                         return (
                                            <div class="swiper-slide" key={index}>
                                                <img src={item}  />
                                            </div>
                                         )
                                    })}
                            </div>
                            {/*轮播icon*/}
                            <div class="swiper-pagination"></div>
                        </div>
                        <div class='content'>
                            <h2>{this.state.data.masterName}</h2>
                            <p>{this.state.data.slaveName}</p>
                            <strong>{content.marketPrice}</strong>
                            <div class='webstat'>
                                <span>快递：0.00元</span>
                                <span>销量：{content.salesCount}</span>
                                <span>全国</span>
                            </div>
                        </div>
                        <div class='change'>
                            {this.state.data.options.length !=0 ?
                                <span>选择 规格 数量 </span>
                            :<span>×{this.state.num}</span>}
                            
                            <i class="iconfont icon-menu"></i>
                        </div>
                    </div>
                :null}
                <div id='content-list'></div>
                <div class="foot">
                    <a>
                        <i class='iconfont icon-menu'></i>
                        <span>首页</span>
                    </a>
                    <a>立即购买</a>
                </div>
                <div class='shopcart'></div>
            </div>
        )
    }

    componentWillMount(){
         window.scrollTo(0,0)
        //请求商品图片介绍数据
        shopService.getShopDetailsTitle(this.state.id)
        .then((res)=>{
            this.setState({list:res})
             document.getElementById('content-list').innerHTML=res
        })

        //请求商品详情数据
        shopService.getShopDetails(this.state.id)
        .then((res)=>{
            console.log(res)
            this.setState({data:res})
            if(res.skuList[this.state.index].images.length==1){
                    mySwiper = new Swiper('.swiper-container', {
                    autoplayDisableOnInteraction : false,
                    pagination: '.swiper-pagination',
                    paginationClickable: true
                })
            }
            else{
                    mySwiper = new Swiper('.swiper-container', {
                    loop: true,
                    autoplay: 2000,//可选选项，自动滑动
                    autoplayDisableOnInteraction : false,
                    pagination: '.swiper-pagination',
                    paginationClickable: true
                })
            }
        })
    }
}