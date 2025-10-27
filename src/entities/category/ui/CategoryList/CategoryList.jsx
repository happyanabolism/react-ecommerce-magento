import { CategoryLink } from "../CategoryLink/CategoryLink";

export function CategoryList({ categories }) {return (
    <ol>
      {categories.map(category => (
        <li key={category.id}>
          <CategoryLink category={category} />
        </li>
      ))}
    </ol>
  );
}
