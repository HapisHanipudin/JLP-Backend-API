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
  };
};

export const contactTransformer = (data) => {
  return {
    type: data.type,
    information: data.info,
  };
};
