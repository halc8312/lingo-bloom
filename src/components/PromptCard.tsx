import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";

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
    <Card className="transition-all hover:shadow-lg relative">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(id)}
          className="h-5 w-5"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(id)}
          className="h-8 w-8 text-destructive hover:text-destructive/90"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
      <CardHeader>
        <div className="flex items-center justify-between pr-24">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge>{category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{description}</p>
        <div className="rounded-md bg-muted p-4">
          <pre className="whitespace-pre-wrap text-sm">{prompt}</pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptCard;