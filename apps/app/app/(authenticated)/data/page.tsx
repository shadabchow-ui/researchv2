import type { Metadata } from "next";
import { getProduct } from "@/lib/upcube/registry";
import { ModulePage } from "../components/module-page";

const product = getProduct("data");

if (!product) {
  throw new Error("Product not found: data");
}

export const metadata: Metadata = {
  title: product.name,
  description: product.description,
};

const DataPage = () => (
  <ModulePage
    description={product.description}
    modules={product.modules}
    status={product.status}
    title={product.name}
  />
);

export default DataPage;
