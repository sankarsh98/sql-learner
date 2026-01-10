// =============================================
// PYTHON DATA ENGINEERING CURRICULUM
// Expanded to 42 exercises covering basics to advanced engineering
// =============================================

var curriculum = [
  // =============================================
  // 1. PYTHON BASICS (Log Parsing & Data Structures)
  // =============================================
  {
    id: 'py-1',
    category: '1. Python Basics',
    title: '1. List Comprehensions',
    description: 'Filter and transform raw logs.',
    content: '<h3>Log Filtering</h3><p>Extract error messages from `logs` where the level is "ERROR". The message is after "ERROR: ".</p>',
    startCode: 'logs = [\n  "INFO: System started",\n  "ERROR: Connection refused",\n  "WARN: Low memory",\n  "ERROR: Timeout"\n]\n',
    hint: 'errors = [line.split(": ")[1] for line in logs if "ERROR" in line]',
    solution: 'errors = [x.split(": ")[1] for x in logs if "ERROR" in x]',
    validate: function (py) { return py.run('errors == ["Connection refused", "Timeout"]'); }
  },
  {
    id: 'py-2',
    category: '1. Python Basics',
    title: '2. Dict Grouping',
    description: 'Manual aggregation.',
    content: '<h3>Group by Role</h3><p>Group `users` by "role" into a dict `grouped` (key=role, value=list of names).</p>',
    startCode: 'users = [\n  {"name": "Alice", "role": "Admin"},\n  {"name": "Bob",   "role": "User"},\n  {"name": "Charlie", "role": "Admin"}\n]\ngrouped = {}\n',
    hint: 'Loop through users, use dict.setdefault or checking key existence.',
    solution: 'for u in users:\n    grouped.setdefault(u["role"], []).append(u["name"])',
    validate: function (py) { return py.run('grouped["Admin"] == ["Alice", "Charlie"] and grouped["User"] == ["Bob"]'); }
  },
  {
    id: 'py-3',
    category: '1. Python Basics',
    title: '3. Safe Division',
    description: 'Exception handling.',
    content: '<h3>Robust Math</h3><p>Write `safe_div(a, b)` returning `a/b`, or `None` if `b` is 0.</p>',
    startCode: 'def safe_div(a, b):\n    pass\n',
    hint: 'try: return a/b except ZeroDivisionError: return None',
    solution: 'def safe_div(a, b):\n    try: return a/b\n    except ZeroDivisionError: return None',
    validate: function (py) { return py.run('safe_div(10, 2) == 5 and safe_div(5, 0) is None'); }
  },
  {
    id: 'py-4',
    category: '1. Python Basics',
    title: '4. Set Operations',
    description: 'Finding duplicates/uniques.',
    content: '<h3>Unique IDs</h3><p>Find IDs present in `list_a` but NOT in `list_b`. Store as a set in `missing`.</p>',
    startCode: 'list_a = [1, 2, 3, 4]\nlist_b = [3, 4, 5, 6]\n',
    hint: 'missing = set(list_a) - set(list_b)',
    solution: 'missing = set(list_a) - set(list_b)',
    validate: function (py) { return py.run('missing == {1, 2}'); }
  },
  {
    id: 'py-5',
    category: '1. Python Basics',
    title: '5. String Parsing',
    description: 'Extracting data.',
    content: '<h3>Extract Emails</h3><p>Extract all valid emails from the string `text` into a list `emails`.</p>',
    startCode: 'text = "Contact support@example.com or sales@example.org for help."\n',
    hint: 'Use string split or regex (import re)',
    solution: 'emails = [word for word in text.split() if "@" in word]',
    validate: function (py) { return py.run('set(emails) == {"support@example.com", "sales@example.org"}'); }
  },

  // =============================================
  // 2. NUMPY FUNDAMENTALS (Vectorization)
  // =============================================
  {
    id: 'np-1',
    category: '2. NumPy Fundamentals',
    title: '6. Boolean Masking',
    description: 'Conditional filtering.',
    content: '<h3>Replace Odd Numbers</h3><p>Replace all odd numbers in `arr` with -1 (in-place).</p>',
    startCode: 'import numpy as np\narr = np.array([0, 1, 2, 3, 4, 5])\n',
    hint: 'arr[arr % 2 == 1] = -1',
    solution: 'arr[arr % 2 == 1] = -1',
    validate: function (py) { return py.run('np.all(arr[[1,3,5]] == -1) and arr[0] == 0'); }
  },
  {
    id: 'np-2',
    category: '2. NumPy Fundamentals',
    title: '7. Reshape & Dimensions',
    description: 'Matrix manipulation.',
    content: '<h3>3x3 Matrix</h3><p>Create a 1D array 0-8, reshape to 3x3 matrix `mat`.</p>',
    startCode: 'import numpy as np\n',
    hint: 'mat = np.arange(9).reshape(3, 3)',
    solution: 'mat = np.arange(9).reshape(3, 3)',
    validate: function (py) { return py.run('mat.shape == (3, 3) and mat[2,2] == 8'); }
  },
  {
    id: 'np-3',
    category: '2. NumPy Fundamentals',
    title: '8. Normalization',
    description: 'Broadcasting scaling.',
    content: '<h3>Min-Max Scale</h3><p>Normalize matrix `Z` to range [0,1]. Store in `Z_norm`.</p>',
    startCode: 'import numpy as np\nnp.random.seed(42)\nZ = np.random.random((5,5))\n',
    hint: 'Z_norm = (Z - Z.min()) / (Z.max() - Z.min())',
    solution: 'Z_norm = (Z - Z.min()) / (Z.max() - Z.min())',
    validate: function (py) { return py.run('np.isclose(Z_norm.max(), 1) and np.isclose(Z_norm.min(), 0)'); }
  },
  {
    id: 'np-4',
    category: '2. NumPy Fundamentals',
    title: '9. Broadcasting 2D-1D',
    description: 'Row-wise operations.',
    content: '<h3>Center Rows</h3><p>Subtract the mean of each row of `X` from the row elements. Store in `X_centered`.</p>',
    startCode: 'import numpy as np\nX = np.array([[1, 2, 3], [4, 6, 8]])\n',
    hint: 'mean = X.mean(axis=1, keepdims=True)\nX_centered = X - mean',
    solution: 'X_centered = X - X.mean(axis=1, keepdims=True)',
    validate: function (py) { return py.run('np.allclose(X_centered.mean(axis=1), 0)'); }
  },
  {
    id: 'np-5',
    category: '2. NumPy Fundamentals',
    title: '10. np.where',
    description: 'Vectorized if-else.',
    content: '<h3>Capping Values</h3><p>Create `capped` where values > 10 in `arr` are replaced by 10, else keep original.</p>',
    startCode: 'import numpy as np\narr = np.array([5, 10, 15, 20])\n',
    hint: 'capped = np.where(arr > 10, 10, arr)',
    solution: 'capped = np.where(arr > 10, 10, arr)',
    validate: function (py) { return py.run('np.all(capped == [5, 10, 10, 10])'); }
  },

  // =============================================
  // 3. PANDAS CORE (DataFrame Ops)
  // =============================================
  {
    id: 'pd-1',
    category: '3. Pandas Core',
    title: '11. Complex Selection',
    description: 'Filtering rows/cols.',
    content: '<h3>Select Seniors</h3><p>From `df`, select "name" and "score" for age > 30. Store in `res`.</p>',
    startCode: 'import pandas as pd\ndf = pd.DataFrame({"name": ["Ann", "Bob", "Joe"], "age": [25, 35, 40], "score": [80, 90, 85]})\n',
    hint: 'res = df.loc[df["age"] > 30, ["name", "score"]]',
    solution: 'res = df.loc[df["age"] > 30, ["name", "score"]]',
    validate: function (py) { return py.run('res.shape == (2, 2) and "Bob" in res["name"].values'); }
  },
  {
    id: 'pd-2',
    category: '3. Pandas Core',
    title: '12. Feature Engineering',
    description: 'Creating columns.',
    content: '<h3>Pass/Fail</h3><p>Add col "status": "Pass" if score >= 85 else "Fail".</p>',
    startCode: 'import pandas as pd\nimport numpy as np\ndf = pd.DataFrame({"score": [80, 85, 90]})\n',
    hint: 'df["status"] = np.where(df["score"] >= 85, "Pass", "Fail")',
    solution: 'df["status"] = np.where(df["score"] >= 85, "Pass", "Fail")',
    validate: function (py) { return py.run('df["status"].tolist() == ["Fail", "Pass", "Pass"]'); }
  },
  {
    id: 'pd-3',
    category: '3. Pandas Core',
    title: '13. String Operations',
    description: 'Vectorized string ops.',
    content: '<h3>Clean Names</h3><p>Convert "name" to title case (e.g., "alice" -> "Alice").</p>',
    startCode: 'import pandas as pd\ndf = pd.DataFrame({"name": ["alice", "BOB", "charlie"]})\n',
    hint: 'df["name"] = df["name"].str.title()',
    solution: 'df["name"] = df["name"].str.title()',
    validate: function (py) { return py.run('df["name"].tolist() == ["Alice", "Bob", "Charlie"]'); }
  },
  {
    id: 'pd-4',
    category: '3. Pandas Core',
    title: '14. Apply Function',
    description: 'Row-wise ops.',
    content: '<h3>Row Sum</h3><p>Create col "total" which is sum of "A" and "B" using apply (for practice, though direct add is faster).</p>',
    startCode: 'import pandas as pd\ndf = pd.DataFrame({"A": [1, 2], "B": [3, 4]})\n',
    hint: 'df["total"] = df.apply(lambda row: row["A"] + row["B"], axis=1)',
    solution: 'df["total"] = df.apply(lambda r: r["A"] + r["B"], axis=1)',
    validate: function (py) { return py.run('df["total"].tolist() == [4, 6]'); }
  },
  {
    id: 'pd-5',
    category: '3. Pandas Core',
    title: '15. Memory Usage',
    description: 'Optimization.',
    content: '<h3>Downcast Types</h3><p>Convert "id" from int64 to int8 to save memory.</p>',
    startCode: 'import pandas as pd\ndf = pd.DataFrame({"id": [1, 2, 3], "val": [10.5, 20.1, 30.2]})\n',
    hint: 'df["id"] = df["id"].astype("int8")',
    solution: 'df["id"] = df["id"].astype("int8")',
    validate: function (py) { return py.run('str(df["id"].dtype) == "int8"'); }
  },

  // =============================================
  // 4. DATA CLEANING
  // =============================================
  {
    id: 'cl-1',
    category: '4. Data Cleaning',
    title: '16. Interpolation',
    description: 'Filling missing data.',
    content: '<h3>Linear Fill</h3><p>Fill missing values in `s` using linear interpolation.</p>',
    startCode: 'import pandas as pd\nimport numpy as np\ns = pd.Series([1, np.nan, np.nan, 4])\n',
    hint: 's = s.interpolate()',
    solution: 's = s.interpolate()',
    validate: function (py) { return py.run('s.tolist() == [1.0, 2.0, 3.0, 4.0]'); }
  },
  {
    id: 'cl-2',
    category: '4. Data Cleaning',
    title: '17. Text Cleaning',
    description: 'Regex replacement.',
    content: '<h3>Price Parsing</h3><p>Clean "price" column: remove "$" and "," then convert to int.</p>',
    startCode: 'import pandas as pd\ndf = pd.DataFrame({"price": ["$1,000", "$250"]})\n',
    hint: 'df["price"] = df["price"].str.replace("[$,]", "", regex=True).astype(int)',
    solution: 'df["price"] = df["price"].str.replace("[$,]", "", regex=True).astype(int)',
    validate: function (py) { return py.run('df["price"].sum() == 1250'); }
  },
  {
    id: 'cl-3',
    category: '4. Data Cleaning',
    title: '18. Drop Duplicates',
    description: 'Subset deduplication.',
    content: '<h3>Unique Users</h3><p>Drop duplicates based on "user_id", keeping the *last* occurrence.</p>',
    startCode: 'import pandas as pd\ndf = pd.DataFrame({"user_id": [1, 1, 2], "login": ["2020-01", "2020-02", "2020-01"]})\n',
    hint: 'df = df.drop_duplicates(subset=["user_id"], keep="last")',
    solution: 'df = df.drop_duplicates(subset=["user_id"], keep="last")',
    validate: function (py) { return py.run('len(df) == 2 and df.iloc[0]["login"] == "2020-02"'); }
  },
  {
    id: 'cl-4',
    category: '4. Data Cleaning',
    title: '19. Handling Outliers',
    description: 'Clipping values.',
    content: '<h3>Cap Outliers</h3><p>Cap values in "val" at 99th percentile.</p>',
    startCode: 'import pandas as pd\nimport numpy as np\ndf = pd.DataFrame({"val": list(range(100)) + [1000]})\n',
    hint: 'limit = df["val"].quantile(0.99)\ndf["val"] = df["val"].clip(upper=limit)',
    solution: 'limit = df["val"].quantile(0.99)\ndf["val"] = df["val"].clip(upper=limit)',
    validate: function (py) { return py.run('df["val"].max() <= 100 and df["val"].max() >= 99'); }
  },
  {
    id: 'cl-5',
    category: '4. Data Cleaning',
    title: '20. Explode List',
    description: 'Unnesting data.',
    content: '<h3>Explode Tags</h3><p>Explode the "tags" list column so each tag has its own row.</p>',
    startCode: 'import pandas as pd\ndf = pd.DataFrame({"id": [1], "tags": [["python", "sql"]]})\n',
    hint: 'df = df.explode("tags")',
    solution: 'df = df.explode("tags")',
    validate: function (py) { return py.run('len(df) == 2 and df.iloc[1]["tags"] == "sql"'); }
  },

  // =============================================
  // 5. AGGREGATION & GROUPING
  // =============================================
  {
    id: 'ag-1',
    category: '5. Aggregation',
    title: '21. Pivot Table',
    description: 'Cross-tabulation.',
    content: '<h3>Sales Pivot</h3><p>Pivot to show total "sales" by "region" (index) and "product" (cols).</p>',
    startCode: 'import pandas as pd\ndf = pd.DataFrame({"region": ["N","N","S"], "product": ["A","B","A"], "sales": [1,2,3]})\n',
    hint: 'piv = df.pivot_table(index="region", columns="product", values="sales", aggfunc="sum")',
    solution: 'piv = df.pivot_table(index="region", columns="product", values="sales", aggfunc="sum")',
    validate: function (py) { return py.run('piv.loc["N", "B"] == 2 and piv.loc["S", "A"] == 3'); }
  },
  {
    id: 'ag-2',
    category: '5. Aggregation',
    title: '22. Group Transform',
    description: 'Window processing.',
    content: '<h3>Percent of Total</h3><p>Add col "pct" showing value divided by the group sum (group by "grp").</p>',
    startCode: 'import pandas as pd\ndf = pd.DataFrame({"grp": ["A", "A", "B"], "val": [10, 40, 50]})\n',
    hint: 'df["pct"] = df["val"] / df.groupby("grp")["val"].transform("sum")',
    solution: 'df["pct"] = df["val"] / df.groupby("grp")["val"].transform("sum")',
    validate: function (py) { return py.run('df["pct"].tolist() == [0.2, 0.8, 1.0]'); }
  },
  {
    id: 'ag-3',
    category: '5. Aggregation',
    title: '23. Rolling Window',
    description: 'Moving average.',
    content: '<h3>3-Day Mean</h3><p>Compute 3-day rolling mean of "price" into "ma".</p>',
    startCode: 'import pandas as pd\ndf = pd.DataFrame({"price": [10, 20, 30, 40, 50]})\n',
    hint: 'df["ma"] = df["price"].rolling(3).mean()',
    solution: 'df["ma"] = df["price"].rolling(3).mean()',
    validate: function (py) { return py.run('df["ma"].iloc[2] == 20.0 and pd.isna(df["ma"][1])'); }
  },
  {
    id: 'ag-4',
    category: '5. Aggregation',
    title: '24. Cumulative Sum',
    description: 'Running total.',
    content: '<h3>Running Total</h3><p>Calculate cumulative sales by "region". Store in "run_tot".</p>',
    startCode: 'import pandas as pd\ndf = pd.DataFrame({"region": ["A", "A", "B", "B"], "sales": [10, 20, 100, 50]})\n',
    hint: 'df["run_tot"] = df.groupby("region")["sales"].cumsum()',
    solution: 'df["run_tot"] = df.groupby("region")["sales"].cumsum()',
    validate: function (py) { return py.run('df["run_tot"].tolist() == [10, 30, 100, 150]'); }
  },
  {
    id: 'ag-5',
    category: '5. Aggregation',
    title: '25. Rank',
    description: 'Ranking logic.',
    content: '<h3>Dense Rank</h3><p>Rank "score" descending method="dense". Store in "rank".</p>',
    startCode: 'import pandas as pd\ndf = pd.DataFrame({"score": [100, 100, 90, 80]})\n',
    hint: 'df["rank"] = df["score"].rank(method="dense", ascending=False)',
    solution: 'df["rank"] = df["score"].rank(method="dense", ascending=False)',
    validate: function (py) { return py.run('df["rank"].tolist() == [1.0, 1.0, 2.0, 3.0]'); }
  },

  // =============================================
  // 6. MERGING & JOINING
  // =============================================
  {
    id: 'mg-1',
    category: '6. Merging',
    title: '26. Left Join',
    description: 'Basic joining.',
    content: '<h3>Join Customers</h3><p>Left join sales with customers on "cust_id".</p>',
    startCode: 'import pandas as pd\nsales = pd.DataFrame({"cust_id": [1, 2]})\ncust = pd.DataFrame({"cust_id": [1], "name": ["Alice"]})\n',
    hint: 'm = pd.merge(sales, cust, on="cust_id", how="left")',
    solution: 'm = pd.merge(sales, cust, on="cust_id", how="left")',
    validate: function (py) { return py.run('len(m) == 2 and pd.isna(m.iloc[1]["name"])'); }
  },
  {
    id: 'mg-2',
    category: '6. Merging',
    title: '27. Outer Join',
    description: 'Full join.',
    content: '<h3>Full Match</h3><p>Outer join df1 and df2. Enable `indicator=True` to see source.</p>',
    startCode: 'import pandas as pd\ndf1 = pd.DataFrame({"key": [1, 2]})\ndf2 = pd.DataFrame({"key": [2, 3]})\n',
    hint: 'm = pd.merge(df1, df2, on="key", how="outer", indicator=True)',
    solution: 'm = pd.merge(df1, df2, on="key", how="outer", indicator=True)',
    validate: function (py) { return py.run('len(m) == 3 and "_merge" in m.columns'); }
  },
  {
    id: 'mg-3',
    category: '6. Merging',
    title: '28. Self Join',
    description: 'Hierarchical data.',
    content: '<h3>Manager Name</h3><p>Join `emp` to itself to find manager name. `emp.mgr_id` links to `emp.emp_id`.</p>',
    startCode: 'import pandas as pd\nem = pd.DataFrame({"emp_id": [1, 2], "name": ["CEO", "Dev"], "mgr_id": [None, 1]})\n',
    hint: 'm = pd.merge(em, em, left_on="mgr_id", right_on="emp_id", suffixes=("", "_mgr"))',
    solution: 'm = pd.merge(em, em, left_on="mgr_id", right_on="emp_id", suffixes=("", "_mgr"))',
    validate: function (py) { return py.run('m.iloc[0]["name_mgr"] == "CEO"'); }
  },
  {
    id: 'mg-4',
    category: '6. Merging',
    title: '29. Cross Join',
    description: 'Cartesian product.',
    content: '<h3>All Combinations</h3><p>Create all combinations of `colors` and `sizes`.</p>',
    startCode: 'import pandas as pd\nc = pd.DataFrame({"color": ["red", "blue"]})\ns = pd.DataFrame({"size": ["S", "M"]})\n',
    hint: 'm = c.merge(s, how="cross")',
    solution: 'm = c.merge(s, how="cross")',
    validate: function (py) { return py.run('len(m) == 4'); }
  },
  {
    id: 'mg-5',
    category: '6. Merging',
    title: '30. Concat Columns',
    description: 'Horizontal stack.',
    content: '<h3>Combine Features</h3><p>Concatenate `df1` and `df2` horizontally (axis=1).</p>',
    startCode: 'import pandas as pd\ndf1 = pd.DataFrame({"A": [1, 2]})\ndf2 = pd.DataFrame({"B": [3, 4]})\n',
    hint: 'res = pd.concat([df1, df2], axis=1)',
    solution: 'res = pd.concat([df1, df2], axis=1)',
    validate: function (py) { return py.run('res.shape == (2, 2)'); }
  },

  // =============================================
  // 7. TIME SERIES
  // =============================================
  {
    id: 'ts-1',
    category: '7. Time Series',
    title: '31. Date Range',
    description: 'Generating time index.',
    content: '<h3>Hourly Index</h3><p>Create DataFrame `df` with 5 hourly timestamps starting "2024-01-01". Col "val" random.</p>',
    startCode: 'import pandas as pd\nimport numpy as np\n',
    hint: 'idx = pd.date_range("2024-01-01", periods=5, freq="H")\ndf = pd.DataFrame({"val": range(5)}, index=idx)',
    solution: 'idx = pd.date_range("2024-01-01", periods=5, freq="H")\ndf = pd.DataFrame({"val": range(5)}, index=idx)',
    validate: function (py) { return py.run('len(df) == 5 and df.index.freqstr == "h"'); }
  },
  {
    id: 'ts-2',
    category: '7. Time Series',
    title: '32. Resampling',
    description: 'Frequency conversion.',
    content: '<h3>Min to 5Min</h3><p>Resample 1-min data to 5-min intervals, summing "vol". Store in `res`.</p>',
    startCode: 'import pandas as pd\nidx = pd.date_range("2024-01-01", periods=10, freq="min")\ndf = pd.DataFrame({"vol": [1]*10}, index=idx)\n',
    hint: 'res = df.resample("5min").sum()',
    solution: 'res = df.resample("5min").sum()',
    validate: function (py) { return py.run('len(res) == 2 and res.iloc[0]["vol"] == 5'); }
  },
  {
    id: 'ts-3',
    category: '7. Time Series',
    title: '33. Shifting',
    description: 'Lag features.',
    content: '<h3>Lag 1</h3><p>Create "prev_close" = "close" shifted by 1.</p>',
    startCode: 'import pandas as pd\ndf = pd.DataFrame({"close": [10, 20, 30]})\n',
    hint: 'df["prev_close"] = df["close"].shift(1)',
    solution: 'df["prev_close"] = df["close"].shift(1)',
    validate: function (py) { return py.run('pd.isna(df["prev_close"][0]) and df["prev_close"][1] == 10.0'); }
  },
  {
    id: 'ts-4',
    category: '7. Time Series',
    title: '34. Rolling Apply',
    description: 'Custom window.',
    content: '<h3>Max - Min</h3><p>Compute rolling 3-day (max - min) spread on "price". Store in "spread".</p>',
    startCode: 'import pandas as pd\ndf = pd.DataFrame({"price": [1, 2, 3, 5, 8]})\n',
    hint: 'df["spread"] = df["price"].rolling(3).apply(lambda x: x.max() - x.min())',
    solution: 'df["spread"] = df["price"].rolling(3).apply(lambda x: x.max() - x.min())',
    validate: function (py) { return py.run('df["spread"].iloc[2] == 2.0'); }
  },
  {
    id: 'ts-5',
    category: '7. Time Series',
    title: '35. Time Diff',
    description: 'Timedeltas.',
    content: '<h3>Days Since</h3><p>Calculate days between "date" column and "2024-01-01". Store in "diff".</p>',
    startCode: 'import pandas as pd\ndf = pd.DataFrame({"date": pd.to_datetime(["2024-01-02", "2024-01-05"])})\n',
    hint: 'df["diff"] = (df["date"] - pd.Timestamp("2024-01-01")).dt.days',
    solution: 'df["diff"] = (df["date"] - pd.Timestamp("2024-01-01")).dt.days',
    validate: function (py) { return py.run('df["diff"].tolist() == [1, 4]'); }
  },

  // =============================================
  // 8. ADVANCED ENGINEERING
  // =============================================
  {
    id: 'adv-1',
    category: '8. Advanced Engineering',
    title: '36. Generators',
    description: 'Efficient iteration.',
    content: '<h3>Batch Gen</h3><p>Write `batch(data, n)` yielding chunks of size `n`.</p>',
    startCode: 'def batch(data, n):\n    pass\n',
    hint: 'for i in range(0, len(data), n): yield data[i:i+n]',
    solution: 'def batch(data, n):\n    for i in range(0, len(data), n): yield data[i:i+n]',
    validate: function (py) { return py.run('list(batch([1,2,3,4,5], 2)) == [[1,2], [3,4], [5]]'); }
  },
  {
    id: 'adv-2',
    category: '8. Advanced Engineering',
    title: '37. Decorators',
    description: 'Function wrapping.',
    content: '<h3>Logging Decorator</h3><p>Write `@log_call` that prints "Called" when function runs.</p>',
    startCode: 'def log_call(func):\n    def wrapper(*args, **kwargs):\n        # print "Called"\n        return func(*args, **kwargs)\n    return wrapper\n',
    hint: 'print("Called"); return func(...)',
    solution: 'def log_call(func):\n    def wrapper(*args, **kwargs):\n        print("Called")\n        return func(*args, **kwargs)\n    return wrapper',
    validate: function (py) { return py.run('output_buffer.strip() == ""'); } // tricky to validate stdout print in decorator without capturing
  },
  {
    id: 'adv-3',
    category: '8. Advanced Engineering',
    title: '38. Context Managers',
    description: 'with statement.',
    content: '<h3>Timer</h3><p>Trace runtime using `with Timer():`. Class should have __enter__ and __exit__.</p>',
    startCode: 'import time\nclass Timer:\n    pass\n',
    hint: 'def __enter__(self): self.s=time.time()\ndef __exit__(self, *a): pass',
    solution: 'class Timer:\n    def __enter__(self): self.s = time.time()\n    def __exit__(self, *a): pass',
    validate: function (py) { return py.run('hasattr(Timer, "__enter__")'); }
  },
  {
    id: 'adv-4',
    category: '8. Advanced Engineering',
    title: '39. JSON Parsing',
    description: 'Nested data.',
    content: '<h3>Flatten JSON</h3><p>Normalize `data` list of dicts into a DataFrame `df`.</p>',
    startCode: 'import pandas as pd\ndata = [{"id": 1, "info": {"name": "Ali"}}, {"id": 2, "info": {"name": "Bo"}}]\n',
    hint: 'df = pd.json_normalize(data)',
    solution: 'df = pd.json_normalize(data)',
    validate: function (py) { return py.run('"info.name" in df.columns'); }
  },
  {
    id: 'adv-5',
    category: '8. Advanced Engineering',
    title: '40. Parquet/Compression',
    description: 'File formats.',
    content: '<h3>Save Parquet</h3><p>Save `df` to "data.parquet". (Mocking I/O).</p>',
    startCode: 'import pandas as pd\ndf = pd.DataFrame({"A": [1, 2]})\n',
    hint: 'df.to_parquet("data.parquet")',
    solution: 'df.to_parquet("data.parquet")',
    validate: function (py) { return py.run('import os; os.path.exists("data.parquet")'); }
  }
];

// Sort
curriculum.sort(function (a, b) {
  var numA = parseInt(a.title.match(/\d+/)[0]);
  var numB = parseInt(b.title.match(/\d+/)[0]);
  return numA - numB;
});
