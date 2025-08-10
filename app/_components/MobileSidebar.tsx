import React from "react";
import { CircleDollarSign, Home, Paintbrush, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const items = [
  { title: "Workspace", url: "/dashboard", icon: Home },
  { title: "Design", url: "/designs", icon: Paintbrush },
  { title: "Credits", url: "/credits", icon: CircleDollarSign },
];

export default function MobileSidebar({ onClose }: { onClose: () => void }) {
  const path = usePathname();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50">
      <div className="bg-white w-64 h-full p-4 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Link href="/" onClick={onClose}>
            <Image src="/logo.svg" alt="logo" width={80} height={80} />
          </Link>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-2">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              onClick={onClose}
              className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 ${
                path === item.url ? "bg-gray-200" : ""
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
