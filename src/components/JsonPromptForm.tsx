import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";

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

interface JsonPromptFormProps {
  onSubmit: (values: any[]) => void;
}

const JsonPromptForm = ({ onSubmit }: JsonPromptFormProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof jsonSchema>>({
    resolver: zodResolver(jsonSchema),
    defaultValues: {
      jsonInput: "",
    },
  });

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

  const handleSubmit = (values: z.infer<typeof jsonSchema>) => {
    try {
      const prompts = JSON.parse(values.jsonInput);
      onSubmit(prompts);
    } catch (error) {
      console.error("JSON解析エラー:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
          control={form.control}
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
  );
};

export default JsonPromptForm;