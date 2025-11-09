import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  
  const primaryColor = "#0D47A1";   
  const secondaryColor = "#00ACC1"; 
  const textColor = "#FFFFFF";      

  return (
    <AppBar
  
      sx={{
        mt: 3,
        backgroundColor: primaryColor,
        color: textColor,
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: 0.5 }}>
          Webhook Dashboard
        </Typography>

        <Box >
          <Button
            component={Link}
            to="/"
            sx={{
              color: location.pathname === "/" ? secondaryColor : textColor,
              fontWeight: 500,
              textTransform: "none",
              "&:hover": { color: secondaryColor },
            }}
          >
            Transactions
          </Button>

          <Button
            component={Link}
            to="/chart"
            sx={{
              color: location.pathname === "/chart" ? secondaryColor : textColor,
              fontWeight: 500,
              textTransform: "none",
              "&:hover": { color: secondaryColor },
            }}
          >
            Dummy
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
