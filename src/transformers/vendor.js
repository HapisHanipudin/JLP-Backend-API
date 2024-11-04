import { reviewTransformer } from "./review.js";

export const vendorDetailTransformer = (data) => {
  return {
    ...vendorTransformer(data),
    contacts: data.contacts.map(contactTransformer),
    products: data.products,
    banners: data.banners,
    reviews: data.reviews.map(reviewTransformer),
  };
};

export const vendorTransformer = (data) => {
  const rating = data.reviews.length > 0 ? parseFloat((data.reviews.reduce((acc, curr) => acc + curr.rating, 0) / data.reviews.length).toFixed(2)) : 0;

  const reviewCounts = data.reviews.reduce(
    (acc, curr) => {
      if (curr.rating === 5) acc.five += 1;
      if (curr.rating === 4) acc.four += 1;
      if (curr.rating === 3) acc.three += 1;
      if (curr.rating === 2) acc.two += 1;
      if (curr.rating === 1) acc.one += 1;
      return acc;
    },
    { five: 0, four: 0, three: 0, two: 0, one: 0 }
  );

  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    rating: rating === null ? 0 : rating,
    description: data.description,
    address: data.address,
    category: data.category,
    openingHours: data.openingHours,
    closingHours: data.closingHours,
    mapsUrl: data.gmapsUrl,
    icon: data.iconUrl,
    reviews: reviewCounts,
  };
};

export const contactTransformer = (data) => {
  return {
    type: data.type,
    information: data.info,
  };
};
