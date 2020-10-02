import React, { Component } from 'react'
import styles from './ProductDetailImageList.module.css'

// props: images [{src: "/"+product.img3, thumb:"/"+product.img3}]
//      thumbnailHeight: 100, onClick, onClickMore, visibleNum
export default class ProductDetailImageList extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onClickMore = this.onClickMore.bind(this);
        

        let firstImage = (this.props.images && this.props.images.length > 0) ?
        this.props.images[0].thumb : null;
        this.state = {
            selectedImgPath: firstImage
        }
    }

    onClick(item) {
        this.props.onClick(item)
        this.setState ({
            selectedImgPath: item.thumb
        })
    }
    onClickMore() {
        this.props.onClickMore(this.props.visibleNum);
    }
    render() {
        if (this.props.images && this.props.images.length > 0) {
        let imageViews = [];
        this.props.images.forEach((item, idx) => {
            if (idx < this.props.visibleNum) {
                imageViews.push(
                    <li onClick={() => {this.onClick(item)}} key={idx}
                        className={this.state.selectedImgPath==item.thumb ? 
                            styles['product-image-list-selected'] :
                            styles['product-image-list']}>
                        <img src={item.thumb} style={{width:this.props.thumbnailHeight ?
                            ""+this.props.thumbnailHeight : "100%", height:this.props.thumbnailHeight ?
                            ""+this.props.thumbnailHeight : "auto"}} />
                    </li>
                );
            }
        })

        return (
            <div>
                <ul className={styles['product-image-list-ul']}>
                    {imageViews}
                    {this.props.images.length > this.props.visibleNum ?
                    <li onClick={() => {this.onClickMore()}} 
                        className={styles['product-image-list-more']}
                        style={{width:this.props.thumbnailHeight ?
                        ""+this.props.thumbnailHeight : "100%", height:this.props.thumbnailHeight ?
                        ""+this.props.thumbnailHeight : "auto"}}>

                        Xem Thêm {"+" + (this.props.images.length - this.props.visibleNum)}
                    </li> : null}
                </ul>
            </div>
        )
        }
    }
}
