import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const format = (value: string): string => {
  const path = value
    .replace(/-/g, " ")
    .replace(/oe/g, "ö")
    .replace(/ae/g, "ä")
    .replace(/ue/g, "ü")
    .toUpperCase();

  return `/${path}`;
};

type breadcrumpType = {
  breadcrumb: string;
  href: string;
};

const buildType = (path: string): breadcrumpType[] => {
  const keyChart = "/";
  const linkPath = path.split(keyChart);

  linkPath.shift();

  return linkPath.map((path, i) => {
    return {
      breadcrumb: path,
      href: `${keyChart}${linkPath.slice(0, i++).join(keyChart)}`,
    } as breadcrumpType;
  });
};

export const Breadcrumb = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  useEffect(() => {
    router && setBreadcrumbs(buildType(router.asPath));
  }, [router]);

  return (
    <nav>
      <a href="/">HOME</a>
      {breadcrumbs &&
        breadcrumbs.map(({ href, breadcrumb }: breadcrumpType) => (
          <Link href={href}>{format(breadcrumb)}</Link>
        ))}
    </nav>
  );
};
