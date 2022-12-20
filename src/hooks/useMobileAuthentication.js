import { useMediaQuery, useTheme } from "@mui/material";

const useMobileAuthentication = ({ children }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  if (matches) {
    return (
      <div className="m-auto text-white p-5">
        <h1>
          You can not play this game in mobile, please move to desktop.
          &#128519;
        </h1>
      </div>
    );
  }
  return children;
};

export default useMobileAuthentication;
