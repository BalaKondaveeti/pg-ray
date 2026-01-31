# PG-Ray: Postgres Explain Visualizer

![PG-Ray Banner](https://img.shields.io/badge/Postgres-Explain_Visualizer-4F46E5?style=for-the-badge&logo=postgresql&logoColor=white)
![Privacy Focused](https://img.shields.io/badge/Privacy-100%25_Client_Side-green?style=for-the-badge&logo=shield)

**PG-Ray** is a free, privacy-first tool to visualize PostgreSQL and Redshift execution plans. It turns dense, hard-to-read JSON or text output into clear, interactive node graphs, helping you spot bottlenecks instantly.

### 🚀 **Demo:** [https://balakondaveeti.github.io/pg-ray-postgres-explain-visualizer/](https://balakondaveeti.github.io/pg-ray-postgres-explain-visualizer/)
Works with **PostgreSQL**, **Amazon RedshiftDB**, and **CockroachDB**.

---

## Why I Built This

I work on **Redshift DB internals**, so I look at complex query plans every single day.

I needed a way to visualize these plans quickly, but I couldn't use existing online tools. Most of them upload user data to a backend server. Since execution plans often contain sensitive schema information like table names, and statistical distributions; sending them to a third-party server is a major security risk for confidential or production environments.

**PG-Ray is my solution to this problem.** It is designed to be **100% client-side**.
* **Your query plans never leave your browser tab.**
* **No backend server.**
* **No database.**
* **No analytics tracking.**

It is a safe, lightweight utility that I built for myself, but it is useful for anyone tuning Postgres, Redshift, or CockroachDB queries.

---

## Roadmap & Future Features

Would love your help in completing these! Here is what is coming next:

* [ ] **Shareable Links (No Backend):** Implement Base64 encoding of the plan directly into the URL. This will allow users to share a visualization with a peer via a simple link *without* storing the data on a server.
* [ ] **Dagre Auto-Layout:** Improve graph rendering for massive, complex queries to reduce node overlap.
* [ ] **Detailed Statistics Panel:** Click on a node to see full verbose details (Output, Filter, Schema).

**Contributions are welcome!** If you want to add a feature or fix a bug, please feel free to open a PR.

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

## Local Development

Run this locally:

```bash
# Clone the repo
git clone [https://github.com/balakondaveeti/pg-ray-postgres-explain-visualizer.git](https://github.com/balakondaveeti/pg-ray-postgres-explain-visualizer.git)

# Install dependencies
npm install

# Run the dev server
npm run dev
```
---
# 👨‍💻 About Me

Hi, I'm Bala. I build tools that solve real engineering problems.

Check out my other projects on GitHub.

If you find this tool useful, please give it a ⭐️!
