import React, { useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { Link } from "next/link";
import { useRouter } from "next/router";

const NavItems = () => {
    const router = useRouter()

    const SWAP = "Swap";
    const POOL = "Pool";
    const VOTE = "Vote";
    const BANK = "Bank";

    const [selectedNavItem, setSelectedNavItem] = useState(SWAP);


    return (
        <div className="bg-zinc-900 text-white h-fit flex items-center justify-around rounded-full mx-6">
            <p
                className={getNavIconClassName(SWAP)}
                onClick={() => router.push('/')}
            >
                {SWAP}
            </p>

            <p
                className={getNavIconClassName(POOL)}
                onClick={() => {
                    setSelectedNavItem(POOL)
                    router.push('/pool');
                }}
            >
                {POOL}
            </p>

            <p
                className={getNavIconClassName(VOTE)}
                onClick={() => setSelectedNavItem(VOTE)}
            >
                {VOTE}
            </p>

            <div
                className={getNavIconClassName(BANK)}
                onClick={() => {
                    setSelectedNavItem(BANK)
                    // router.push('/bank');
                }}
            >
                <div className="dropdown dropdown-hover">
                    <label tabIndex={0} className=""> {BANK}</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-black rounded-box w-52">
                        <li>
                            <a href="/bank/account">Account</a></li>
                        <li><a href="/bank/pay">Payment</a></li>
                    </ul>
                </div>

            </div>
        </div>
    );

    function getNavIconClassName(name) {
        let className =
            "p-1 px-4 cursor-pointer border-[4px] border-transparent flex items-center";
        className +=
            name === selectedNavItem
                ? " bg-zinc-800 border-zinc-900 rounded-full"
                : "";
        return className;
    }
};

export default NavItems;
