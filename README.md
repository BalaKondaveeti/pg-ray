# PG-Ray: Postgres Explain Visualizer

![PG-Ray Banner](https://img.shields.io/badge/Postgres-Explain_Visualizer-4F46E5?style=for-the-badge&logo=postgresql&logoColor=white)
![Privacy Focused](https://img.shields.io/badge/Privacy-100%25_Client_Side-green?style=for-the-badge&logo=shield)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

**PG-Ray** is a free, privacy-first tool to visualize PostgreSQL execution plans. It turns dense, hard-to-read JSON or text output into clear, interactive node graphs, helping you spot bottlenecks instantly.

### 🚀 **Live Demo:** [https://balakondaveeti.github.io/pg-ray-postgres-explain-visualizer/](https://balakondaveeti.github.io/pg-ray-postgres-explain-visualizer/)

---

## 💡 Why I Built This

I created PG-Ray because I needed a way to visualize complex query plans without worrying about data privacy.

Most existing online visualizers require you to upload your query plans to a backend server. Since execution plans often contain sensitive schema information, table names, and statistical data, sending them to a third party is often a security risk for production environments.

**PG-Ray is different.** It is designed to be **100% client-side**.
* **No backend server.**
* **No database.**
* **No analytics tracking.**
* **Your query plans never leave your browser tab.**

It is a safe, lightweight utility that can be used by anyone, anywhere, even for confidential production schemas.

---

## ✨ Features

* **🔒 Privacy First:** All parsing and rendering happens locally in your browser.
* **📝 Dual Format Support:** Paste either **JSON** (`FORMAT JSON`) or standard **Text** output.
* **🕸️ Interactive Graph:** Zoom, pan, and drag nodes to explore massive query trees.
* **🎨 Visual Cues:** Color-coded nodes (Red for Scans, Blue for Joins) to instantly highlight performance costs.
* **✅ Broad Compatibility:** Works with **PostgreSQL**, **Amazon Redshift**, and **CockroachDB**.

---

## 🛠️ How to Use

1.  **Generate your plan:**
    Run your query with `EXPLAIN (ANALYZE, COSTS, FORMAT JSON)`:
    ```sql
    EXPLAIN (ANALYZE, COSTS, FORMAT JSON)
    SELECT * FROM users JOIN orders ON users.id = orders.user_id;
    ```
    *(Note: Standard text output without JSON formatting is also supported!)*

2.  **Paste & Visualize:**
    Copy the output and paste it into [PG-Ray](https://balakondaveeti.github.io/pg-ray-postgres-explain-visualizer/).

3.  **Analyze:**
    Look for red nodes (Scans) or high-cost nodes to identify optimization opportunities.

---

## 🏗️ Local Development

If you want to run this locally or contribute:

```bash
# Clone the repo
git clone [https://github.com/balakondaveeti/pg-ray-postgres-explain-visualizer.git](https://github.com/balakondaveeti/pg-ray-postgres-explain-visualizer.git)

# Install dependencies
npm install

# Run the dev server
npm run dev