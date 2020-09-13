import React, { Component } from 'react'
import Link from 'next/link'
import styles from './AppDropdownMenu.module.css';
import { Layout, Menu, Dropdown, Input } from 'antd';
import { Row, Col, Button,Badge } from 'antd';
import {AccountBookOutlined, RightOutlined} from '@ant-design/icons';
// [
//     {id, name, prod_categories:[
//         {id, name, prod_categories}
//     ]}
// ]
export default class AppDropdownMenu extends Component {
    constructor(props) {
        super(props); 

        this.onClickParentMenuItem = this.onClickParentMenuItem.bind(this)
    }

    onClickParentMenuItem(e) {
        // To prevent User click through
        e.preventDefault()

        // Disappear the Popout
        this.props.onParentMenuClick()
    }
    render = () => {
        //<Link href="/category/[id]" as={`/category/${element.id}`}>
        // If homepage, this.props.location.pathname is "/"
        let {config} = this.props;
        let parentMenus = [];
        for (var prop in config) {
            if (Object.prototype.hasOwnProperty.call(config, prop)) {
            // do stuff
            parentMenus.push(
                <li onMouseOver={this.props.onParentMenuHover} onMouseLeave={this.props.onParentMenuOut}
                    onClick={this.onClickParentMenuItem} key={config["" +prop].id}
                    className={this.props.hoveredParent == prop ? styles['parent-menu-li-hovering'] : ""}>
                    <Link href="/category/[id]" as={`/category/${config["" +prop].id}`}>
                    <div>
                        <AccountBookOutlined /> {prop}
                        <span style={{float: "right", marginRight: "5px", fontSize:"12px", pointerEvents:"none"}}>
                            <RightOutlined />
                        </span>
                    </div>
                    </Link>
                </li>)
            }
        }
        let allCols = [];
        let curSubmenuItems = config["" + this.props.hoveredParent];
        if (curSubmenuItems) {
            for (var propSub in curSubmenuItems) {
            // One Sub menu. i.e Banh
            if (propSub != "id") {
                let subMenus = [];
                if (Object.prototype.hasOwnProperty.call(curSubmenuItems, propSub)) {
                // {id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]}
                let subItems = curSubmenuItems[propSub]
                if (subItems && subItems.subs && subItems.subs.length > 0) {
                    subItems.subs.forEach((item, idx) => {
                    // Each Childrent Sub Menus
                    subMenus.push(
                        <li key={item.id} onClick={this.onClickParentMenuItem}>
                        <Link href="/category/[id]" as={`/category/${item.id}`}>
                        {item.name}
                        </Link>
                        </li>           
                    )
                    });
                }
                allCols.push (<Col span={6} key={curSubmenuItems["" +propSub].id}>
                    <span style={{fontWeight:"bold"}}>
                    <div onClick={this.onClickParentMenuItem} className={styles['sub-menu-top-li']}>
                    <Link href="/category/[id]" as={`/category/${curSubmenuItems["" +propSub].id}`}>
                    {propSub}
                    </Link>
                    </div>
                    </span>
                    <ul className={styles['sub-menu']}>
                    {subMenus}
                    </ul>
                </Col>);
                }
            }
            }
        }
        return (
            <React.Fragment>
            <Row className={this.props.isHomePage ? styles['flyout-container-display-home'] : 
                (this.props.hoveredMenuList ? styles['flyout-container-display'] : styles['flyout-container-hidden'])}
                onMouseLeave={this.props.onMenuContainerOut}>
                <Col span={4} className={styles['parent-menu-container-left']}>
                <ul className={styles['parent-menu']}>
                    {parentMenus}
                </ul>
                </Col>
    
                <Col span={20} className={this.props.hoveredParent != "" ? styles['parent-menu-container-right'] 
                  : styles['parent-menu-container-right-hidden']} >
                    <Row>
                    {allCols}
                    </Row>
                </Col>
            </Row>
            </React.Fragment>);
    }
}
