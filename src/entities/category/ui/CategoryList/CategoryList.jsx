import { CategoryLink } from "../CategoryLink/CategoryLink";

export function CategoryList({ categories }) {return (
    <ol>
      {categories.map(category => (
        <li key={category.uid}>
          <CategoryLink category={category} />
        </li>
      ))}
    </ol>
  );
}
