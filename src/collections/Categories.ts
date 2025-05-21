import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "color",
      type: "text",
    },

    /* ---------------------------------------------------------------- */
    /*                     Relasi hierarki kategori                     */
    /* ---------------------------------------------------------------- */

    {
      name: "parent",
      type: "relationship",
      relationTo: "categories", // Relasi ke koleksi kategori itu sendiri (self-referencing)
      hasMany: false, // Satu kategori hanya boleh memiliki satu parent
      // Digunakan untuk membentuk struktur kategori bertingkat (misalnya: Laptop → Elektronik)
    },

    {
      name: "subcategories",
      type: "join", // Field virtual untuk menampilkan dokumen yang memiliki relasi ke dokumen ini
      collection: "categories", // Koleksi yang memiliki field relationship ke koleksi ini
      on: "parent", // Nama field relationship di koleksi target yang mengarah ke dokumen ini
      hasMany: true, // Satu kategori bisa memiliki banyak subkategori
      // Menampilkan semua kategori yang memiliki 'parent' mengarah ke kategori ini
    },
  ],
};
