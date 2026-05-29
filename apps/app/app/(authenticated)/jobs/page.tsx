import type { Metadata } from "next";
import { getProduct } from "@/lib/upcube/registry";
import { ModulePage } from "../components/module-page";

const product = getProduct("jobs");

if (!product) {
  throw new Error("Product not found: jobs");
}

export const metadata: Metadata = {
  title: product.name,
  description: product.description,
};

const JobsPage = () => (
  <ModulePage
    description={product.description}
    modules={product.modules}
    status={product.status}
    title={product.name}
  />
);

export default JobsPage;
