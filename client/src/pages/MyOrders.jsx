import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)

  console.log("order Items",orders)
  return (
    <div>
      <div className='bg-white shadow-md p-3 font-semibold'>
        <h1>Orders</h1>
      </div>
        {
          !orders[0] && (
            <NoData/>
          )
        }
        {
          orders.map((order,index)=>{
            return(
              <div key={order._id+index+"order"} className='order rounded p-4 text-sm'>
                  <div className='flex flex-col gap-3'>
                  <p className='text-left'>Order No : {order?.orderId}</p>
                    <img
                      src={order.product_details.image[0]} 
                      className='w-40 h-40'
                    />  
                    <p className='text-justify font-medium'>{order.product_details.name}</p>
                  </div>
              </div>
            )
          })
        }
    </div>
  )
}

export default MyOrders