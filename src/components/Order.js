import React from 'react';

const Order = ({ order }) => {
    const orders = [
        {
            productName: 'JavaScript Tutorial',
            productNumber: '85743',
            paymentStatus: 'Due',
            status: 'Pending',
        },
        {
            productName: 'CSS Full Course',
            productNumber: '97245',
            paymentStatus: 'Refunded',
            status: 'Declined',
        },
        {
            productName: 'Flex-Box Tutorial',
            productNumber: '36452',
            paymentStatus: 'Paid',
            status: 'Active',
        },
    ];
    return (
        <div className="recent-orders">
            <h2>Recent Orders</h2>
            <table>
                <thead>
                <tr>
                    <th>Course Name</th>
                    <th>Course Number</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => (
                    <tr key={index}>
                        <td>{order.productName}</td>
                        <td>{order.productNumber}</td>
                        <td>{order.paymentStatus}</td>
                        <td className={order.status === 'Declined' ? 'danger' : order.status === 'Pending' ? 'warning' : 'primary'}>
                            {order.status}
                        </td>
                        <td className="primary">Details</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <a href="#">Show All</a>
        </div>
    );
};

export default Order;
