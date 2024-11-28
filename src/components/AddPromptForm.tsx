import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SinglePromptForm from "./SinglePromptForm";
import JsonPromptForm from "./JsonPromptForm";

interface AddPromptFormProps {
  onSubmit: (values: any) => void;
  onBulkSubmit: (values: any[]) => void;
  categories: string[];
}

const AddPromptForm = ({ onSubmit, onBulkSubmit, categories }: AddPromptFormProps) => {
  const [activeTab, setActiveTab] = useState<string>("single");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="single">個別入力</TabsTrigger>
        <TabsTrigger value="json">JSON入力</TabsTrigger>
      </TabsList>

      <TabsContent value="single">
        <SinglePromptForm onSubmit={onSubmit} categories={categories} />
      </TabsContent>

      <TabsContent value="json">
        <JsonPromptForm onSubmit={onBulkSubmit} />
      </TabsContent>
    </Tabs>
  );
};

export default AddPromptForm;