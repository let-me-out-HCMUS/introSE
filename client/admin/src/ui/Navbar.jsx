import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [selectPage, setSelectPage] = useState(0);

  const handleClick = (i) => {
    setSelectPage(i);
  };

  const navItems = [
    {
      name: "Trang chủ",
      link: "/",
    },
    {
      name: "Lập lịch thi đấu",
      link: "/schedules",
    },
    {
      name: "Bảng xếp hạng",
      link: "/rank",
    },
    {
      name: "Lập hồ sơ đăng ký",
      link: "/register",
    },
    {
      name: "Thông tin",

      sublink: [
        {
          name: "Cầu thủ",
          link: "/players",
        },
        {
          name: "Câu lạc bộ",
          link: "/clubs",
        },
      ],
    },
    {
      name: "Thay đổi quy định",
      link: "/change-rule",
    },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex justify-evenly px-20 py-4">
      {navItems.map((item, index) => {
        if (index === selectPage) {
          if (item.name === "Thông tin") {
            return (
              <div key={index} className="border-t-4 border-green-400 ">
                <Link
                  onMouseEnter={(e) => handleMenuClick(e)}
                  className="font-bold"
                >
                  {item.name} &#9660;
                </Link>

                <Menu anchorEl={anchorEl} open={open}>
                  <div onMouseLeave={() => handleMenuClose()}>
                    {item.sublink.map((subitem, subindex) => (
                      <MenuItem key={subindex}>
                        <Link
                          to={subitem.link}
                          onClick={() => {
                            handleClick(index);
                          }}
                          className="font-bold"
                        >
                          {subitem.name}
                        </Link>
                      </MenuItem>
                    ))}
                  </div>
                </Menu>
              </div>
            );
          }
          return (
            <div
              key={index}
              className="rounded-t-sm border-t-4 border-green-400 transition-all"
            >
              <Link
                to={item.link}
                onClick={() => {
                  handleClick(index);
                }}
                className="font-bold"
              >
                {item.name}
              </Link>
            </div>
          );
        }

        if (item.name === "Thông tin") {
          return (
            <div key={index} className="border-t-4 border-transparent">
              <Link
                onMouseEnter={(e) => handleMenuClick(e)}
                className="font-bold text-gray-400"
              >
                {item.name} &#9660;
              </Link>

              <Menu anchorEl={anchorEl} open={open}>
                <div onMouseLeave={() => handleMenuClose()}>
                  {item.sublink.map((subitem, subindex) => (
                    <MenuItem key={subindex}>
                      <Link
                        to={subitem.link}
                        onClick={() => {
                          handleClick(index);
                        }}
                        className="font-bold text-gray-400"
                      >
                        {subitem.name}
                      </Link>
                    </MenuItem>
                  ))}
                </div>
              </Menu>
            </div>
          );
        } else
          return (
            <div key={index} className="border-t-4 border-transparent">
              <Link
                to={item.link}
                onClick={() => {
                  handleClick(index);
                }}
                className="font-bold text-gray-400"
              >
                {item.name}
              </Link>
            </div>
          );
      })}
    </div>
  );
};
