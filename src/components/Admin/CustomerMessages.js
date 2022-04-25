import axios from 'axios';
import React, { useEffect, useState } from 'react'
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
const Message = (props) => {
    return (
        <div>
            <table>
                <tr>
                    <td>Subject: </td>
                    <td>{props.subject}</td>
                </tr>
                <tr>
                    <td>Message: </td>
                    <td>{props.message}</td>
                </tr>
            </table>
        </div>
    )
}
function CustomerMessage(props) {
    const updateMessageStatus = (status, messageId) => {
        axios({
            baseURL: "http://localhost:5000/admin/customer-messages/update",
            method: "POST",
            data: {
                status: status,
                messageId: messageId,
            },
            headers: {
                "adminauthentication": localStorage.getItem("admin"),
            }
        }).then((data) => {
            alert(data.data.message);
            props.setCustomerMessageData((prevState) => {
                return (prevState.filter((ele) => {
                    return ele._id !== messageId;
                }));
            })
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
                        <td>{props.item.name}</td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td>{props.item.email}</td>
                    </tr>
                    <tr>
                        <td>Status: </td>
                        <td style={{ color: "darkred", fontWeight: "bold", fontSize: "large" }}>{props.item.status ? props.item.status : ""}</td>
                    </tr>
                    <tr>
                        <td>Date: </td>
                        <td>{getDate(props.item.createdAt)}</td>
                    </tr>
                </table>
            </div>
            <div className='admin-orders-orderitem-orderdetails'>
                <h4>Message details</h4>
                <Message message={props.item.description} subject={props.item.subject} />
            </div>
            <div className='admin-orders-orderitem-buttons'>
                {
                    props.item.status === "unattended" &&
                    <button onClick={() => { updateMessageStatus("attended", props.item._id) }}>Attended</button>
                }
            </div>
        </div>
    )
}

const CustomerMessages = () => {
    const [customerMessageData, setCustomerMessageData] = useState([]);
    // const [filterOption, setFilterOption] = useState("all");
    const fetchCustomerMessages = () => {
        axios({
            baseURL: "http://localhost:5000/admin/customer-messages",
            method: "GET",
            data: null,
            headers: {
                "adminauthentication": localStorage.getItem("admin"),
            }
        }).then((data) => {
            console.log(data.data);
            setCustomerMessageData(data.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        fetchCustomerMessages();
    }, []);
    return (
        <div>
            <div className='admin-orders-list'>
                {
                    customerMessageData &&
                    customerMessageData.reverse().map((message, index) => {
                        return <CustomerMessage item={message} key={index} index={index + 1} setCustomerMessageData={setCustomerMessageData} />
                    })
                }
            </div>
        </div>
    )
}

export default CustomerMessages;