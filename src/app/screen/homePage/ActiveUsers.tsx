import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import { createSelector } from "@reduxjs/toolkit";
import { rethrieveTopUsers } from "./selector";
import { useSelector } from "react-redux";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";

/** Redux selecotor**/
const topUsersRetriever = createSelector(
    rethrieveTopUsers,
    (topUsers) => ({ topUsers })
);


export default function ActiveUsers() {
    const { topUsers } = useSelector(topUsersRetriever);
    return (
    <div className="active-users-frame">
        <Container>
            <Stack className="main">
                <Box className="category-title">Active Users</Box>

                <Stack className="cards-frame">
                    <CssVarsProvider>
                        {topUsers.length !== 0 ? (
                            topUsers.map((member: Member) => {
                                const memberImage = `${serverApi}/${member.memberImage}`;
                                return (
                                    <Card
                                        key={member._id}
                                        variant="outlined"
                                        className="card"
                                    >
                                        <CardOverflow>
                                            <AspectRatio ratio="1">
                                                <img
                                                    src={memberImage}
                                                    alt={member.memberNick}
                                                />
                                            </AspectRatio>
                                        </CardOverflow>

                                        <Typography className="member-nickname">
                                            {member.memberNick}
                                        </Typography>
                                    </Card>
                                );
                            })
                        ) : (
                            <Box className="no-data">No Active Users!</Box>
                        )}
                    </CssVarsProvider>
                </Stack>
            </Stack>
        </Container>
    </div>
);
}