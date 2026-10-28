import Button from "@mui/material/Button";
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
}