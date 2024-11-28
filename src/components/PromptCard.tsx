import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Trash2, 
  PenLine,
  Code,
  BarChart,
  Languages,
  Lightbulb,
  FileText,
  ScrollText,
  HelpCircle,
  Image,
  UserSquare2,
  FileOutput,
  ListTodo
} from "lucide-react";

interface PromptCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  prompt: string;
  onDelete: (id: number) => void;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "文章作成":
      return <PenLine className="h-4 w-4" />;
    case "コード生成":
      return <Code className="h-4 w-4" />;
    case "データ分析":
      return <BarChart className="h-4 w-4" />;
    case "翻訳・校正":
      return <Languages className="h-4 w-4" />;
    case "アイデア発想":
      return <Lightbulb className="h-4 w-4" />;
    case "要約・整理":
      return <FileText className="h-4 w-4" />;
    case "シナリオ作成":
      return <ScrollText className="h-4 w-4" />;
    case "質問応答":
      return <HelpCircle className="h-4 w-4" />;
    case "画像指示":
      return <Image className="h-4 w-4" />;
    case "ロールプレイ":
      return <UserSquare2 className="h-4 w-4" />;
    case "文書変換":
      return <FileOutput className="h-4 w-4" />;
    case "タスク分解":
      return <ListTodo className="h-4 w-4" />;
    default:
      return <PenLine className="h-4 w-4" />;
  }
};

const PromptCard = ({ 
  id,
  title, 
  description, 
  category, 
  prompt,
  onDelete,
  isSelected,
  onSelect
}: PromptCardProps) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg relative group animate-fade-in">
      <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(id)}
          className="h-5 w-5 transition-transform duration-200 hover:scale-110"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(id)}
          className="h-8 w-8 text-destructive hover:text-destructive/90 transition-transform duration-200 hover:scale-110"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
      <CardHeader>
        <div className="flex items-center justify-between pr-24">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {title}
          </CardTitle>
          <Badge 
            className="flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-200 hover:scale-110"
            title={category}
          >
            {getCategoryIcon(category)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{description}</p>
        <div className="rounded-md bg-muted p-4 transition-all duration-200 hover:bg-muted/80">
          <pre className="whitespace-pre-wrap text-sm">{prompt}</pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptCard;