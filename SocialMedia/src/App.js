import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Container } from "@mui/material";
import TopUsers from "./components/TopUsers";
import TrendingPosts from "./components/TrendingPosts";
import Feed from "./components/Feed";

const App = () => {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Social Media Dashboard
                    </Typography>
                    <Button
                        color="inherit"
                        component={NavLink}
                        to="/"
                        sx={{ "&.active": { textDecoration: "underline" } }}
                    >
                        Top Users
                    </Button>
                    <Button
                        color="inherit"
                        component={NavLink}
                        to="/trending-posts"
                        sx={{ "&.active": { textDecoration: "underline" } }}
                    >
                        Trending Posts
                    </Button>
                    <Button
                        color="inherit"
                        component={NavLink}
                        to="/feed"
                        sx={{ "&.active": { textDecoration: "underline" } }}
                    >
                        Live Feed
                    </Button>
                </Toolbar>
            </AppBar>

            <Container sx={{ marginTop: 3 }}>
                <Routes>
                    <Route path="/" element={<TopUsers />} />
                    <Route path="/trending-posts" element={<TrendingPosts />} />
                    <Route path="/feed" element={<Feed />} />
                    <Route
                        path="*"
                        element={
                            <Typography variant="h5" color="error">
                                404 - Page Not Found
                            </Typography>
                        }
                    />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;