import React from 'react'
import cloneDeep from 'lodash/cloneDeep';
import AppConstant from './AppConstant'

import {DISCOUNT_TYPE_DISCOUNT, DISCOUNT_TYPE_COUPON, DISCOUNT_TYPE_GIFT} from './AppConstant'

if (!String.prototype.trim) {
    (function() {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
            return this.replace(rtrim, '');
        };
    })();
}

export function formatDate(dateString) {
    const date = new Date(dateString);

    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    return monthNames[monthIndex] + ' ' + year;
}
  
export function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug", 
    "Sep", "Oct", "Nov", "Dec"
  ];

  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return date.getDate() + ' ' + monthNames[monthIndex] + ' ' + year + ' - ' + date.getHours() + ':' + date.getMinutes();
}  

// teams {
//   name,
//   id,
//   members [{
//     usename,
//     percent,
//     role // leader|member
//   }]
// }
export function getMatchTeamIDOfUser(teams, username) {
  var ret;

  // If found any Leader role, return Most Percent
  // Other wise, return team which is Member with Most Percent
  if (teams && username) {
      let curPercent = 0;
      teams.forEach(element => {
          if (element.members) {
              element.members.forEach(mem => {
                  if (mem.username == username) {
                      if (mem.role == "leader") {
                          // Return if is Leader
                          if (mem.percent + 1000 > curPercent) {
                              curPercent = mem.percent + 1000;
                              ret = element.id;
                          }
                      }
                      if (mem.percent > curPercent) {
                          curPercent = mem.percent;
                          ret = element.id;
                      }
                  }
              })
          }
      })
  }

  return ret;
}

// teams {
//   name,
//   id,
//   members [{
//     usename,
//     percent,
//     role // leader|member
//   }]
// }
export function getMatchLeaderOfUser(teams, username) {
    var ret;
    let userIsLeader = false;
    // If found any Leader role, return Most Percent
    // Other wise, return team which is Member with Most Percent
    var tempTeamAndLeader = {}; // {"natv": "hungdv"}
    if (teams && username) {
        let curPercent = 0;
        teams.forEach(element => {
            if (element.members) {
                element.members.forEach(mem => {
                    if (mem.role == "leader") {
                        tempTeamAndLeader[element.id] = mem.username;
                    }
                    if (mem.username == username) {
                        if (mem.role == "leader") {
                            // If ROle of requester is Leader, Assigned is GL
                            ret = "sontm";
                            userIsLeader = true;
                        } else 
                        if (mem.percent > curPercent) {
                            curPercent = mem.percent;
                            ret = element.id;
                        }
                    }
                })
            }
        })
    }

    if (userIsLeader) {
        // TODO, return Group Leader Here
        return "admin";
    } else {
        // If is member, the Max Percent is the Assigned Leader
        return tempTeamAndLeader[""+ret];
    }
  }



// If intoList is true, will break into List
export function breakLineCRLF(text, intoList) {
    if (intoList) {
        let lis = text.split('<CRLF>').map((item, i) => {
            return <li key={i}>{item}</li>;
        });
        let result = (
            <ul>
                {lis}
            </ul>
        )
        return result;
    } else {
        let result = text.split('<CRLF>').map((item, i) => {
            return <p key={i}>{item}</p>;
        });
        return result;
    }
}

class Helpers {
    constructor() {
    }

