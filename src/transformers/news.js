import human from "human-time";

export const newsTransformers = (data) => {
  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    image_url: data.image_url,
    createdAt: {
      human: human(data.createdAt, { languages: "id" }),
      tanggal: new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short", year: "numeric" }).format(new Date()), // e.g. "15 Jun 2022"
    },
  };
};
