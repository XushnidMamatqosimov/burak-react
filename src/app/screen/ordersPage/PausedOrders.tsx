import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";

const products = [
  {
    id: 1,
    name: "Steak",
    image: "/img/kebab.webp",
    price: 10,
    quantity: 2,
  },
  {
    id: 2,
    name: "Fried chicken",
    image: "/img/kebab-fresh.webp",
    price: 10,
    quantity: 2,
  },
  {
    id: 3,
    name: "Winner",
    image: "/img/lavash.webp",
    price: 10,
    quantity: 2,
  },
];

const orders = [
  { id: 1, products, deliveryCost: 5 },
  { id: 2, products, deliveryCost: 5 },
];

export default function PausedOrders() {
  return (
    <TabPanel value="1">
      <div className="paused-orders-panel">
      <div className="paused-orders-list">
        {orders.map((order) => {
          const productPrice = order.products.reduce(
            (sum, product) => sum + product.price * product.quantity,
            0
          );

          const total = productPrice + order.deliveryCost;

          return (
            <div key={order.id} className="paused-order-card">
              <div className="paused-order-items">
                {order.products.map((product) => (
                  <div key={product.id} className="paused-order-item">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="paused-order-image"
                    />

                    <span className="paused-order-name">
                      {product.name}
                    </span>

                    <div className="paused-order-price">
                      <span>${product.price}</span>
                      <span className="paused-order-symbol">×</span>
                      <span>{product.quantity}</span>
                      <span className="paused-order-symbol">=</span>
                      <span>${product.price * product.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="paused-order-footer">
                <div className="paused-order-summary">
                  <div className="paused-order-summary-part">
                    <span>Product price</span>
                    <span className="paused-order-amount">
                      ${productPrice}
                    </span>
                  </div>

                  <span className="paused-order-symbol">+</span>

                  <div className="paused-order-summary-part">
                    <span>Delivery cost</span>
                    <span className="paused-order-amount">
                      ${order.deliveryCost}
                    </span>
                  </div>

                  <span className="paused-order-symbol">=</span>

                  <div className="paused-order-summary-part">
                    <span>Total</span>
                    <span className="paused-order-amount">${total}</span>
                  </div>
                </div>

                <div className="paused-order-actions">
                  <Button
                    variant="contained"
                    className="paused-order-button paused-order-cancel"
                  >
                    CANCEL
                  </Button>

                  <Button
                    variant="contained"
                    className="paused-order-button paused-order-payment"
                  >
                    PAYMENT
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </TabPanel>
  );
}