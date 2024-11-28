import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import AddPromptForm from "@/components/AddPromptForm";
import Header from "@/components/Header";
import PromptGrid from "@/components/PromptGrid";
import SearchAndFilter from "@/components/SearchAndFilter";

const CATEGORIES = [
  "文章作成",
  "コード生成",
  "データ分析",
  "翻訳・校正",
  "アイデア発想",
  "要約・整理",
  "シナリオ作成",
  "質問応答",
  "画像指示",
  "ロールプレイ",
  "文書変換",
  "タスク分解"
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
      title: "ブログ記事作成",
      description: "特定のトピックについてのブログ記事を生成",
      category: "文章作成",
      prompt: "以下のトピックについて、導入・本論・結論を含む1000文字程度のブログ記事を作成してください：[トピック]",
    },
    {
      id: 2,
      title: "APIエンドポイント実装",
      description: "RESTful APIのエンドポイントコードを生成",
      category: "コード生成",
      prompt: "以下の仕様に基づいてNode.jsとExpressを使用したAPIエンドポイントを実装してください：[仕様]",
    },
    {
      id: 3,
      title: "データトレンド分析",
      description: "データセットから主要なトレンドを抽出",
      category: "データ分析",
      prompt: "以下のデータセットを分析し、主要なトレンドと洞察を3つ挙げ、それぞれの実務的な意味を説明してください：[データ]",
    },
    {
      id: 4,
      title: "英日翻訳と校正",
      description: "英文を自然な日本語に翻訳",
      category: "翻訳・校正",
      prompt: "以下の英文を、文脈を考慮して自然な日本語に翻訳してください：[英文]",
    },
    {
      id: 5,
      title: "商品アイデア発想",
      description: "新商品のアイデアを複数生成",
      category: "アイデア発想",
      prompt: "以下の市場/顧客ニーズに基づいて、革新的な商品アイデアを5つ提案し、それぞれの特徴と想定されるターゲット層を説明してください：[市場/ニーズ]",
    }
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