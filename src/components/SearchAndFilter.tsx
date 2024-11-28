import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const SearchAndFilter = ({
  onSearch,
  categories,
  selectedCategory,
  onSelectCategory,
}: SearchAndFilterProps) => {
  return (
    <div className="mb-8 space-y-4 animate-fade-in">
      <SearchBar onSearch={onSearch} />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
    </div>
  );
};

export default SearchAndFilter;