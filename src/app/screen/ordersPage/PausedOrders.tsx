import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { Order, OrderItem } from "../../../lib/types/order";
import { Box, Stack } from "@mui/material";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { retrievePausedOrders } from "./selector";


/** REDUX SLICE and SELECTOR */
const pausedOrdersRetriever = createSelector(
	retrievePausedOrders,
	pausedOrders => ({ pausedOrders }),
)


export default function PausedOrders() {
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  return (
		<TabPanel value={'1'}>
			<Stack>
				{pausedOrders?.map((order: Order) => {
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
								<Button
									value={order._id}
									variant='contained'
									color='secondary'
									className={'cancel-button'}
									//onClick={deleteOrderHandler}
								>
									Cancel
								</Button>
								<Button
									value={order._id}
									variant='contained'
									className={'pay-button'}
									//onClick={processOrderHandler}
								>
									Payment
								</Button>
							</Box>
						</Box>
					)
				})}

				{!pausedOrders ||
					(pausedOrders.length === 0 && (
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








