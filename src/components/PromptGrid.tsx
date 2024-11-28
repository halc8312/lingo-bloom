import PromptCard from "./PromptCard";

interface Prompt {
  id: number;
  title: string;
  description: string;
  category: string;
  prompt: string;
}

interface PromptGridProps {
  prompts: Prompt[];
  onDelete: (id: number) => void;
  selectedPrompts: number[];
  onSelect: (id: number) => void;
}

const PromptGrid = ({ prompts, onDelete, selectedPrompts, onSelect }: PromptGridProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          {...prompt}
          onDelete={onDelete}
          isSelected={selectedPrompts.includes(prompt.id)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default PromptGrid;