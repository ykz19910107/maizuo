import React,{Component} from 'react'
import shopService from '../../services/shopService.js'

let mySwiper=null
let timer;

export default class ShopDetails extends Component{
    constructor({location}){
        super()
        var pathname = location.pathname.split('/')[2]
        this.state={
            id:pathname,
            list:false,
            data:[],
            index:0,
            num:1,
            ishow:false,
            change:null
        }
    }
    render(){
        var content = this.state.data.length != 0 ? this.state.data.skuList[this.state.index] : null
        var display = this.state.ishow ? {display:"block"} :{display:"none"}
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
                        <div class='change' onClick={this.cartShow.bind(this)}>
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
                {this.state.data.length !=0 ?
                    <div class='shopcart' style={display}>
                        <ul>
                            <li>
                                <img src={content.images[0]} />
                                <div class='cart-change'>
                                    <h3>{content.marketPrice}</h3>
                                    <p>选择 规格 数量 </p>
                                </div>
                                <i onClick={this.cartShow.bind(this)}>×</i>
                            </li>
                            <li>
                                <h4>{this.state.data.options[0].name}</h4>
                                {this.state.data.options[0].item.map((item,index)=>{
                                return(<a key={index} onClick={this.activeAction.bind(this,index)} class={this.state.change==index?'active':''}>{item}</a>) 
                                })}
                            </li>
                            <li>
                                <h4>选择数量</h4>
                                <div class='changenum'>
                                    <span onClick={this.changeNum.bind(this,"sub")}>-</span>
                                    <span>{this.state.num}</span>
                                    <span onClick={this.changeNum.bind(this,"push")}>+</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                :null}
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
            this.setState({data:res})
             mySwiper = new Swiper('.swiper-container', {
                loop: true,
                autoplay: 2000,//可选选项，自动滑动
                autoplayDisableOnInteraction : false,
                pagination: '.swiper-pagination',
                paginationClickable: true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper 
                // observeParents:false,//修改swiper的父元素时，自动初始化swiper 
            }) 
        })
    }

    //隐藏显示购物车
    cartShow(){
        this.state.ishow = !this.state.ishow 
        this.setState({ishow:this.state.ishow})
    }

    //改变选中商品
    activeAction(index){
        this.setState({index:index,change:index})
        timer = setTimeout(function(){
            mySwiper.update();          
            mySwiper.reLoop(); 
            mySwiper.startAutoplay();
        })
    }
    changeNum(val){
        if(val=="sub"){
            if(this.state.num<=1){
                this.setState({num:1})
            }else{
                this.state.num-=1;
                this.setState({num:this.state.num})
            }
        }
        else if(val=="push"){
            this.state.num += 1;
            this.setState({num:this.state.num})
        }
    }
}