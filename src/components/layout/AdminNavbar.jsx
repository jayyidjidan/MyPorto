import { useState } from "react";
import Button from "../common/Button";

export default function AdminNavbar() {
    return(
        <nav className="flex w-full items-start gap-1">
            <div className="flex items-center justify-between gap-4 w-full bg-white-1 px-12 py-8 rounded-b-3xl gap-[800px]">
                <h1 className="text-h3 text-gradient-black-1">JAYCMS</h1>

                <input type="text" placeholder="Search..." className="flex items-center w-full p-4 h-14 rounded-2xl bg-grey-100" />
            </div>
            <div className="flex items-center justify-between gap-30 bg-white-1 px-12 py-8 rounded-b-3xl">
                <h4 className="text-h4 text-black-400">2:10 AM</h4>
                <Button variant="secondary" className="flex-nowrap">
                  <a href="../sections/Hero">Home</a>
                </Button>
            </div>
        </nav>
    );
}