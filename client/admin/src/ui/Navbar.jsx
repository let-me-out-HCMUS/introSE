import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const [selectPage, setSelectPage] = useState(0);

    const handleClick = (i) => {
        setSelectPage(i);
    }

    const navItems = [
        {
            name: "Trang chủ",
            link: "/"
        },
        {
            name: "Lập lịch thi đấu",
            link: "/schedules"
        },
        {
            name: "Bảng xếp hạng",
            link: "/rank"
        },
        {
            name: "Lập hồ sơ đăng ký",
            link: "/register"
        },
        {
            name: "Thông tin cầu thủ",
            link: "/players"
        },
        {
            name: "Thay đổi quy định",
            link: "/change-rule"
        },
    ]

  return (
    <div className="flex justify-evenly py-4 px-20">
        {
            navItems.map((item, index) => {
                if (index === selectPage) {
                    return (
                        <div key={index} className="border-t-4 transition-all border-green-400 rounded-t-sm">
                            <Link to={item.link} onClick={() => {handleClick(index)}} className="font-bold">{item.name}</Link>
                        </div>
                    )
                }

                return (
                    <div key={index} className="border-t-4 border-transparent">
                        <Link to={item.link} onClick={() => {handleClick(index)}} className="font-bold text-gray-400">{item.name}</Link>
                    </div>
                )
            })
        }
    </div>
  )
}
