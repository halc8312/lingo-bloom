import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください"),
  description: z.string().min(1, "説明を入力してください"),
  category: z.string().min(1, "カテゴリーを選択してください"),
  prompt: z.string().min(1, "プロンプトを入力してください"),
});

const jsonSchema = z.object({
  jsonInput: z.string().refine((val) => {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed);
    } catch {
      return false;
    }
  }, "有効なJSON配列を入力してください"),
});

interface AddPromptFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  onBulkSubmit: (values: z.infer<typeof formSchema>[]) => void;
  categories: string[];
}

const AddPromptForm = ({ onSubmit, onBulkSubmit, categories }: AddPromptFormProps) => {
  const [activeTab, setActiveTab] = useState<string>("single");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: categories[0],
      prompt: "",
    },
  });

  const jsonForm = useForm<z.infer<typeof jsonSchema>>({
    resolver: zodResolver(jsonSchema),
    defaultValues: {
      jsonInput: "",
    },
  });

  const handleJsonSubmit = (values: z.infer<typeof jsonSchema>) => {
    try {
      const prompts = JSON.parse(values.jsonInput);
      onBulkSubmit(prompts);
    } catch (error) {
      console.error("JSON解析エラー:", error);
    }
  };

  const sampleFormat = [
    {
      title: "プロンプト1",
      description: "説明1",
      category: "基本",
      prompt: "プロンプト内容1"
    },
    {
      title: "プロンプト2",
      description: "説明2",
      category: "開発",
      prompt: "プロンプト内容2"
    }
  ];

  const copyFormat = () => {
    navigator.clipboard.writeText(JSON.stringify(sampleFormat, null, 2));
    toast({
      title: "コピーしました",
      description: "JSONフォーマットをクリップボードにコピーしました。",
    });
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="single">個別入力</TabsTrigger>
        <TabsTrigger value="json">JSON入力</TabsTrigger>
      </TabsList>

      <TabsContent value="single">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>タイトル</FormLabel>
                  <FormControl>
                    <Input placeholder="プロンプトのタイトル" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>説明</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="プロンプトの説明"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>カテゴリー</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>プロンプト</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="プロンプトの内容"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              追加
            </Button>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="json">
        <Form {...jsonForm}>
          <form onSubmit={jsonForm.handleSubmit(handleJsonSubmit)} className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">JSONフォーマット</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8"
                onClick={copyFormat}
              >
                <Copy className="h-4 w-4 mr-2" />
                フォーマットをコピー
              </Button>
            </div>
            <FormField
              control={jsonForm.control}
              name="jsonInput"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder={JSON.stringify(sampleFormat, null, 2)}
                      className="min-h-[300px] font-mono"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              一括追加
            </Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
};

export default AddPromptForm;