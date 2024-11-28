import { useState } from "react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import PromptCard from "@/components/PromptCard";
import AddPromptForm from "@/components/AddPromptForm";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

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

  const handleBulkDelete = () => {
    setPrompts(prompts.filter(prompt => !selectedPrompts.includes(prompt.id)));
    toast({
      title: "プロンプトを一括削除しました",
      description: `${selectedPrompts.length}件のプロンプトが削除されました。`,
    });
    setSelectedPrompts([]);
  };

  const handleDeleteAll = () => {
    setPrompts([]);
    setSelectedPrompts([]);
    toast({
      title: "全てのプロンプトを削除しました",
      description: `${prompts.length}件のプロンプトが削除されました。`,
    });
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">プロンプト文例集</h1>
        <div className="flex items-center gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                全てのプロンプトを削除
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>全プロンプトの削除</AlertDialogTitle>
                <AlertDialogDescription>
                  全ての（{prompts.length}件の）プロンプトを削除します。この操作は取り消せません。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAll}>削除する</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {selectedPrompts.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  選択したプロンプトを削除
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>プロンプトの一括削除</AlertDialogTitle>
                  <AlertDialogDescription>
                    選択した{selectedPrompts.length}件のプロンプトを削除します。この操作は取り消せません。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>キャンセル</AlertDialogCancel>
                  <AlertDialogAction onClick={handleBulkDelete}>削除する</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? "キャンセル" : "プロンプトを追加"}
          </Button>
        </div>
      </div>

      {showAddForm ? (
        <div className="mb-8">
          <AddPromptForm
            onSubmit={handleAddPrompt}
            onBulkSubmit={handleBulkAddPrompts}
            categories={CATEGORIES}
          />
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
          <PromptCard 
            key={prompt.id} 
            {...prompt} 
            onDelete={handleDeletePrompt}
            isSelected={selectedPrompts.includes(prompt.id)}
            onSelect={handleSelectPrompt}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;