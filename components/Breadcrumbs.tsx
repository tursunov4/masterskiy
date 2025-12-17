"use client";
import Link from "next/link";
import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className="bg-[#d9d9d5]">
      <p className="py-2 text-center text-xs tracking-[0.12em]">
        {items.map((item, index) => (
          <span key={index}>
            {item.href ? (
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}

            {index !== items.length - 1 && " / "}
          </span>
        ))}
      </p>
    </div>
  );
};

export default Breadcrumbs;
