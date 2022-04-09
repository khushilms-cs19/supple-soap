import React, { useEffect, useState } from 'react'
import useRequests from '../../hooks/useRequest';
import soap from "../../images/soap.png";
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
    return (<div className='cart-modal-item' style={{ padding: "10px", boxSizing: "border-box" }}>
        <img src={props.item.image} alt="soap" />
        <p>{props.item.name}</p>
        <span>{`x${props.item.quantity}`}</span>
    </div>)
}
const CustomizedOrderItem = (props) => {
    return (<div className='cart-modal-item' style={{ padding: "10px", boxSizing: "border-box" }}>
        <img src={soap} alt="soap" />
        <p>{capitalizeName(props.item.base)}, {capitalizeName(props.item.scrub)}, {capitalizeName(props.item.type)}, {capitalizeName(props.item.fragrance)}, {capitalizeName(props.item.essentialOil)}</p>
        <span>{`x${props.item.quantity}`}</span>
    </div>)
}
function Orders() {
    const [suppleProducts, setSuppleProducts] = useState([]);
    const [customizedProducts, setCustomizedProducts] = useState([]);
    const [activeTab, setActiveTab] = useState("customized");

    const { doRequest: getUserOrdersSupple, errors: suppleError } = useRequests({
        route: "/user/orders",
        method: "get",
        body: null,
        onSuccess: (data) => {
            setSuppleProducts(data.regularProducts);
            setCustomizedProducts(data.customizedProducts);
        }
    });
    useEffect(() => {
        getUserOrdersSupple();
    }, []);
    const selectSupple = () => {
        setActiveTab("supple");
    }
    const selectCustomized = () => {
        setActiveTab("customized");
    }
    console.log(suppleProducts);
    console.log(customizedProducts);
    return (
        <div>
            <h3>Your Orders</h3>
            <div>
                <button onClick={selectSupple}>Supple Products</button>
                <button onClick={selectCustomized}>Customized Products</button>
            </div>
            {
                suppleProducts &&
                <div>
                    {
                        activeTab === "supple" &&
                        <div>
                            {
                                suppleProducts.map((product, index) => {
                                    return <div>
                                        <div>
                                            <p>{index + 1}. {getDate(product.createdAt)} </p>
                                            <p>₹{product.totalAmount}</p>
                                        </div>
                                        {
                                            product.productDetails.map((product) => {
                                                return (
                                                    <OrderItem item={product} />
                                                )
                                            })
                                        }
                                    </div>
                                })
                            }
                        </div>
                    }
                    {
                        activeTab === "customized" &&
                        <div>
                            {
                                customizedProducts.map((product, index) => {
                                    return <div>
                                        <p>{index + 1}. {getDate(product.createdAt)}</p>
                                        {
                                            product.products.map((prod) => {
                                                return (
                                                    <CustomizedOrderItem item={prod} />
                                                )
                                            })
                                        }
                                    </div>
                                })
                            }
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Orders;