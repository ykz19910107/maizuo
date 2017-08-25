import React,{Component} from 'react'
import shopService from '../../services/shopService.js'
import store from '../../store'

export default class ShopDetails extends Component{
    constructor({location}){
        super()
        var pathname = location.pathname.split('/')[2]+location.search
        var oClass = location.pathname.split('/')[2]
        this.state={
            path:pathname,
            shopDetailsData:[],
            oClass:oClass
        }
    }
    render(){
        var data=this.state.shopDetailsData
        return(
            <div id='shopnavedetails'>
                {this.state.oClass=='category'?
                    <div class='category'>
                        <img src={data.imageSrc} />
                        <p>{store.getState().shoptitle}</p>
                    </div>
                :
                    <div>
                        <img src={data.imageSrc} />
                    </div>
                }
                
                <ul class='list'>
                    {data.length !=0 ?data.products.map((item,index)=>{
                        return (
                            <li key={index}>
                                <a>
                                    <img src={item.image} />
                                    <p>{item.name}</p>
                                    <div>
                                        <span>{item.price}</span>
                                        <i>已售{item.salesCount}</i>
                                    </div>
                                </a>
                            </li>
                        )
                    }) : null}
                </ul>
            </div>
        )
    }
    componentWillMount(){
        if(this.state.oClass == 'category'){
            shopService.getNaveActive2(this.state.path)
            .then((res)=>{
                this.setState({shopDetailsData:res})
            })
        }
        else if(this.state.oClass == 'active'){
            shopService.getNaveActive(this.state.path)
            .then((res)=>{
                this.setState({shopDetailsData:res})
            })
        }
        
    }
}



























