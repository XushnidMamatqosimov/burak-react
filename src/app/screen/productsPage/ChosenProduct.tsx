import React, { useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "../../../css/products.css";
import { Dispatch } from "@reduxjs/toolkit";
import { Product } from "../../../lib/types/product";
import { setChosenProduct, setRestaurnt } from "./slice";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveChosenProduct, retrieveRestaurant } from "./selector";
import { useParams } from "react-router-dom";
import ProductService from "../../service/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { Member } from "../../../lib/types/member";
import MemberService from "../../service/MemberService";
import { serverApi } from "../../../lib/config";
import { CardItem } from "../../../lib/types/search";

/** Redux Slice & Selector **/
const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: Member) => dispatch(setRestaurnt(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({ chosenProduct })
);
const restaurantRetriever = createSelector(
  retrieveRestaurant,
  (restaurant) => ({ restaurant })
);

interface ChosenProductProps {
  onAdd: (item: CardItem) => void;
}


export default function ChosenProduct(props: ChosenProductProps) {
  const {onAdd} = props;
  const { productId } = useParams<{ productId: string }>();
  const { setRestaurant, setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { restaurant } = useSelector(restaurantRetriever);

  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getRestaurnt()
      .then((data) => setRestaurant(data))
      .catch((err) => console.log(err))
  }, [])

  if (!chosenProduct) return null;
  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Detail</Box>
      <Container className={"product-container"}>
        <Stack
          className="chosen-product-slider"
          style={{ width: "100%", minWidth: 0 }}
        >
          <Swiper
            key={chosenProduct._id}
            slidesPerView={1}
            loop={chosenProduct.productImages.length > 1}
            spaceBetween={10}
            navigation
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
            style={{
              width: "100%",
              height: 450,
            }}
          >
            {chosenProduct.productImages.map((image, index) => {
              const imagePath =
                `${serverApi.replace(/\/+$/, "")}/${image.replace(/^\/+/, "")}`;

              return (
                <SwiperSlide key={index}>
                  <img
                    className="slider-image"
                    src={imagePath}
                    alt={chosenProduct.productName}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    onLoad={() => {
                      console.log("Rasm yuklandi:", imagePath);
                    }}
                    onError={() => {
                      console.error("Rasm yuklanmadi:", imagePath);
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
        <Stack className={"chosen-product-info"}>
          <Box className={"info-box"}>
            <strong className={"product-name"}>{chosenProduct?.productName}</strong>
            <span className={"resto-name"}>{restaurant?.memberNick}</span>
            <span className={"resto-name"}>{restaurant?.memberPhone}</span>

            <Box className={"rating-box"}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <div className={"evaluation-box"}>
                <div className={"product-view"}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct?.productViews}</span>
                </div>
              </div>
            </Box>
            <p className={"product-desc"}>{chosenProduct?.productDesc ? chosenProduct?.productDesc : "No Description"}</p>
            <Divider height="1" width="100%" bg="#000000" />
            <div className={"product-price"}>
              <span>Price:</span>
              <span>${chosenProduct?.productPrice}</span>
            </div>
            <div className={"button-box"}>
              <Button variant="contained">Add To Basket</Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}



{/* <Stack className={"chosen-product-slider"}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {(chosenProduct?.productImages ?? []).map(
              
              (ele: string, index: number) => {
                console.log(chosenProduct);
                const imagePath = `${serverApi}/${ele}`
                console.log("Rasm manzili:", imagePath);
                console.log("Mahsulot:", chosenProduct);
               console.log("Rasmlar:", chosenProduct?.productImages);
                return (
                  <SwiperSlide key={index}>
                    <img className="slider-image" src={imagePath} />
                  </SwiperSlide>
                );
              }
            )}
          </Swiper>
        </Stack> */}
