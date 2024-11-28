import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import AddPromptForm from "@/components/AddPromptForm";
import Header from "@/components/Header";
import PromptGrid from "@/components/PromptGrid";
import SearchAndFilter from "@/components/SearchAndFilter";

const CATEGORIES = [
  "基本",
  "開発",
  "創造",
  "分析",
  "会話",
  "教育",
  "データ",
  "システム"
];

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
  const [selectedPrompts, setSelectedPrompts] = useState<number[]>([]);
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
    {
      id: 4,
      title: "データ分析プロンプト",
      description: "データの分析と洞察を得るためのプロンプト",
      category: "分析",
      prompt: "以下のデータセットを分析し、主要な傾向と洞察を3つ挙げてください：[データ]",
    },
    {
      id: 5,
      title: "会話シミュレーション",
      description: "特定のシナリオでの会話をシミュレートするプロンプト",
      category: "会話",
      prompt: "以下の状況でのロールプレイを行ってください：[シナリオ]",
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

  const handleBulkAddPrompts = (newPrompts: Omit<Prompt, "id">[]) => {
    const promptsWithIds = newPrompts.map((prompt, index) => ({
      ...prompt,
      id: prompts.length + index + 1,
    }));
    setPrompts([...prompts, ...promptsWithIds]);
    setShowAddForm(false);
    toast({
      title: "プロンプトを一括追加しました",
      description: `${promptsWithIds.length}件のプロンプトが追加されました。`,
    });
  };

  const handleDeletePrompt = (id: number) => {
    setPrompts(prompts.filter(prompt => prompt.id !== id));
    setSelectedPrompts(selectedPrompts.filter(selectedId => selectedId !== id));
    toast({
      title: "プロンプトを削除しました",
      description: "プロンプトが正常に削除されました。",
    });
  };

  const handleSelectPrompt = (id: number) => {
    setSelectedPrompts(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleDeleteAll = () => {
    setPrompts([]);
    setSelectedPrompts([]);
    toast({
      title: "全てのプロンプトを削除しました",
      description: `${prompts.length}件のプロンプトが削除されました。`,
    });
  };

  const handleDeleteSelected = () => {
    setPrompts(prompts.filter(prompt => !selectedPrompts.includes(prompt.id)));
    toast({
      title: "プロンプトを一括削除しました",
      description: `${selectedPrompts.length}件のプロンプトが削除されました。`,
    });
    setSelectedPrompts([]);
  };

  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <Header
        promptCount={prompts.length}
        selectedCount={selectedPrompts.length}
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
        onDeleteAll={handleDeleteAll}
        onDeleteSelected={handleDeleteSelected}
      />

      {showAddForm ? (
        <div className="mb-8 animate-fade-in">
          <AddPromptForm
            onSubmit={handleAddPrompt}
            onBulkSubmit={handleBulkAddPrompts}
            categories={CATEGORIES}
          />
        </div>
      ) : (
        <SearchAndFilter
          onSearch={setSearchQuery}
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      <PromptGrid
        prompts={filteredPrompts}
        onDelete={handleDeletePrompt}
        selectedPrompts={selectedPrompts}
        onSelect={handleSelectPrompt}
      />
    </div>
  );
};

export default Index;
