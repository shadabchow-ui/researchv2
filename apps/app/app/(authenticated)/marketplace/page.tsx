import type { Metadata } from "next";
import { getProduct } from "@/lib/upcube/registry";
import { ModulePage } from "../components/module-page";

const product = getProduct("marketplace");

if (!product) {
  throw new Error("Product not found: marketplace");
}

export const metadata: Metadata = {
  title: product.name,
  description: product.description,
};

const MarketplacePage = () => (
  <ModulePage
    description={product.description}
    modules={product.modules}
    status={product.status}
    title={product.name}
  />
);

export default MarketplacePage;
