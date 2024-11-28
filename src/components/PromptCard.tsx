import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PromptCardProps {
  title: string;
  description: string;
  category: string;
  prompt: string;
}

const PromptCard = ({ title, description, category, prompt }: PromptCardProps) => {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
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