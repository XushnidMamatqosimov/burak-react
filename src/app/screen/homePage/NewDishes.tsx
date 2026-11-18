import { Box, Container, Divider, Stack } from "@mui/material";
import {
  AspectRatio,
  Card,
  CardOverflow,
  Typography,
} from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { serverApi } from "../../../lib/config";
import { createSelector } from "@reduxjs/toolkit";
import { rethrieveNewDishes } from "./selector";
import { Product } from "../../../lib/types/product";

const newDishesRetriever = createSelector(
  rethrieveNewDishes,
  (newDishes) => ({ newDishes }),
);

export default function NewDishes() {
  const { newDishes } = useSelector((state: RootState) => newDishesRetriever(state));
  console.log("NewDishes from newDishes.tsx", newDishes);

  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Fresh Menu</Box>

          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                newDishes.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume = product.productCollection
                    ? product.productVolume + "L"
                    : product.productSize + "size";
                  return (
                    <Card key={product._id} variant="outlined" className={"card"}>
                      <CardOverflow>
                        <div className="product-sale">{sizeVolume}</div>

                        <AspectRatio ratio="1">
                          <img src={imagePath} alt="" />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft" className="product-detail">
                        <Stack className="info">
                          <Stack direction="row">
                            <Typography className={"title"}>
                              {product.productName}
                            </Typography>

                            <Divider
                              orientation="vertical"
                              sx={{
                                width: "2px",
                                height: "24px",
                                bgcolor: "#d9d9d9",
                                border: "none",
                              }}
                            />

                            <Typography className={"price"}>{product.productPrice}</Typography>
                          </Stack>

                          <Stack>
                            <Typography className={"views"}>
                              {product.productViews}
                              <VisibilityIcon
                                sx={{ fontSize: 20, marginLeft: "5px" }}
                              />
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">New Products not available</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}