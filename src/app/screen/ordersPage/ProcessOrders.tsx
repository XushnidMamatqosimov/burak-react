import TabPanel from '@mui/lab/TabPanel'
import { Box, Stack } from '@mui/material'
import Button from '@mui/material/Button'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { Messages, serverApi } from '../../../lib/config'
import { sweetErrorHandling } from '../../../lib/sweetAlert'
import { T } from '../../../lib/types/common'
import { Order, OrderItem, OrderUpdateInput } from '../../../lib/types/order'
import { Product } from '../../../lib/types/product'
import { useGlobals } from '../../hooks/useGlobal'
import { OrderStatus } from '../../../lib/enums/orderEnum'
import OrderService from '../../service/OrderService'
import { retrieveProcessOrders } from './selector'

/** REDUX SLICE and SELECTOR */
const processOrdersRetriever = createSelector(
	retrieveProcessOrders,
	processOrders => ({ processOrders }),
)

interface ProcessOrdersProps {
	setValue: (input: string) => void
}

export default function ProcessOrders(props: ProcessOrdersProps) {
	const { setValue } = props
	const { processOrders } = useSelector(processOrdersRetriever)

	/** HANDLERS */
	/* const finishOrderHandler = async (e: T) => {
		try {
			if (!authMember) throw new Error(Messages.error2)
			// PAYMENT PROCESS
			const orderId = e.target.value
			const input: OrderUpdateInput = {
				orderId: orderId,
				orderStatus: OrderStatus.FINISH,
			}

			const confirmation = window.confirm('Have you  received your order?')
			if (confirmation) {
				const order = new OrderService()
				//await order.updateOrder(input)
				setValue('3')
				setOrderBuilder(new Date())
			}
		} catch (err) {
			console.log(err)
			sweetErrorHandling(err).then()
		}
	} */

	return (
		<TabPanel value={'2'}>
			<Stack>
				{processOrders?.map((order: Order) => {
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
												alt=''
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
										style={{ marginLeft: '20px' }}
										alt=' '
									/>
									<p>delivery cost</p>
									<p>${order.orderDelivery}</p>
									<img
										src={'/icons/pause.svg'}
										alt=' '
										style={{ marginLeft: '20px' }}
									/>
									<p>Total</p>
									<p>${order.orderTotal}</p>
								</Box>
								<p className={'data-compl'}>
									{moment().format('YY-MM-DD HH:mm')}
								</p>
								<Button
									value={order._id}
									variant='contained'
									className={'verify-button'}
									//onClick={finishOrderHandler}
								>
									Verify to Fulfil
								</Button>
							</Box>
						</Box>
					)
				})}

				{!processOrders ||
					(processOrders.length === 0 && (
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
























/* import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";

const products = [
  {
    id: 1,
    name: "Kebab",
    image: "/img/kebab-fresh.webp",
    price: 11,
    quantity: 2,
  },
  {
    id: 2,
    name: "Kebab",
    image: "/img/kebab-fresh.webp",
    price: 11,
    quantity: 2,
  },
];

const orders = [
  {
    id: 1,
    products,
    deliveryCost: 2,
    date: "24-02-03 08:38",
  },
  {
    id: 2,
    products,
    deliveryCost: 2,
    date: "24-02-03 08:38",
  },
];

export default function ProcessOrders() {
  return (
    <div className="process-orders-panel">
      <TabPanel value="2">
        <div className="process-orders-list">
        {orders.map((order) => {
          const productPrice = order.products.reduce(
            (sum, product) => sum + product.price * product.quantity,
            0
          );

          const total = productPrice + order.deliveryCost;

          return (
            <div key={order.id} className="process-order-card">
              <div className="process-order-items">
                {order.products.map((product) => (
                  <div key={product.id} className="process-order-item">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="process-order-image"
                    />

                    <span className="process-order-name">
                      {product.name}
                    </span>

                    <div className="process-order-price">
                      <span>${product.price}</span>
                      <span className="process-order-symbol">×</span>
                      <span>{product.quantity}</span>
                      <span className="process-order-symbol">=</span>

                      <span className="process-order-line-total">
                        ${product.price * product.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="process-order-footer">
                <div className="process-order-summary">
                  <div className="process-order-summary-part">
                    <span>Product price</span>
                    <span>${productPrice}</span>
                  </div>

                  <span className="process-order-symbol">+</span>

                  <div className="process-order-summary-part">
                    <span>delivery cost</span>
                    <span>${order.deliveryCost}</span>
                  </div>

                  <span className="process-order-symbol">=</span>

                  <div className="process-order-summary-part">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>

                <span className="process-order-date">
                  {order.date}
                </span>

                <Button
                  variant="contained"
                  className="process-order-confirm"
                >
                  VERIFY TO FULFIL
                </Button>
              </div>
            </div>
          );
        })}
        </div>
      </TabPanel>
    </div>
  );
} */