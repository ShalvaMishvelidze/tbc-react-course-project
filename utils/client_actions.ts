export const fetchProducts = async (
  search = "",
  category = "all",
  sort = "",
  order = "",
  page = 1
) => {
  const response = await fetch(
    `api/v2/products?search=${search}&category=${category}&sort=${sort}&order=${order}&page=${page}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const products = await response.json();
  return products;
};
