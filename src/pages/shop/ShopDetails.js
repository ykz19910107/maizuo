import React,{Component} from 'react'
import shopService from '../../services/shopService.js'



export default class ShopDetails extends Component{
    constructor({location}){
        super()
        var pathname = location.pathname.split('/')[2]
        this.state={
            id:pathname,
            list:false,
            data:[]
        }
    }
    render(){
        var image = this.state.data.length != 0 ? this.state.data.skuList[0].imageSrc[0] : null
        return(
            <div id='shopdetails'>
                <div class='title'>
                    {/*轮播图*/}
                    <div class="swiper-container banner" >
                        <div class="swiper-wrapper">
                            {image != null ? 
                                <div class="swiper-slide" ><img src={image} /></div>
                            :null}
                        </div>
                        {/*轮播icon*/}
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
                <div id='content-list'></div>
            </div>
        )
    }

    componentWillMount(){
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
        })
    }
}