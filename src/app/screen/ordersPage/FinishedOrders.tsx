import TabPanel from "@mui/lab/TabPanel";

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
}