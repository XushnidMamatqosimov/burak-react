import TabPanel from '@mui/lab/TabPanel'
import { Box, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { serverApi } from '../../../lib/config'
import { Order, OrderItem } from '../../../lib/types/order'
import { Product } from '../../../lib/types/product'
import { retrieveFinishedOrders } from './selector'

/** REDUX SLICE and SELECTOR */
const finishedOrdersRetriever = createSelector(
	retrieveFinishedOrders,
	finishedOrders => ({ finishedOrders }),
)

export default function FinishedOrders() {
	const { finishedOrders } = useSelector(finishedOrdersRetriever)
	return (
		<TabPanel value={'3'}>
			<Stack>
				{finishedOrders.map((order: Order) => {
					return (
						<Box key={order._id} className={'order-main-box'}>
							<Box className={'order-box-scroll'}>
								{order?.orderItems?.map((item: OrderItem) => {
									const product: Product = order.productData.filter(
										(ele: Product) => {
											return item.productId === ele._id
										},
									)[0]

									const imagePath = `${serverApi}/${product.productImages[0]}`
									return (
										<Box key={item._id} className={'orders-name-price'}>
											<img
												src={imagePath}
												alt=' '
												className={'order-dish-img'}
											/>
											<p className={'title-dish'}>{product.productName}</p>
											<Box className={'price-box'}>
												<p>${item.itemPrice}</p>
												<img src={'/icons/close.svg'} alt=' ' />
												<p>{item.itemQuantity}</p>
												<img src={'/icons/pause.svg'} alt=' ' />
												<p style={{ marginLeft: '15px' }}>
													${item.itemQuantity * item.itemPrice}
												</p>
											</Box>
										</Box>
									)
								})}
							</Box>

							<Box className={'total-price-box'}>
								<Box className={'box-total'}>
									<p>Product price</p>
									<p>${order.orderTotal - order.orderDelivery}</p>
									<img
										src={'/icons/plus.svg'}
										alt=' '
										style={{ marginLeft: '20px' }}
									/>
									<p>Delivery cost</p>
									<p>${order.orderDelivery}</p>
									<img
										src={'/icons/pause.svg'}
										alt=' '
										style={{ marginLeft: '20px' }}
									/>
									<p>Total</p>
									<p>${order.orderTotal}</p>
								</Box>
							</Box>
						</Box>
					)
				})}

				{!finishedOrders ||
					(finishedOrders.length === 0 && (
						<Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
						>
							<img
								src={'/icons/noimage-list.svg'}
								alt=' '
								style={{ width: 300, height: 300 }}
							/>
						</Box>
					))}
			</Stack>
		</TabPanel>
	)
}





































/* import TabPanel from "@mui/lab/TabPanel";

const products = [
  {
    id: 1,
    name: "Kebab",
    image: "/img/kebab.webp",
    price: 12,
    quantity: 2,
  },
  {
    id: 2,
    name: "Kebab",
    image: "/img/kebab.webp",
    price: 12,
    quantity: 2,
  },
  {
    id: 3,
    name: "Kebab",
    image: "/img/kebab.webp",
    price: 12,
    quantity: 2,
  },
];

const orders = [
  { id: 1, products, deliveryCost: 2 },
  { id: 2, products, deliveryCost: 2 },
];

export default function FinishedOrders() {
  return (
    <TabPanel value="3">
      <div className="finished-orders-panel">
      <div className="finished-orders-list">
        {orders.map((order) => {
          const productPrice = order.products.reduce(
            (sum, product) => sum + product.price * product.quantity,
            0
          );

          const total = productPrice + order.deliveryCost;

          return (
            <div key={order.id} className="finished-order-card">
              <div className="finished-order-items">
                {order.products.map((product) => (
                  <div key={product.id} className="finished-order-item">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="finished-order-image"
                    />

                    <span className="finished-order-name">
                      {product.name}
                    </span>

                    <div className="finished-order-price">
                      <span>${product.price}</span>
                      <span className="finished-order-symbol">×</span>
                      <span>{product.quantity}</span>
                      <span className="finished-order-symbol">=</span>

                      <span className="finished-order-line-total">
                        ${product.price * product.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="finished-order-summary">
                <div className="finished-order-summary-part">
                  <span>Product price</span>
                  <span>${productPrice}</span>
                </div>

                <span className="finished-order-symbol">+</span>

                <div className="finished-order-summary-part">
                  <span>Delivery cost</span>
                  <span>${order.deliveryCost}</span>
                </div>

                <span className="finished-order-symbol">=</span>

                <div className="finished-order-summary-part">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </TabPanel>
  );
} */