import { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography, CircularProgress } from "@mui/material";

const TopUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("http://20.244.56.144/test/users");
                if (!res.ok) throw new Error("Failed to fetch users");
                const data = await res.json();

                if (!data.users) throw new Error("Users data missing");

                let usersArray = Object.keys(data.users).map(id => ({
                    id,
                    name: data.users[id],
                }));

                setUsers(usersArray.slice(0, 10));
                setError(null); // Clear any previous errors
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Top Users
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <List>
                    {users.map(user => (
                        <ListItem key={user.id} sx={{ borderBottom: "1px solid #ddd" }}>
                            <ListItemText primary={user.name} />
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

export default TopUsers;