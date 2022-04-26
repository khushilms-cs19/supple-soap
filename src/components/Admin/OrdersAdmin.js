import axios from 'axios';
import React, { useEffect, useState } from 'react';
import searchIcon from "../../images/searchicon.svg";

const capitalizeName = (name) => {
    return name.split(" ").map((n) => n[0].toUpperCase() + n.slice(1)).join(" ");
}
const getDate = (iso) => {
    const date = new Date(iso);
    let month = "";
    switch (date.getMonth()) {
        case 0: month = "January"; break;
        case 1: month = "February"; break;
        case 2: month = "March"; break;
        case 3: month = "April"; break;
        case 4: month = "May"; break;
        case 5: month = "June"; break;
        case 6: month = "July"; break;
        case 7: month = "August"; break;
        case 8: month = "September"; break;
        case 9: month = "October"; break;
        case 10: month = "November"; break;
        case 11: month = "December"; break;
        default: month = "January";
    }
    return `${date.getDate()}, ${month} ${date.getFullYear()}`
}
const OrderItem = (props) => {
    const updateOrderStatus = (status, orderId, type) => {
        axios({
            baseURL: "https://supple-soap-backend-api.herokuapp.com/admin/orders/update",
            method: "POST",
            data: {
                status: status,
                orderId: orderId,
                type: type,
            },
            headers: {
                "adminauthentication": localStorage.getItem("admin"),
            }
        }).then((data) => {
            alert(data.data.message);
        }).catch((err) => {
            alert(err);
        })
    }
    return (
        <div className='admin-orders-orderitem'>
            <div className='admin-orders-orderitem-userdetails'>
                <h4>User Details</h4>
                <table>
                    <tr>
                        <td>Name: </td>
                        <td>{props.item.userDetails.name}</td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td>{props.item.userDetails.email}</td>
                    </tr>
                    <tr>
                        <td>Phone: </td>
                        <td>{props.item.userDetails.phoneno}</td>
                    </tr>
                    <tr>
                        <td>Address: </td>
                        <td>{props.item.userDetails.address}</td>
                    </tr>
                    <tr>
                        <td>Status: </td>
                        <td style={{ color: "darkred", fontWeight: "bold", fontSize: "large" }}>{props.item.status}</td>
                    </tr>
                    <tr>
                        <td>Date: </td>
                        <td>{getDate(props.item.createdAt)}</td>
                    </tr>
                </table>
                {/* <p>Name: {props.item.userDetails.name}</p>
                <p>Email: {props.item.userDetails.email}</p>
                <p>Phone: {props.item.userDetails.phoneno}</p>
                <p>Status: {props.item.status}</p>
                <p>Total Amount: {props.item.totalAmount}</p> */}
            </div>
            <div className='admin-orders-orderitem-orderdetails'>
                <h4>Product details</h4>
                {
                    props.type === "supple" ?
                        props.item.productDetails.map((product, index) => {
                            return (
                                <ProductItem key={index} name={product.name} quantity={product.quantity} index={index + 1} />
                            )
                        })
                        :
                        props.item.products.map((product, index) => {
                            return (
                                <ProductItem key={index} name={`${capitalizeName(product.base)}, ${capitalizeName(product.scrub)}, ${capitalizeName(product.type)}, ${capitalizeName(product.fragrance)}, ${capitalizeName(product.essentialOil)}`} index={index + 1} quantity={product.quantity} />
                            )
                        })
                }
            </div>
            <div className='admin-orders-orderitem-buttons'>
                {
                    props.item.status === "order_placed" &&
                    <button onClick={() => updateOrderStatus("dispatched", props.item._id, props.type)}>Dispatch</button>
                }
                {
                    props.item.status === "dispatched" &&
                    <button onClick={() => updateOrderStatus("delivered", props.item._id, props.type)}>Delivered</button>
                }
            </div>
        </div>
    );
}

const ProductItem = (props) => {
    return (
        <div className='admin-orders-productitem'>
            <div>
                <p>{props.index}.</p>
            </div>
            <div>
                <p>{props.name}</p>
                <p>Quantity: {props.quantity}</p>
            </div>
        </div>
    )
}

const CustomizedOrderItem = (props) => {
    return (<div className='cart-modal-item' style={{ padding: "10px", boxSizing: "border-box" }}>
        <p>{capitalizeName(props.item.base)}, {capitalizeName(props.item.scrub)}, {capitalizeName(props.item.type)}, {capitalizeName(props.item.fragrance)}, {capitalizeName(props.item.essentialOil)}</p>
        <span>{`x${props.item.quantity}`}</span>
    </div>)
}
function OrdersAdmin() {
    const [ordersData, setOrdersData] = useState({});
    const [filterOption, setFilterOption] = useState("all");
    const [activeOrderType, setActiveOrderType] = useState("supple");

    const fetchOrdersData = () => {
        axios({
            baseURL: "https://supple-soap-backend-api.herokuapp.com/admin/orders",
            method: "GET",
            data: null,
            headers: {
                "adminauthentication": localStorage.getItem("admin"),
            }
        }).then((data) => {
            console.log(data.data);
            setOrdersData(data.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    const applyFilter = (event) => {
        setFilterOption(event.target.value);
    }
    const switchToSuppleOrders = () => {
        setActiveOrderType("supple");
    }
    const switchToCustomizedOrders = () => {
        setActiveOrderType("customized");
    }
    useEffect(() => {
        fetchOrdersData();
    }, []);
    const filteredOrders = activeOrderType === "supple" && ordersData.regularOrders ?
        ordersData.regularOrders.filter((order) => {
            if (filterOption === "all") {
                return true;
            }
            return order.status === filterOption;
        }) : []
    const filteredCustomizedOrder = activeOrderType === "customized" && ordersData.customizedOrders ?
        ordersData.customizedOrders.filter((order) => {
            if (filterOption === "all") {
                return true;
            }
            return order.status === filterOption;
        }) : []
    return (
        <div>
            <div className='admin-orders-options'>
                <div className='admin-orders-options-filter'>
                    <label htmlFor="orders">Filter</label>
                    <select name="orders" onChange={applyFilter}>
                        <option value="all">All</option>
                        <option value="order_placed">Placed Orders</option>
                        <option value="dispatched">Dispatched Orders</option>
                        <option value="delivered">Delivered Orders</option>
                    </select>
                </div>
                <div className='admin-orders-type-buttons'>
                    <button style={{ outline: activeOrderType === "supple" ? "5px solid #a79481" : "" }} onClick={switchToSuppleOrders}>Supple Products</button>
                    <button style={{ outline: activeOrderType === "customized" ? "5px solid #a79481" : "" }} onClick={switchToCustomizedOrders}>Customized Products</button>
                </div>
                <div className='admin-orders-options-search'>
                    <input placeholder='Search for a user...' />
                    <img src={searchIcon} />
                </div>
            </div>
            <div className='admin-orders-list'>
                {
                    activeOrderType === "supple" &&
                    (filteredOrders.length !== 0 ?
                        filteredOrders.reverse().map((prod, index) => {
                            return <OrderItem key={index} item={prod} type={activeOrderType} />
                        }) :
                        <p>There are no orders</p>)
                }
                {
                    activeOrderType === "customized" &&
                    (filteredCustomizedOrder.length !== 0 ?
                        filteredCustomizedOrder.reverse().map((prod, index) => {
                            return <OrderItem type={activeOrderType} item={prod} key={index} />
                        }) :
                        <p>There are no orders</p>)
                }
            </div>
        </div>
    )
}

export default OrdersAdmin;