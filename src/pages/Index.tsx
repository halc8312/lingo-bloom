import { useState } from "react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import PromptCard from "@/components/PromptCard";
import AddPromptForm from "@/components/AddPromptForm";
import { useToast } from "@/components/ui/use-toast";

const CATEGORIES = ["基本", "開発", "創造"];

interface Prompt {
  id: number;
  title: string;
  description: string;
  category: string;
  prompt: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>([
    {
      id: 1,
      title: "詳細な説明を求めるプロンプト",
      description: "より具体的な回答を得るためのプロンプトテンプレート",
      category: "基本",
      prompt: "以下のトピックについて、具体例を3つ含めて詳しく説明してください：[トピック]",
    },
    {
      id: 2,
      title: "コード生成プロンプト",
      description: "プログラミングコードを生成するためのプロンプト",
      category: "開発",
      prompt: "以下の機能を持つ[言語名]のコードを書いてください：[機能の説明]",
    },
    {
      id: 3,
      title: "ブレインストーミングプロンプト",
      description: "アイデア出しを支援するプロンプト",
      category: "創造",
      prompt: "[テーマ]に関するアイデアを5つ、それぞれの長所・短所と共に提案してください。",
    },
  ]);
  const { toast } = useToast();

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || prompt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddPrompt = (values: Omit<Prompt, "id">) => {
    const newPrompt = {
      ...values,
      id: prompts.length + 1,
    };
    setPrompts([...prompts, newPrompt]);
    setShowAddForm(false);
    toast({
      title: "プロンプトを追加しました",
      description: "新しいプロンプトが正常に追加されました。",
    });
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">プロンプト文例集</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "キャンセル" : "プロンプトを追加"}
        </Button>
      </div>

      {showAddForm ? (
        <div className="mb-8">
          <AddPromptForm onSubmit={handleAddPrompt} categories={CATEGORIES} />
        </div>
      ) : (
        <div className="mb-8 space-y-4">
          <SearchBar onSearch={setSearchQuery} />
          <CategoryFilter
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPrompts.map((prompt) => (
          <PromptCard key={prompt.id} {...prompt} />
        ))}
      </div>
    </div>
  );
};

export default Index;