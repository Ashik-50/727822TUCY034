import { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography, CircularProgress } from "@mui/material";

const TrendingPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("http://20.244.56.144/test/posts");
                if (!res.ok) throw new Error("Failed to fetch posts");
                const data = await res.json();

                if (!data.posts) throw new Error("Posts data missing");

                setPosts(data.posts.slice(0, 10));
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Trending Posts
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <List>
                    {posts.map(post => (
                        <ListItem key={post.id} sx={{ borderBottom: "1px solid #ddd" }}>
                            <ListItemText primary={post.content} />
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

export default TrendingPosts;