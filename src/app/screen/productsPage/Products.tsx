import { Box, Button, Container, Stack } from "@mui/joy";

import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const products = [
    { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
    { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
    { productName: "Kebab", imagePath: "/img/kebab.webp" },
    { productName: "Lavash", imagePath: "/img/lavash.webp" },
    { productName: "Lavash", imagePath: "/img/lavash.webp" },
    { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
    { productName: "Kebab", imagePath: "/img/kebab.webp" },
    { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];


export default function Products() {
    return (
        <div className={"products"}>
            <Container>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Stack className={"avatar-big-box"}>
                        ...
                    </Stack>

                    <Stack className={"dishes-filter-section"}>
                        <Stack className={"dishes-filter-box"}>
                            <Button
                                variant={"solid"}
                                color={"primary"}
                                className={"order"}
                            >
                                New
                            </Button>

                            <Button
                                variant={"solid"}
                                color={"neutral"}
                                className={"order"}
                            >
                                Price
                            </Button>

                            <Button
                                variant={"solid"}
                                color={"neutral"}
                                className={"order"}
                            >
                                Views
                            </Button>
                        </Stack>
                    </Stack>

                    <Stack className={"list-category-section"}>
                        <Stack className={"product-category"}>
                            <div className={"category-main"}>
                                <Button variant={"solid"} color={"neutral"}>
                                    Other
                                </Button>

                                <Button variant={"solid"} color={"neutral"}>
                                    Dessert
                                </Button>

                                <Button variant={"solid"} color={"neutral"}>
                                    Drink
                                </Button>

                                <Button variant={"solid"} color={"neutral"}>
                                    Salad
                                </Button>

                                <Button variant={"solid"} color={"primary"}>
                                    Dish
                                </Button>
                            </div>
                        </Stack>
                        <Stack className={"product-wrapper"}>
                            {products.length !== 0 ? (
                                products.map((product, index) => {
                                    return (
                                        <Stack key={index} className={"product-card"}>
                                            <Stack
                                                className={"product-img"}
                                                sx={{
                                                    backgroundImage: `url(${product.imagePath})`,
                                                }}
                                            >
                                                <div className={"product-sale"}>Normal size</div>

                                                <Button className={"shop-btn"}>
                                                    <img
                                                        src={"/icons/shopping-cart.svg"}
                                                        style={{ display: "flex" }}
                                                        alt="Shopping cart"
                                                    />
                                                </Button>

                                                <Button className={"view-btn"} sx={{ right: "36px" }}>
                                                    <Badge badgeContent={20} color="secondary">
                                                        <RemoveRedEyeIcon
                                                            sx={{
                                                                color: 20 ? "gray" : "white",
                                                            }}
                                                        />
                                                    </Badge>
                                                </Button>
                                            </Stack>

                                            <Box className={"product-desc"}>
                                                <span className={"product-title"}>
                                                    {product.productName}
                                                </span>

                                                <div className={"product-desc"}>
                                                    <MonetizationOnIcon />
                                                    {/* Qolgan kod rasmda харагдахгүй байна */}
                                                </div>
                                            </Box>
                                        </Stack>
                                    );
                                })
                            ) : (
                                <Box className={"no-data"}>Products are not available</Box>
                            )}
                        </Stack>
                    </Stack>

                    <Stack className={"pagination-section"}>
                        <Pagination
                            count={3}
                            page={1}
                            renderItem={(item) => (
                                <PaginationItem
                                    slots={{
                                        previous: ArrowBackIcon,
                                        next: ArrowForwardIcon,
                                    }}
                                    {...item}
                                    color={"secondary"}
                                />
                            )}
                        />
                    </Stack>
                </Stack>
            </Container>

            <div className="brands-logo">
                <h2 className="brands-title">Our Family Brands</h2>

                <div className="brands-list">
                    <div className="brand-card">
                        <img src="/img/doner.webp" alt="CZN Burak Gurme" />
                    </div>

                    <div className="brand-card">
                        <img src="/img/gurme.webp" alt="CZN Burak Sweets" />
                    </div>

                    <div className="brand-card">
                        <img src="/img/doner.webp" alt="CZN Burak Seafood" />
                    </div>

                    <div className="brand-card">
                        <img src="/img/gurme.webp" alt="CZN Burak Döner" />
                    </div>
                </div>
            </div>

           <div className={"address"}>
  <Container>
    <Stack className={"address-area"}>
      <Box className={"title"}>Our address</Box>

      <iframe
        style={{ marginTop: "60px" }}
        src="GOOGLE_MAPS_EMBED_URL"
        width="1320"
        height="500"
        referrerPolicy="no-referrer-when-downgrade"
        title="Our address on Google Maps"
      ></iframe>
    </Stack>
  </Container>
</div>
        </div>
    );
}