    // Co Dau thanh Khong Dau
    changeVietnameseToNonSymbol(alias) {
        var str = alias;
        str = str.toLowerCase();
        // ES2015/ES6 String.Prototype.Normalize()
        str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
        str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
        str = str.replace(/đ/g,"d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
        str = str.replace(/ + /g," ");
        str = str.trim(); 
        return str;
    }
    // from 20000 -> 20K
    convertPriceToShortAbbr(price) {
        if (price > 1000) {
            let priceInK = Math.floor(price / 1000);
            return priceInK + "K";
        }
        return price + "%";
    }

    // Input data is:
    // [
    // [{
    //     "id":2,"name":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk) Trang","descShort":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk) desc Short","descMedium":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk)","descLong":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk)","unitPrice":10000,"stockNum":1000,"active":true,"imgThump":"images/products/BanhKeo/p2_1.jpg","img1":"images/products/BanhKeo/p2_1.jpg","img2":null,"img3":null,"img4":null,"img5":null,"img6":null,"firstCategoryId":11,"secondCategoryId":4,"thirdCategoryId":1,"brandId":3,"parentProductId":null,"productAttributeId":null,"createdAt":"","updatedAt":"",
    //     "categories":{"id":11,"name":"Bánh Mềm","desc":null,"active":true,"order":null,"parentCategoryId":4,"createdAt":"","updatedAt":"",
    //         "cateDiscounts":[]},
    //     "brands":{"id":3,"name":"Orang Tua","imgLogo":null,"countryId":5,"active":true,"createdAt":"","updatedAt":"",
    //         "countries":{"id":5,"name":"Trung Quốc","code":"cn","createdAt":"","updatedAt":""},
    //         "brandDiscounts":[]},
    //     "attributes":[{"id":2,"name":"Trắng","value":null,"attributeGroupId":1,"createdAt":"","updatedAt":"2019-09-07T02:25:51.137Z",
    //         "attributeGroups":{"id":1,"name":"Màu Sắc","createdAt":"2019-09-07T02:24:00.454Z","updatedAt":""}}],
    //     "productDiscounts":[]}]
    //---------------------------
    //category:[id1: {count:10, value:DBCategories}, id2:{}] (Child Level only)
    //brandsQuery: {id1: {count:10, value:DBBrand}, id2:{}}
    //brandCountriesQuery:{},
    //attributesQuery:{},
    //priceRangeQuery:[],  // [{name: 1, from:1000, to: 2000},{name: 2, from:2000, to: 4000},]
    extractInfoFromProductList(products) {
        let categoryQuery = {};
        let brandsQuery = {};
        let brandCountriesQuery = {};
        let attributesQuery = {};
        let priceRangeQuery = [];

        if (products && products.length > 0) {
            const COUNT_EACH_RANGE = Math.floor(products.length/AppConstant.CONFIG_PRICE_DIVIDED_RANGE);
            let countP = -1
            let countRange = 1;
            // Sort Products by LowPrice First

            let productSorted = cloneDeep(products);
            productSorted.sort((a, b) =>
                (a.unitPrice > b.unitPrice) ? 1 : -1
            );
            let prevPriceRange = 0;
            let curPriceRange = 0;
            
            productSorted.forEach((item, idx) => {
                // Min Price
                if (countP == -1) {
                    // Always 0 for First Range
                    //prevPriceRange = this.getFinalPriceOfProduct(p);
                    prevPriceRange = 0;
                    countP = 0;
                }
                countP++;
                if (countP >= COUNT_EACH_RANGE) {
                    // Finish a Range, get this price Round Up to 50K
                    curPriceRange = this.getFinalPriceOfProduct(item);
                    let roundDivider = Math.ceil(curPriceRange/AppConstant.CONFIG_PRICE_ROUNDUP_TO); // 50K
                    curPriceRange = roundDivider * AppConstant.CONFIG_PRICE_ROUNDUP_TO;
                    if (prevPriceRange != curPriceRange) {
                        priceRangeQuery.push({name:countRange, from: prevPriceRange, to: curPriceRange})
                        prevPriceRange = curPriceRange;
                    }
                    countRange++;
                    countP = 0;
                }

                if (item.categories) {
                    if (categoryQuery[""+item.categories.id]) {
                        // Existed, increase count
                        categoryQuery[""+item.categories.id].count++;
                    } else {
                        categoryQuery[""+item.categories.id] = {count: 1, value: item.categories}
                    }
                }

                if (item.brands) {
                    if (brandsQuery[""+item.brands.id]) {
                        // Existed, increase count
                        brandsQuery[""+item.brands.id].count++;
                    } else {
                        brandsQuery[""+item.brands.id] = {count: 1, value: item.brands}
                    }
                }

                if (item.attributes && item.attributes.length > 0) {
                    item.attributes.forEach(attribute => {
                        let curAttributeGroups = attribute.attributeGroups;
                        if (attributesQuery[""+curAttributeGroups.name]) {
                            // Exist Attribute Group

                            // CHeck if Attribute exist
                            let isExistAttr = false;
                            for (let l = 0 ; l < attributesQuery[""+curAttributeGroups.name].attributes.length; l++) {
                                let aVal = attributesQuery[""+curAttributeGroups.name].attributes[l];
                                if (attribute.id == aVal.id) {
                                    // Exist attribute, increase count
                                    aVal.count++;
                                    isExistAttr = true;
                                    break;
                                }
                            }
                            if (isExistAttr == false) {
                                attributesQuery[""+curAttributeGroups.name].attributes.push({
                                    id: attribute.id,
                                    name: attribute.name,
                                    count: 1
                                });
                            }
                            
                        } else {
                            // Not Exist Group, create new
                            attributesQuery[""+curAttributeGroups.name] = {
                                id:curAttributeGroups.id,
                                attributes:[{
                                    id: attribute.id,
                                    name: attribute.name,
                                    count: 1
                                }]
                            }
                        }
                    })
                }
            })
        }
        // brandCountry
        for (var prop in brandsQuery) {
            if (Object.prototype.hasOwnProperty.call(brandsQuery, prop)) {
                let curBrand = brandsQuery[""+prop].value;
                if (brandCountriesQuery[""+curBrand.countries.id]) {
                    // Existed, increase count
                    brandCountriesQuery[""+curBrand.countries.id].count += brandsQuery[""+prop].count;
                } else {
                    brandCountriesQuery[""+curBrand.countries.id] = 
                        {count: brandsQuery[""+prop].count,
                        value: curBrand.countries}
                }
            }
        }
        return {
            categoryQuery:categoryQuery,
            brandsQuery: brandsQuery,
            brandCountriesQuery: brandCountriesQuery,
            attributesQuery: attributesQuery,
            priceRangeQuery:priceRangeQuery
        };
    }
    // Get the Not Duplicate DBBrand from List Products: [{xxx, brands:{id, name, countryId}}]
    // Result: {id1: {count:10, value:DBBrand}, id2:{}}
    getBrandsQuery(products) {
        let result = {};
        if (products && products.length > 0) {
            products.forEach((item, idx) => {
                if (item.brands) {
                    if (result[""+item.brands.id]) {
                        // Existed, increase count
                        result[""+item.brands.id].count++;
                    } else {
                        result[""+item.brands.id] = {count: 1, value: item.brands}
                    }
                }
            })
        }
        return result;
    }

    // DBBrand: {id, name, countries:{id, name, code}}
    // Input: {id1: {count:10, value:DBBrand}, id2:{}}
    // Result: {id1: {count:10, value:DBCountry}, id2:{}}
    getBrandCountriesQuery(brandQuery) {
        let result = {};
        if (brandQuery ) {
            for (var prop in brandQuery) {
                if (Object.prototype.hasOwnProperty.call(brandQuery, prop)) {
                    let curBrand = brandQuery[""+prop].value;
                    if (result[""+curBrand.countries.id]) {
                        // Existed, increase count
                        result[""+curBrand.countries.id].count += brandQuery[""+prop].count;
                    } else {
                        result[""+curBrand.countries.id] = 
                            {count: brandQuery[""+prop].count,
                            value: curBrand.countries}
                    }
                }
            }
            
        }
        return result;
    }

    // Input data is:
    // [
    // [{
    //     "id":2,"name":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk) Trang","descShort":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk) desc Short","descMedium":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk)","descLong":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk)","unitPrice":10000,"stockNum":1000,"active":true,"imgThump":"images/products/BanhKeo/p2_1.jpg","img1":"images/products/BanhKeo/p2_1.jpg","img2":null,"img3":null,"img4":null,"img5":null,"img6":null,"firstCategoryId":11,"secondCategoryId":4,"thirdCategoryId":1,"brandId":3,"parentProductId":null,"productAttributeId":null,"createdAt":"","updatedAt":"",
    //     "categories":{"id":11,"name":"Bánh Mềm","desc":null,"active":true,"order":null,"parentCategoryId":4,"createdAt":"","updatedAt":"",
    //         "cateDiscounts":[]},
    //     "brands":{"id":3,"name":"Orang Tua","imgLogo":null,"countryId":5,"active":true,"createdAt":"","updatedAt":"",
    //         "countries":{"id":5,"name":"Trung Quốc","code":"cn","createdAt":"","updatedAt":""},
    //         "brandDiscounts":[]},
    //     "attributes":[{"id":2,"name":"Trắng","value":null,"attributeGroupId":1,"createdAt":"","updatedAt":"2019-09-07T02:25:51.137Z",
    //         "attributeGroups":{"id":1,"name":"Màu Sắc","createdAt":"2019-09-07T02:24:00.454Z","updatedAt":""}}],
    //     "productDiscounts":[]}]

    // Output
    // {
    //     "MauSac": {
    //         "id": 1,
    //         attributes:[
    //             {name: Xanh, id:2, count:5},
    //             {name: Do, id:3, count: 10}
    //         ]
    //     }
    // }
    getAttributesQuery(products) {
        let result = {}
        let lstAttGroupIds = []
        if (products && products.length > 0) {
            products.forEach((p, idx) => {
                if (p.attributes && p.attributes.length > 0) {
                    p.attributes.forEach(attribute => {
                        let curAttributeGroups = attribute.attributeGroups;
                        if (result[""+curAttributeGroups.name]) {
                            // Exist Attribute Group

                            // CHeck if Attribute exist
                            let isExistAttr = false;
                            for (let l = 0 ; l < result[""+curAttributeGroups.name].attributes.length; l++) {
                                let aVal = result[""+curAttributeGroups.name].attributes[l];
                                if (attribute.id == aVal.id) {
                                    // Exist attribute, increase count
                                    aVal.count++;
                                    isExistAttr = true;
                                    break;
                                }
                            }
                            if (isExistAttr == false) {
                                result[""+curAttributeGroups.name].attributes.push({
                                    id: attribute.id,
                                    name: attribute.name,
                                    count: 1
                                });
                            }
                            
                        } else {
                            // Not Exist Group, create new
                            result[""+curAttributeGroups.name] = {
                                id:curAttributeGroups.id,
                                attributes:[{
                                    id: attribute.id,
                                    name: attribute.name,
                                    count: 1
                                }]
                            }
                        }
                    })
                }
            })
        }
        console.log(result)
        return result;
    }

    // Input Product is:
    // [
    // [{
    //     "id":2,"name":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk) Trang","descShort":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk) desc Short","descMedium":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk)","descLong":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk)","unitPrice":10000,"stockNum":1000,"active":true,"imgThump":"images/products/BanhKeo/p2_1.jpg","img1":"images/products/BanhKeo/p2_1.jpg","img2":null,"img3":null,"img4":null,"img5":null,"img6":null,"firstCategoryId":11,"secondCategoryId":4,"thirdCategoryId":1,"brandId":3,"parentProductId":null,"productAttributeId":null,"createdAt":"","updatedAt":"",
    //     "categories":{"id":11,"name":"Bánh Mềm","desc":null,"active":true,"order":null,"parentCategoryId":4,"createdAt":"","updatedAt":"",
    //         "cateDiscounts":[]},
    //     "brands":{"id":3,"name":"Orang Tua","imgLogo":null,"countryId":5,"active":true,"createdAt":"","updatedAt":"",
    //         "countries":{"id":5,"name":"Trung Quốc","code":"cn","createdAt":"","updatedAt":""},
    //         "brandDiscounts":[]},
    //     "attributes":[{"id":2,"name":"Trắng","value":null,"attributeGroupId":1,"createdAt":"","updatedAt":"2019-09-07T02:25:51.137Z",
    //         "attributeGroups":{"id":1,"name":"Màu Sắc","createdAt":"2019-09-07T02:24:00.454Z","updatedAt":""}}],
    //     "productDiscounts":[]}]
    //--------------------
    // sorting: popular, new, discount, lowprice, highprice and searchname
    // queryCriteria: { // Current Query which user select on sidemenu
    //     categories: [] list of ID
    //     brands:[], // list of brand ID, if empty mean All
    //     brandCountries:[], // list of ID
    //     attributes:[], // list of ID,
    //     priceRange:{}, // {from: m to:};
    //     filter: {filterType: "popular", searchTerm: ""}
    // }
    filterProduct (sorting, searchname, products, queryCriteria) {
        let productFilters = [...products];

        // First, return product satisfy query only
        productFilters = productFilters.filter(item => {
            if (queryCriteria.categories.length > 0 && queryCriteria.categories.indexOf(""+item.categories.id) < 0) {
                //this Cate ID not in list, not INCLUDE
                return false;
            }
            if (queryCriteria.brands.length > 0 && queryCriteria.brands.indexOf(""+item.brands.id) < 0) {
                //this Brand ID not in list, not INCLUDE
                return false;
            }
            if (queryCriteria.brandCountries.length > 0 && queryCriteria.brandCountries.indexOf(""+item.brands.countries.id) < 0) {
                //this BrandCountry ID not in list, not INCLUDE
                return false;
            }
            if (queryCriteria.attributes.length > 0) {
                let ret = false;
                for (let l = 0; l < item.attributes.length; l++) {
                    // If any attribute of this product in query, true
                    if (queryCriteria.attributes.indexOf(""+item.attributes[l].id) >= 0) {
                        ret = true;
                        break;
                    }
                }
                //this attribute not in list, not INCLUDE
                return ret;
            }
            if (queryCriteria.priceRange.to > 0 && queryCriteria.priceRange.to >= queryCriteria.priceRange.from 
                    && (item.unitPrice < queryCriteria.priceRange.from || item.unitPrice > queryCriteria.priceRange.to)) {
                //this Price not valid
                return false;
            }

            return true;
        })
 
        // Second, Sorting based on filter
        if (sorting == "lowprice") {
            productFilters.sort((a, b) =>
                (a.unitPrice > b.unitPrice) ? 1 : -1
            );
        } else if (sorting == "highprice") {
            productFilters.sort((a, b) =>
                (a.unitPrice < b.unitPrice) ? 1 : -1
            );
        }

        // Apply Search for all Name
        if (searchname) {
            searchname = searchname.trim();
        }
        if (searchname && searchname.length > 0) {
            productFilters = productFilters.filter(product => {
                // Search substring using indexOf instead of includes for IE support
                if (this.changeVietnameseToNonSymbol(product.name).indexOf(
                        this.changeVietnameseToNonSymbol(searchname)) !== -1) {
                    return true;
                } else {
                    return false;
                }
            });
        }
        return productFilters;
    }

    // Get Final Price After Discount, Extra....
    getFinalPriceOfProduct(product) {
        // TODO
        // Now return unitPrice only
        if (product) {
            return product.unitPrice;
        }
        return 0;
    }


    // Input data is:
    // [
    //     {"id":2,"name":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk) Trang",
    //         "descShort":"","descMedium":"","descLong":"",
    //         "unitPrice":10000,"stockNum":1000,"active":true,"imgThump":"images/products/BanhKeo/p2_1.jpg",
    //         "img1":"images/products/BanhKeo/p2_1.jpg","img2":null,"img3":null,"img4":null,"img5":null,"img6":null,
    //         "firstCategoryId":11,"secondCategoryId":4,"thirdCategoryId":1,"brandId":3,"parentProductId":null,
    //         "productAttributeId":null,"createdAt":"","updatedAt":"",
            
    //         "brands":
    //             {"id":3,"name":"Orang Tua","imgLogo":null,"countryId":5,"active":true,
    //             "createdAt":"2019-09-04T13:53:53.555Z","updatedAt":"2019-09-04T13:53:53.555Z",
                    
    //             "countries":{"id":5,"name":"Trung Quốc","code":"cn","createdAt":"","updatedAt":""}
    //             },

    //         "attributes":[{"id":2,"name":"Trắng","value":null,"attributeGroupId":1,"createdAt":"","updatedAt":"",
    //             "attributeGroups":{"id":1,"name":"Màu Sắc","createdAt":"","updatedAt":""}
    //         }]
    //     }
    // ]

    // Output
    // [
    //     {name: 1, from:1000, to: 2000},
    //     {name: 2,from:1000, to: 2000},
    //     {name: 3,from:1000, to: 2000},
    //     {name: 4,from:1000, to: 2000},
    //     {name: 5,from:10000, to: 1000000000},
    // ]
    // THis function will Divide into 5 Ranges Equally by Number of Products in each Range (0-20%).
    getPriceRanges(products) {
        let result = []
        if (products && products.length > 0) {
            const COUNT_EACH_RANGE = Math.floor(products.length/AppConstant.CONFIG_PRICE_DIVIDED_RANGE);
            let countP = -1
            let countRange = 1;
            // Sort Products by LowPrice First

            products.sort((a, b) =>
                (a.unitPrice > b.unitPrice) ? 1 : -1
            );
            let prevPriceRange = 0;
            let curPriceRange = 0;
            
            products.forEach((p, idx) => {
                // Min Price
                if (countP == -1) {
                    // Always 0 for First Range
                    //prevPriceRange = this.getFinalPriceOfProduct(p);
                    prevPriceRange = 0;
                    countP = 0;
                }
                countP++;
                if (countP >= COUNT_EACH_RANGE) {
                    // Finish a Range, get this price Round Up to 50K
                    curPriceRange = this.getFinalPriceOfProduct(p);
                    let roundDivider = Math.ceil(curPriceRange/AppConstant.CONFIG_PRICE_ROUNDUP_TO); // 50K
                    curPriceRange = roundDivider * AppConstant.CONFIG_PRICE_ROUNDUP_TO;
                    if (prevPriceRange != curPriceRange) {
                        result.push({name:countRange, from: prevPriceRange, to: curPriceRange})
                        prevPriceRange = curPriceRange;
                    }
                    countRange++;
                    countP = 0;
                }

            })
        }
        console.log("getPriceRanges.....")
        console.log(result)
        return result;
    }

    // One product may have Category Discount, Brand Discount, Product Discount
    // THis will check all types and sort by "discount", "coupon" or "gift"
    // THen from discount, found Final Best Discount Fix Price Or Percent

    // Input data is:
    // [
        // "discounts": [
        //     {
        //     "FixMoney": "0",
        //     "Percent": 40,
        //     "_id": "5f784f896884d31468bd0376",
        //     "Name": "OppoA5s-40%",
        //     "From": "2020-10-01T05:00:00.000Z",
        //     "To": "2020-12-17T05:00:00.000Z",
        //     "Desc": "Oppo A5s giam gia 40%",
        //     "Type": "discount",
        //     "__v": 0,
        //     "ApplyProduct": "5f57b1eff958e833c62f8d4c",
        //     "id": "5f784f896884d31468bd0376"
        //     }
        //     ],
    // Output
    // return {bestDiscount: 23, unit:"%|d", newPrice: 12, desc, hasGift:true, giftDesc,
    //      coupon: null|"JP20", bestCoupon:"", couponUnit:"%|K",couponDesc, discounts[]}

    //product["combinedDiscount"] = []
    parseDiscountInformation(product, allCategories, allBrands) {
        let result = {};
        let discounts = [];
        let thisCategoryId = product.prod_category.id;
        let thisBrandId = product.prod_brand.id;
        console.log("************* thisCategoryId:" + thisCategoryId)
        console.log("************* thisBrandId:" + thisBrandId)
        // Find the Category of this Product
        for (let i = 0; i < allCategories.length; i++) {
            if (thisCategoryId == allCategories[i].id) {
                discounts = [...discounts, ...allCategories[i].discounts]
            }
        }
        for (let i = 0; i < allBrands.length; i++) {
            if (thisBrandId == allBrands[i].id) {
                discounts = [...discounts, ...allBrands[i].discounts]
            }
        }
        if (product && product.discounts && product.discounts.length > 0) {
            discounts = [...discounts, ...product.discounts]
        }

        product["combinedDiscounts"] = discounts;
        console.log("************* combined discount:" + product.Name)
        console.log(discounts)
        let bestDiscountMoney = 0;
        let curUnit = "";
        let newPrice = product.UnitPrice;
        let discountPrice = 0;
        let bestDiscountPercentOrFix = 0;

        let bestCoPercentOrFix = 0;
        let bestCoMoney = 0;
        let curCouponUnit = "";
        discounts.forEach(element => {
            if (element.Type == DISCOUNT_TYPE_DISCOUNT) {
                let curDiscountPercent = Math.floor((element.Percent/100) * product.UnitPrice);
                let curDiscountFix = element.FixMoney;
                let maxDiscount = Math.max(curDiscountPercent, curDiscountFix);
                
                if (bestDiscountMoney < maxDiscount) {
                    bestDiscountMoney = maxDiscount;
                    if (curDiscountPercent >= curDiscountFix) {
                        curUnit = "%";
                        newPrice = product.UnitPrice - curDiscountPercent;
                        discountPrice = curDiscountPercent;
                        bestDiscountPercentOrFix = element.Percent;
                    } else {
                        newPrice = product.UnitPrice - curDiscountFix;
                        curUnit = "đ";
                        discountPrice = curDiscountFix;
                        bestDiscountPercentOrFix = element.FixMoney;
                    }
                    
                    result.desc = element.Desc;
                }
            } else if (element.Type == DISCOUNT_TYPE_GIFT) {
                result.hasGift = true;
                result.giftDesc = element.Desc;
            } else if (element.Type == DISCOUNT_TYPE_COUPON) {
                result.coupon = element.Name;

                let curCoPercent = Math.floor((element.Percent/100) * product.UnitPrice);
                let curCoFix = element.FixMoney;
                let maxCo = Math.max(curCoPercent, curCoFix);
                
                if (bestCoMoney < maxCo) {
                    bestCoMoney = maxCo;
                    discountPrice = bestCoMoney;
                    result.couponDesc = element.Desc;
                    if (curCoPercent >= curCoFix) {
                        curCouponUnit = "%";
                        bestCoPercentOrFix = element.Percent;
                    } else {
                        curCouponUnit = "K";
                        bestCoPercentOrFix = element.FixMoney;
                    }
                }
            }
        })
        result.bestDiscount = bestDiscountPercentOrFix;
        result.unit = curUnit;
        result.newPrice = newPrice;
        result.discountPrice = discountPrice; // the amount of money discounted
        result.discounts = discounts;
        result.bestCoupon = bestCoPercentOrFix;
        result.couponUnit = curCouponUnit;
        return result;
    }

    // {id: 1, Name: "Bánh Keo", prod_category:{id, Name}, prod_categories[{id, Name}]}

    // Output:
    // const menuData = {
    //     "BanhKeo":{
    //       "id": 1,
    //       "Banh":{id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
    //     },

    levelingCategory(cateList) {
        console.log("levelingCategory------");
        let result = {};
        // Get Level 1
        if (cateList && cateList.length > 0) {
            cateList.forEach((element, idx) => {
                if (!element.prod_category) {
                    // First Level Category
                    result[""+element.Name] = {id:element.id}
                }
            });
        }
        // Get Level 2
        for (var prop in result) {
            if (Object.prototype.hasOwnProperty.call(result, prop)) {
                let curCate = result[prop]
                // Find Level 2 Category which parent ID is equal
                if (cateList && cateList.length > 0) {
                    cateList.forEach((element, idx) => {
                        if (element.prod_category && element.prod_category.id == curCate.id) {
                            // First Level Category
                            curCate[""+element.Name] = {id:element.id, subs:[]}
                        }
                    });
                }
            }
        }
        // Get Level 3
        for (var prop in result) {
            if (Object.prototype.hasOwnProperty.call(result, prop)) {
                let curCate = result[prop]
                // Loop level 2 except id
                for (var propSub in curCate) {
                    if (Object.prototype.hasOwnProperty.call(curCate, propSub)) {
                        if (propSub != "id") {
                            let curSubCate = curCate[propSub]
                            if (cateList && cateList.length > 0) {
                                cateList.forEach((element, idx) => {
                                    // Find Level 3 Category which parent ID is equal
                                    if (element.prod_category && element.prod_category.id == curSubCate.id) {
                                        // First Level Category
                                        curSubCate["subs"].push({id: element.id, name:element.Name})
                                    }
                                });
                            }
                        }
                    }
                }
                
            }
        }
        console.log(result)
        return result;
    }

    // filterInfo{
    //     brands:[], // list of brand ID, if empty mean All
    //     brandCountries:[], // list of ID
    //     attributes:[], list of {Name: "MauSac", ID, Value: "Green"},
    //     priceRange:{} // {from:, to:}; name is start from 1, just the Range in Query
    // };
    getFilteredProduct(allProducts, filterInfo) {
        let displayProducts = [];
        allProducts.forEach(element => {
            // if Filter Brand, only add element of that Brand
            if (!filterInfo.brands.length || // if No Selected, means all
                    (filterInfo.brands.length > 0 && filterInfo.brands.indexOf(element.prod_brand.id) >= 0)) {
                // This product have category same as Filtering

                // Check another Filter criteria: Brand Country
                if (!filterInfo.brandCountries.length || // if No Selected, means all
                    (filterInfo.brandCountries.length > 0 && filterInfo.brandCountries.indexOf(element.prod_brand.prod_country) >= 0)) {


                    // if Filter Category, only add element of that Category
                    if (!filterInfo.categories.length || // if No Selected, means all
                        (filterInfo.categories.length > 0 && filterInfo.categories.indexOf(element.prod_category.id) >= 0)) {

                        // Check Satisfy Price range
                        if (element.UnitPrice >= filterInfo.priceRange.from && element.UnitPrice <= filterInfo.priceRange.to) {
                            if (!filterInfo.attributes.length) { // if No Selected, means all 
                                displayProducts.push(element)
                            } else {
                                // Need Satisfy All Selected Filter

                                let foundCount = 0;
                                let differentFilterName = [];
                                for (let j = 0; j < filterInfo.attributes.length; j++) {
                                    if (differentFilterName.indexOf(filterInfo.attributes[j].Name) < 0) {
                                        differentFilterName.push(filterInfo.attributes[j].Name);
                                    }
                                    for (let i = 0; i < element.prod_attributes.length; i++) {
                                        // Check another Filter criteria: Attribute
                                        if (filterInfo.attributes[j].Name == element.prod_attributes[i].Name) { // This is same Kind Filter
                                            if (filterInfo.attributes[j].id == element.prod_attributes[i].id) {
                                                foundCount++;
                                                break;
                                            }
                                        }
                                    }
                                }
                                if (foundCount == differentFilterName.length) {
                                    displayProducts.push(element)
                                }
                            }
                        }
                    }
                }
            }
            
        })
        return displayProducts;
    }

    // sorting: popular, new, discount, lowprice, highprice and searchname
    sortProduct (sorting, searchname, products) {
        if (products && products.length) {
            let productFilters = [...products];
            // Second, Sorting based on filter
            if (sorting == "lowprice") {
                productFilters.sort((a, b) =>
                    (a.UnitPrice > b.UnitPrice) ? 1 : -1
                );
            } else if (sorting == "highprice") {
                productFilters.sort((a, b) =>
                    (a.UnitPrice < b.UnitPrice) ? 1 : -1
                );
            }
            // TODO for New Product, Discount Product

            // Apply Search for all Name
            if (searchname) {
                searchname = searchname.trim();
            }
            if (searchname && searchname.length > 0) {
                productFilters = productFilters.filter(product => {
                    // Search substring using indexOf instead of includes for IE support
                    if (this.changeVietnameseToNonSymbol(product.Name).indexOf(
                            this.changeVietnameseToNonSymbol(searchname)) !== -1) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }
            return productFilters;
        } else {
            return [];
        }
    }
}
const helpers = new Helpers();
export default helpers;