import type { Metadata } from "next";
import { getProduct } from "@/lib/upcube/registry";
import { ModulePage } from "../components/module-page";

const product = getProduct("identity");

if (!product) {
  throw new Error("Product not found: identity");
}

export const metadata: Metadata = {
  title: product.name,
  description: product.description,
};

const IdentityPage = () => (
  <ModulePage
    description={product.description}
    modules={product.modules}
    status={product.status}
    title={product.name}
  />
);

export default IdentityPage;
