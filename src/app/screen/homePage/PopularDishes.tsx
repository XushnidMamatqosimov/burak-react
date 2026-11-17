import { Box, Container, Stack } from "@mui/material";
import { CardOverflow } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { serverApi } from "../../../lib/config";

export default function PopularDishes() {
  const dishesFromStore = useSelector(
    (state: RootState) => state.homePage.popularDishes
  );

  console.log("Komponentdagi qiymat:", dishesFromStore);
  console.log("Massivmi:", Array.isArray(dishesFromStore));

  const popularDishes = Array.isArray(dishesFromStore)
    ? dishesFromStore
    : [];

  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Popular Dishes</Box>

          <Stack className="cards-frame">
            {popularDishes.length > 0 ? (
              popularDishes.map((ele) => {
                const image = ele.productImages?.[0];
                const imagePath = image
                  ? `${serverApi}/${image}`
                  : undefined;

                return (
                  <CssVarsProvider key={ele._id}>
                    <Card className="card">
                      <CardCover>
                        {imagePath && (
                          <img
                            src={imagePath}
                            alt={ele.productName}
                          />
                        )}
                      </CardCover>

                      <CardCover className="card-cover" />

                      <CardContent
                        sx={{ justifyContent: "flex-end" }}
                      >
                        <Stack
                          sx={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            level="h2"
                            fontSize="lg"
                            textColor="#fff"
                            sx={{ mb: 1 }}
                          >
                            {ele.productName}
                          </Typography>

                          <Typography
                            sx={{
                              fontWeight: "md",
                              color: "neutral.300",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            {ele.productViews}

                            <VisibilityIcon
                              sx={{
                                fontSize: "25px",
                                marginLeft: "5px",
                              }}
                            />
                          </Typography>
                        </Stack>
                      </CardContent>

                      <CardOverflow
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          py: 1.5,
                          px: "var(--Card-padding)",
                          borderTop: "1px solid",
                          height: "60px",
                        }}
                      >
                        <Typography
                          startDecorator={
                            <DescriptionOutlinedIcon />
                          }
                          textColor="neutral.300"
                        >
                          {ele.productDesc}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">
                Popular Dishes not available
              </Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}