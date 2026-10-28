import { useState, SyntheticEvent } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";

import "../../../css/order.css";

const panelStyle = {
  width: "100%",
  padding: "26px",
  boxSizing: "border-box",
  borderRadius: "22px",
  backgroundColor: "#f8f8ff",
  boxShadow: `
    12px 16px 5px rgba(0, 0, 0, 0.23),
    inset 0 10px 20px rgba(157, 155, 188, 0.36),
    inset 0 -10px 20px rgba(157, 155, 188, 0.36)
  `,
} as const;

const inputStyle = {
  width: "100%",
  minWidth: 0,
  padding: "13px 12px",
  boxSizing: "border-box",
  border: "1px solid #c9c9c9",
  borderRadius: "12px",
  backgroundColor: "#f7f7f7",
  color: "#555",
  fontFamily: '"Times New Roman", serif',
  fontSize: "16px",
  outline: "none",
} as const;

export default function OrdersPage() {
  const [value, setValue] = useState("1");

  const handleChange = (_e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="order-page">
      <Container
        className="order-container"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            md: "minmax(0, 1fr) 320px",
          },
          alignItems: "start",
          gap: "36px",
          paddingTop: "60px",
          paddingBottom: "60px",
          height: "auto",
        }}
      >
        {/* Chap tomon: tablar va buyurtmalar */}
        <Stack
          className="order-left"
          sx={{ width: "100%", minWidth: 0 }}
        >
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  marginBottom: "28px",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="fullWidth"
                  aria-label="Buyurtma holatlari"
                  className="table_list"
                >
                  <Tab label="PAUSED ORDERS" value="1" />
                  <Tab label="PROCESS ORDERS" value="2" />
                  <Tab label="FINISHED ORDERS" value="3" />
                </Tabs>
              </Box>
            </Box>

            <Stack
              className="order-main-content"
              sx={{ width: "100%", minWidth: 0 }}
            >
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        {/* O‘ng tomon: foydalanuvchi va karta panellari */}
        <Stack
          className="order-right"
          sx={{
            width: "100%",
            minWidth: 0,
            gap: "40px",
            paddingTop: { xs: 0, md: "100px" },
            boxSizing: "border-box",
          }}
        >
          {/* Foydalanuvchi paneli */}
          <Box className="order-info-box" sx={panelStyle}>
            <Box
              className="member-box"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                className="order-user-img"
                sx={{
                  position: "relative",
                  width: "140px",
                  height: "140px",
                }}
              >
                <Box
                  component="img"
                  src="/icons/default-user.svg"
                  alt="Foydalanuvchi rasmi"
                  className="order-user-avatar"
                  sx={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "contain",
                    boxShadow: "0 5px 8px rgba(0, 0, 0, 0.18)",
                  }}
                />

                <Box
                  className="order-user-icon-box"
                  sx={{
                    position: "absolute",
                    right: "-3px",
                    bottom: "-3px",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "#aaa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="img"
                    src="/icons/user-badge.svg"
                    alt="Foydalanuvchi belgisi"
                    className="order-user-prof-img"
                    sx={{
                      width: "28px",
                      height: "28px",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  marginTop: "18px",
                  color: "#111",
                  fontFamily: '"Times New Roman", serif',
                  fontSize: "32px",
                  lineHeight: 1.2,
                }}
              >
                Martin
              </Box>

              <Box
                sx={{
                  marginTop: "10px",
                  color: "#aaa",
                  fontFamily: '"Times New Roman", serif',
                  fontSize: "22px",
                }}
              >
                User
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "48px",
                paddingTop: "14px",
                borderTop: "2px solid #aaa",
                color: "#777",
                fontFamily: '"Times New Roman", serif',
                fontSize: "18px",
              }}
            >
              <LocationOnIcon sx={{ color: "#343434" }} />
              <span>Do not exist</span>
            </Box>
          </Box>

          {/* Karta ma’lumotlari paneli */}
          <Box className="order-payment-box" sx={panelStyle}>
            <Stack spacing={1.5}>
              <Box
                component="input"
                placeholder="Card number: **** 4090 2002 7495"
                aria-label="Karta raqami namunasi"
                readOnly
                sx={inputStyle}
              />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
                  gap: "10px",
                }}
              >
                <Box
                  component="input"
                  placeholder="07 / 24"
                  aria-label="Karta amal qilish muddati namunasi"
                  readOnly
                  sx={inputStyle}
                />

                <Box
                  component="input"
                  placeholder="CVV: ***"
                  aria-label="Karta xavfsizlik kodi namunasi"
                  readOnly
                  sx={inputStyle}
                />
              </Box>

              <Box
                component="input"
                placeholder="Justin Robertson"
                aria-label="Karta egasi ismi namunasi"
                readOnly
                sx={inputStyle}
              />
            </Stack>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}