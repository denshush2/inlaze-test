import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FC, useState, MouseEvent } from "react";
import { LoadingButton } from "@mui/lab";
import { DropdownButtonOption } from "./types";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

type Props = {
  title: string;
  loading?: boolean;
  options: DropdownButtonOption[];
  stopPropagation?: boolean;
  onSelect: (option: DropdownButtonOption) => void;
};

const DropdownButton: FC<Props> = ({
  title,
  options,
  onSelect,
  loading,
  stopPropagation,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (stopPropagation) {
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    }
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (
    event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>,
    option: DropdownButtonOption
  ) => {
    if (stopPropagation) {
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    }
    onSelect(option);
    handleClose();
  };

  return (
    <>
      <LoadingButton
        aria-controls={open ? `dropdown-menu-${title}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        loading={loading}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {title}
      </LoadingButton>
      <StyledMenu
        id={`dropdown-menu-${title}`}
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem
            disabled={option.disabled}
            key={option.label}
            onClick={(event) => handleSelect(event, option)}
            disableRipple
          >
            {option.icon}
            {option.label}
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default DropdownButton;
