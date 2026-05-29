import type { Metadata } from "next";
import { Header } from "../../components/header";
import { AnswerClient } from "./answer-client";

export const metadata: Metadata = {
  title: "Answer - Research",
  description: "Ask questions and get AI-generated answers with citations.",
};

const AnswerPage = () => (
  <>
    <Header page="Answer" pages={["Upcube", "Research"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">Answer</h1>
        <p className="text-muted-foreground text-sm">
          Ask a question and get an AI-generated answer with cited sources.
        </p>
      </div>
      <AnswerClient />
    </div>
  </>
);

export default AnswerPage;
