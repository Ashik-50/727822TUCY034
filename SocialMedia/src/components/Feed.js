import { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography, CircularProgress } from "@mui/material";

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const res = await fetch("http://20.244.56.144/test/posts");
                if (!res.ok) throw new Error("Failed to fetch feed");
                const data = await res.json();

                if (!data.posts) throw new Error("Feed data missing");

                setPosts(data.posts.reverse());
                setError(null); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFeed();
        const interval = setInterval(fetchFeed, 5000);
        return () => clearInterval(interval); 
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Live Feed
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

export default Feed;