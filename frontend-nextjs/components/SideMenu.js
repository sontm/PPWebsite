import React, {Component} from 'react'
import { Layout, Menu, Dropdown, Input, Button } from 'antd';
import { Row, Col, Card } from 'antd';
import { Checkbox, Slider, InputNumber, Radio, Tooltip } from 'antd';
import Icon from '@ant-design/icons';
import Link from 'next/link'

const { Search } = Input;
const Sider = Layout.Sider;
const {SubMenu} = Menu;

//{ categories, categoriesLevel, curCateId }
class SideMenu extends Component {
    // getInitialProps({pathname, query}) {        
    //   return {custom: 'custom'}; // pass some custom props to component
    // }

    renderSelectCategory() {
        console.log("===================== renderSelectCategory")
        // Type 1 of Category (Query Whole Category)
        if (this.props.categoriesLevel) {
            
            const curID = this.props.curCateId;
            const selectedKeys = [];
            const openKeys = [];
            selectedKeys.push("" + curID)

            // From Whole Menu, here only Choose the Correct Category to Select, CANBE CUSTOMIZE
            
            // menuToDisplay
            // "BanhKeo":{
            //       "id": 1,
            //       "Banh":{id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
            //     },

            // --------CUSTOMIZE: COmment this to Display WHOLE LEVEL
            let menuToDisplay = this.props.categoriesLevel;
            const subMenusFirst = [];
            if (menuToDisplay) {
                // propD is "BanhKeo"
                var subMenusSecond = [];
                menuToDisplay.forEach((topMenu, idx) => {
                    const subMenuItems = [];
                    openKeys.push("" + topMenu.id);
                    topMenu.prod_categories.forEach((curItem, idx) => {
                        // curMenuLvl is {id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
                        subMenuItems.push(
                            <Menu.Item key={curItem.id} 
                            className={curItem.id==curID ? "sidemenu-cate-selected" : ""}>
                                <Link href="/category/[id]" as={`/category/${curItem.id}`}>
                                <a>{curItem.Name}</a>
                                </Link>
                            </Menu.Item>
                        );
                    });
                    subMenusSecond.push(
                        <SubMenu
                        key={topMenu.id}
                        className={topMenu.id==curID ? "sidemenu-cate-selected" : ""}
                        title={
                            <Link href="/category/[id]" as={`/category/${topMenu.id}`}>
                                <a>{topMenu.Name}</a>
                            </Link>
                        }>
                            {subMenuItems}
                        </SubMenu>
                    );

                });
            }

            // this.props.category.categories.forEach((item, idx) => {
            //     subMenus.push(
            //         <Menu.Item key={item.id}>
            //             {item.name}
            //         </Menu.Item>)            
            //     });

            // TODO: Dont know why but set selectedKeys={["" + curID]} cannot OK
            // using defaultOpenKeys because if not, user cannot Open menu
            return (
                <div>
                    <div className="ant-card ant-card-small" style={{borderRight:"1px solid #e8e8e8"}}>
                    <div className="ant-card-head app-card-head">
                        <div className="ant-card-head-wrapper">
                            <div className="ant-card-head-title">
                            Danh Muc San Pham
                            </div>
                        </div>
                    </div>
                    </div>
                    <Menu
                        selectedKeys={selectedKeys}
                        openKeys={openKeys}
                        mode="inline"
                        inlineIndent={20}
                        onClick={console.log("onCliekMenu")}
                        style={{borderTop:"1px solid #e8e8e8", paddingTop:"0px"}}
                    >
                        {subMenusSecond}
                    </Menu>
                </div>
            );
        }
    }

    render() {
        const { categories, curCateId, categoriesLevel } = this.props;
        console.log("--->SideMenu: render")
        //console.log(categories)
        //console.log(curCateId)
        return (
            <div>
                {this.renderSelectCategory()}
            </div>
        )
    }
}

export default SideMenu;