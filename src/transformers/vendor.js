import { reviewTransformer } from "./review.js";

export const vendorMinimalTransformer = (data) => {
  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    description: data.description,
    address: data.address,
    openingHours: data.openingHours,
    closingHours: data.closingHours,
    mapsUrl: data.gmapsUrl,
    icon: data.iconUrl,
  };
};

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
    ...vendorMinimalTransformer(data),
    rating: rating === null ? 0 : rating,
    category: data.category,
    reviewCounts: reviewCounts,
    // newestReview: data.reviews.length > 0 ? reviewTransformer(data.reviews[0]) : null,
  };
};

export const contactTransformer = (data) => {
  return {
    type: data.type,
    information: data.info,
  };
};

export const vendorDashboard = (vendor) => {
  return {
    ...vendorDetailTransformer(vendor),
    NIK: vendor.NIK,
    NPWP: vendor.NPWP,
    BankCode: vendor.BankCode,
    BankAccount: vendor.BankAccount,
  };
};

export const productTransformer = (prod) => {
  return {
    id: prod.id,
    name: prod.name,
    imageUrl: prod.imageUrl,
    price: prod.price,
    description: prod.description,
  };
};
