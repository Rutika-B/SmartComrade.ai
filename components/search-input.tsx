"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import qs from "query-string";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const CategoryId = searchParams.get("categoryId");
  const name = searchParams.get("name");

  const [value, setValue] = useState(name || "");
  const debounceValue = useDebounce<string>(value, 500);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = {
      name: debounceValue,
      CategoryId: CategoryId,
    };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );
      console.log(url)
    router.push(url);
  }, [debounceValue,CategoryId, router]);
  return (
    <div className="relative">
      <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
      <Input
        onChange={onChange}
        value={value}
        placeholder="search..."
        className="pl-10 bg-primary/10"
      />
    </div>
  );
};

export default SearchInput;
