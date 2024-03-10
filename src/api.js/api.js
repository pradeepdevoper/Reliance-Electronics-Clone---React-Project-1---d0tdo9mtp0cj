const PROJECT_ID = "d0tdo9mtp0cj";
const BASE_URL = "https://academics.newtonschool.co";
// const BASE_URL = "https://staging.academics.newtonschool.co";

export async function getApi(relUrl) {
  try {
    const url = `${BASE_URL}/${relUrl}`;
    const headers = { projectId: PROJECT_ID };
    const fetchResult = await fetch(url, { headers });
    const jsonResult = await fetchResult.json();
    console.log(relUrl, jsonResult);
    return jsonResult;
  } catch (e) {
    console.error(e);
  }
}

export async function getCategories() {
  const relUrl = "api/v1/ecommerce/electronics/categories";
  const result = await getApi(relUrl);
  const categories = result.data.map(
    (c) => c.charAt(0).toUpperCase() + c.slice(1)
  );
  return categories;
}

export async function getProducts(queryParamName, queryParamValue) {
  let relUrl = "api/v1/ecommerce/electronics/products";
  if (queryParamName) {
    relUrl = relUrl + `?${queryParamName}=${queryParamValue}`;
  }
  const result = await getApi(relUrl);
  return result.data;
}

export async function getLowestPricesOfTheDay() {
  const result = await getProducts("sort", '{"price":-1}');
  return result;
}

export async function getProductsTopTrending() {
  const result = await getProducts("sort", '{"rating":-1}');
  return result;
}

export async function getProductsByCategory(subCategory) {
  const result = await getProducts(
    "filter",
    `{"subCategory":"${subCategory}"}`
  );
  return result;
}
