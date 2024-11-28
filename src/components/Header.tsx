import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

interface HeaderProps {
  promptCount: number;
  selectedCount: number;
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;
  onDeleteAll: () => void;
  onDeleteSelected: () => void;
}

const Header = ({
  promptCount,
  selectedCount,
  showAddForm,
  setShowAddForm,
  onDeleteAll,
  onDeleteSelected
}: HeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-fade-in whitespace-nowrap">
        プロンプト文例集
      </h1>
      <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="transition-all duration-200 hover:scale-105 text-sm sm:text-base">
              <Trash2 className="h-4 w-4 mr-2" />
              全てのプロンプトを削除
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="sm:max-w-[425px]">
            <AlertDialogHeader>
              <AlertDialogTitle>全プロンプトの削除</AlertDialogTitle>
              <AlertDialogDescription>
                全ての（{promptCount}件の）プロンプトを削除します。この操作は取り消せません。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction onClick={onDeleteAll}>削除する</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {selectedCount > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="transition-all duration-200 hover:scale-105 text-sm sm:text-base">
                <Trash2 className="h-4 w-4 mr-2" />
                選択したプロンプトを削除
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>プロンプトの一括削除</AlertDialogTitle>
                <AlertDialogDescription>
                  選択した{selectedCount}件のプロンプトを削除します。この操作は取り消せません。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                <AlertDialogAction onClick={onDeleteSelected}>削除する</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="transition-all duration-200 hover:scale-105 text-sm sm:text-base"
        >
          {showAddForm ? "キャンセル" : "プロンプトを追加"}
        </Button>
      </div>
    </div>
  );
};

export default Header;