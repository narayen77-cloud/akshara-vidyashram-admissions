# Client Images Directory

Welcome! Drop your school/client images in this folder to have them automatically display on the website.

The server is configured to look for files in this directory first. If a file is not found here, it will automatically fall back to the default curated placeholder images.

## Supported Formats
You can drop images in any of the following formats:
- `.png`
- `.jpg`
- `.jpeg`
- `.webp`
- `.svg`

---

## File Naming Guide
To replace an image on the website, simply name your file according to the table below and save it in this `public/images/` folder.

| File Name (or `.jpg`, `.jpeg`, etc.) | Description / Section on Website | Recommended Aspect Ratio / Notes |
| :--- | :--- | :--- |
| **`input_file_0`** | **School Logo** | Transparent `.png` or `.svg` (Square/Circle layout) |
| **`input_file_1`** | **Karate & Self-Defense Academy** | Landscape (`16:10` or `4:3`) |
| **`input_file_2`** | **Archery & Fine Motor Training** | Landscape (`16:10` or `4:3`) |
| **`input_file_3`** | **Olympic-Sized Swimming Pool** | Landscape (`16:10` or `4:3`) |
| **`input_file_4`** | **Centred Assembly Green Courtyard** | Landscape (`16:10` or `4:3`) |
| **`input_file_5`** | **Literature & Resource Centre (Library Bookshelves)** | Landscape (`16:10` or `4:3`) |
| **`input_file_6`** | **Collaborative Open Library Commons** | Landscape (`16:10` or `4:3`) |
| **`input_file_7`** | **Forest Schooling & Eco-Play (Forest Kindergarten)** | Landscape (`16:10` or `4:3`) |
| **`input_file_8`** | **Silent Reading** | Landscape (`16:10` or `4:3`) |
| **`input_file_9`** | **Sensory Arts & Expression Room** | Landscape (`16:10` or `4:3`) |
| **`input_file_10`** | **Horticulture & Agricultural Training (Eco-gardening)** | Landscape (`16:10` or `4:3`) |
| **`input_file_11`** | **Paper Boat Crafting** | Landscape (`16:10` or `4:3`) |
| **`input_file_12`** | **Group Study / Study Session** | Landscape (`16:10` or `4:3`) |
| **`input_file_13`** | **State-of-the-Art Science Laboratories** | Landscape (`16:10` or `4:3`) |
| **`input_file_14`** | **Bamboo-Canopied Nature Corridors** | Landscape (`16:10` or `4:3`) |
| **`input_file_15`** | **Eco-Sustainability / Eco Paper Bag Class** | Landscape (`16:10` or `4:3`) |

---

## Custom Subdirectory Access
If you prefer to keep original names (e.g., `swimming-pool.jpg`), you can reference them in `src/data.ts` using the path `/images/swimming-pool.jpg`. Vite will automatically resolve and compile files inside the `public/images/` folder at `/images/<filename>`.
