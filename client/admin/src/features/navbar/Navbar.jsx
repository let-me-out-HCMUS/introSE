import { useState } from 'react';

export const Navbar = () => {
    const [selectPage, setSelectPage] = useState(0);

    const handleClick = (i) => {
        setSelectPage(i);
    }

    const navItems = [
        "Trang chủ",
        "Bảng xếp hạng",
        "Lập hồ sơ đăng ký",
        "Thông tin cầu thủ",
        "Thay đổi quy định",
    ]

  return (
    <div className="flex justify-evenly py-4 px-20">
        {
            navItems.map((item, index) => {
                if (index === selectPage) {
                    return (
                        <div key={index} className="border-t-4 transition-all border-green-400 rounded-t-sm">
                            <a onClick={() => {handleClick(index)}} className="font-bold" href="#">{item}</a>
                        </div>
                    )
                }

                return (
                    <div key={index} className="border-t-4 border-transparent">
                        <a onClick={() => {handleClick(index)}} className="font-bold text-gray-400" href="#">{item}</a>
                    </div>
                )
            })
        }
    </div>
  )
}
