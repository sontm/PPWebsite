import React, {Component} from 'react'
import { Layout, Menu, Dropdown, Input, Button } from 'antd';
import { Row, Col, Card } from 'antd';
import { Checkbox, Slider, InputNumber, Radio, Tooltip } from 'antd';
import Link from 'next/link'
import styles from './SideMenu.module.css';

const { Search } = Input;
const Sider = Layout.Sider;
const {SubMenu} = Menu;

//{ categories, categoriesLevel, curCateId }
class SideMenu extends Component {
    // getInitialProps({pathname, query}) {        
    //   return {custom: 'custom'}; // pass some custom props to component
    // }

    renderSelectCategory() {
        //<Link href="/category/[id]" as={`/category/${topMenu.id}`}>
        // Type 1 of Category (Query Whole Category)
        if (this.props.categoriesLevel && this.props.curCateId) {
            
            const curID = this.props.curCateId;
            const selectedKeys = [];
            const openKeys = [];
            selectedKeys.push("" + curID)

            // From Whole Menu, here only Choose the Correct Category to Select, CANBE CUSTOMIZE
            let menuToDisplay = {};
            // First, find which part current Category is in
            // prop is "BanhKeo"
            for (var prop in this.props.categoriesLevel) {
                if (Object.prototype.hasOwnProperty.call(this.props.categoriesLevel, prop)) {
                    // curMenu is First High Level Menu
                    let curMenu = this.props.categoriesLevel["" +prop];
                    openKeys.push("" + curMenu.id);
                    if (curMenu.id == curID) {
                        // Selected Category is is First Menu
                        menuToDisplay[""+prop] = curMenu;
                        openKeys.push("" + curMenu.id);
                    } else {
                        for (var propSub in curMenu) {
                            if (Object.prototype.hasOwnProperty.call(curMenu, propSub)) {
                                if (propSub != "id") {
                                    let curSubMenu = curMenu[""+propSub];
                                    if (curSubMenu.id == curID) {
                                        // Selected Category is Second Menu
                                        menuToDisplay[""+prop] = curMenu;
                                        openKeys.push("" + curMenu.id);
                                        openKeys.push("" + curSubMenu.id);
                                    } else {
                                        // Search in all THird Menu
                                        if (curSubMenu.subs && curSubMenu.subs.length > 0) {
                                            curSubMenu.subs.forEach(element => {
                                                if (element.id == curID) {
                                                    // THis is Third Menu
                                                    menuToDisplay[""+prop] = curMenu;
                                                    openKeys.push("" + curMenu.id);
                                                    openKeys.push("" + curSubMenu.id);
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // menuToDisplay
            // "BanhKeo":{
            //       "id": 1,
            //       "Banh":{id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
            //     },

            // --------CUSTOMIZE: COmment this to Display WHOLE LEVEL
            menuToDisplay = this.props.categoriesLevel;
            const subMenusFirst = [];
            if (menuToDisplay) {
                // propD is "BanhKeo"
                for (var propD in menuToDisplay) {
                    if (Object.prototype.hasOwnProperty.call(menuToDisplay, propD)) {
                        if (propD != "id") {
                            // curItem is
                            //{
                            //       "id": 1,
                            //       "Banh":{id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
                            //     },
                            //
                            const subMenusSecond = [];
                            let curItem = menuToDisplay[""+propD]
                            for (var propD2 in curItem) {
                                if (Object.prototype.hasOwnProperty.call(curItem, propD2)) {
                                    if (propD2 != "id") {
                                        const subMenuItems = [];
                                        // curMenuLvl is {id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
                                        let curMenuLvl = curItem[""+propD2];
                                        if (curMenuLvl.subs && curMenuLvl.subs.length > 0) {
                                            curMenuLvl.subs.forEach(element => {
                                                subMenuItems.push(
                                                    <Menu.Item key={element.id} 
                                                    className={element.id==curID ? styles['sidemenu-cate-selected'] : ""}>
                                                        <Link href="/category/[id]" as={`/category/${element.id}`}>
                                                        {element.name}
                                                        </Link>
                                                    </Menu.Item>
                                                );
                                            });
                                        }
                                        subMenusSecond.push(
                                            <SubMenu
                                            key={curMenuLvl.id}
                                            className={curMenuLvl.id==curID ? styles['sidemenu-cate-selected'] : ""}
                                            title={
                                                <Link href="/category/[id]" as={`/category/${curMenuLvl.id}`}>
                                                {propD2}
                                                </Link>
                                            }>
                                                {subMenuItems}
                                            </SubMenu>
                                        );
                                    }
                                }
                            }

                            subMenusFirst.push(
                                <SubMenu
                                key={curItem.id}
                                className={curItem.id==curID ? styles['sidemenu-cate-selected'] : ""}
                                title={
                                    <Link href="/category/[id]" as={`/category/${curItem.id}`}>
                                    {propD}
                                    </Link>
                                }>
                                {subMenusSecond}
                                </SubMenu>
                            );
                        }
                    }
                }

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
                    <div className={styles['ant-card ant-card-small']} style={{borderRight:"1px solid #e8e8e8"}}>
                    <div className={styles['ant-card-head app-card-head']}>
                        <div className={styles['ant-card-head-wrapper']}>
                            <div className={styles['ant-card-head-title']}>
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
                        onClick={this.onSideMenuItemClick}
                        style={{borderTop:"1px solid #e8e8e8", paddingTop:"0px"}}
                    >
                        {subMenusFirst}
                    </Menu>
                </div>
            );
        } else {
            return null;
        }
    }

    renderBrand() {
        let content = [];
        if (this.props.brands && this.props.brands.length > 0 && this.props.curBrandId) {
            const selectedKeys = [];
            selectedKeys.push("" + this.props.curBrandId)

            this.props.brands.forEach(element => {
                content.push(
                    <SubMenu
                        key={element.id}
                        className={element.id==this.props.curBrandId ? styles['sidemenu-cate-selected'] : ""}
                        title={
                            <Link href="/brands/[id]" as={`/brands/${element.id}`}>
                            {element.Name}
                            </Link>
                        } />
                )   
            })
            return (
                <div>
                    <div className={styles['ant-card ant-card-small']} style={{borderRight:"1px solid #e8e8e8"}}>
                    <div className={styles['ant-card-head app-card-head']}>
                        <div className={styles['ant-card-head-wrapper']}>
                            <div className={styles['ant-card-head-title']}>
                            Danh Muc Thuong Hieu
                            </div>
                        </div>
                    </div>
                    </div>
                    <Menu
                        selectedKeys={selectedKeys}
                        mode="inline"
                        inlineIndent={20}
                        onClick={this.onSideMenuItemClick}
                        style={{borderTop:"1px solid #e8e8e8", paddingTop:"0px"}}
                    >
                        {content}
                    </Menu>
                </div>
            )
        } else {
            return null;
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
                {this.renderBrand()}
            </div>
        )
    }
}

export default SideMenu;